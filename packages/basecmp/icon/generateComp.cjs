/**
 * 读取svg文件然后生成icon组件
 * 支持修改svg中所有的fill属性
*/
const fs = require('fs');
const path = require('path');
// const { optimize } = require('svgo/lib/svgo');

const SvgDir = path.resolve(__dirname, './assets');
const IconPath = path.resolve(__dirname, './src/icon.js');

const mixinStr = `
const mixin = {
  inheritAttrs: false,
  props: {
    fill: {
      type: Object,
      default: () => ({}),
    },
    stroke: {
      type: Object,
      default: () => ({}),
    },
    s: {
      type: String,
      default: '16px',
    },
    w: String,
    h: String,
    idPrefix: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      stamp: String(Date.now()).slice(-2),
    };
  },
  computed: {
    mergeStyle() {
      const styObj = {};
      if (this.s) {
        styObj.width = this.s;
        styObj.height = this.s;
      }
      if (this.w) {
        styObj.width = this.w;
      }
      if (this.h) {
        styObj.height = this.h;
      }
      return Object.keys(styObj).reduce((str, attr) => {
        return \`\${str}\${attr}:\${styObj[attr]};\`;
        // return str + attr+':'+ styObj[attr]+ '; ';
      }, '');
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    getId(val, anchor, isUrl) {
      const frags = [this.idPrefix, val, this.stamp].filter(Boolean);
      const id = frags.join('-');
      if (anchor) {
        return id;
      }
      return isUrl ? \`url(#\${id})\` : \`#\${id}\`;
    },
  },
};`;

/**
 * 生成icon组件
 * 因为@vue/cli-plugin-babel可以直接使用jsx
 */
/**/
function generateIconCom(comName, svgTxt, fileName) {
  // 添加id前缀，确保一个页面中元素的id值唯一
  svgTxt = svgTxt.replace(/\s+id=["']([^"']+)["']/g, ` id={this.getId("$1", true)}`);
  // 1.url形式: filter="url(#icon-loading-arrow-a)"
  svgTxt = svgTxt.replace(/\s+([^=]+)=["']url\(#([^)]+)\)["']\s*/g, ` $1={this.getId("$2", false, true)} `);
  // 2.其他形式
  // <use fill="#fff" xlink:href="#qr-b" />
  svgTxt = svgTxt.replaceAll(/\s+([^=\s]+)=["']#([^'"]+)["']/g, (matchVal, attrName, attrVal) => {
    const isColor = ['fill', 'stroke'].includes(attrName);
    if (isColor) return matchVal;
    return ` ${attrName}={this.getId("${attrVal}", false)}`;
  });
  /*
  // <use fill="#FFF" xlink:href="#b" />
  svgTxt = svgTxt.replace(/\s+([\w:]+?href)=["']#([^'"]+)["']/g, ` $1={this.getId("$2", false)}`);
  // <use xlink="#qr-b-50"></use>
  svgTxt = svgTxt.replace(/\s+xlink=["']#([^'"]+)["']/g, ` xlink={this.getId("$1", false)}`); */

  // 搜索fill
  const regFill = /fill=".*?"/g;
  const fillAttrs = svgTxt.match(regFill) || [];
  const DefaultFill = {}; // fill
  fillAttrs.forEach((attr, ind) => {
    DefaultFill[ind] = attr.replace('fill=', '').replace(/["']/g, '').trim();
    svgTxt = svgTxt.replace(new RegExp(attr), `fill={this.mergeFill[${ind}]}`);
  });
  // 搜索stroke
  const regStroke = /stroke=".*?"/g;
  const strokeAttrs = svgTxt.match(regStroke) || [];
  const DefaultStroke = {}; // stroke
  strokeAttrs.forEach((attr, ind) => {
    DefaultStroke[ind] = attr.replace('stroke=', '').replace(/["']/g, '').trim();
    svgTxt = svgTxt.replace(new RegExp(attr), `stroke={this.mergeStroke[${ind}]}`);
  });
  // svgTxt = svgTxt.replace(/\n+/g, '').replace(/>\s+</g, '><'); // 删除换行和多余空格



  // jsx 格式，将短横线和:改为驼峰格式
  svgTxt = svgTxt.replace(/\s+xlink:href=/g, ' xlinkHref=');
  /*
  svgTxt = svgTxt.replace(/\s+(\w+)[-:](\w+)+=/g, (...param) => {
    if (param[0].includes('xmlns')) return param[0];
    return ` ${param[1]}${param[2].replace(/^\w/, chat => chat.toUpperCase())}=`;
  }); */

  // 设置width height
  const svgTag = '<svg';
  const tagIdx = svgTxt.indexOf(svgTag);
  svgTxt = `${svgTxt.slice(0, tagIdx)} ${svgTag} style={this.mergeStyle} onClick={this.handleClick} ${svgTxt.slice(svgTag.length)}`;

  return `const ${comName}DefaultFill = ${JSON.stringify(DefaultFill, null, 2)};
const ${comName}DefaultStroke = ${JSON.stringify(DefaultStroke, null, 2)};
export const ${comName} = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...${comName}DefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...${comName}DefaultStroke, ...(this.stroke || {}) };
    },
  },
  // eslint-disable-line
  render(h) {
    return (${svgTxt});
  },
};
`;
}

function setup() {
  console.log('\n$ 生成svg-icon组件');
  const svgList = fs.readdirSync(SvgDir);
  let IconFileStr = '';
  for (const svg of svgList) {
    if (/\.svg$/.test(svg)) {
      const svgPath = path.resolve(SvgDir, svg);
      const svgTxt = fs.readFileSync(svgPath, 'utf-8');
      const fileName = svg.split('.')[0];
      let comName = fileName[0].toUpperCase() + fileName.slice(1);
      comName = comName.replace(/[-|_]([A-Za-z]){1}/g, w => w.slice(1).toUpperCase());

      // 压缩svg
      // const minedSvg = minSvg(svgPath, svgTxt);
      // 生成组件代码
      const comStr = generateIconCom(comName, svgTxt, fileName);
      IconFileStr += `${comStr}\n`;
    }
  }
  // 写入文件
  IconFileStr = `// 该文件是自动生成\n${mixinStr}\n\n${IconFileStr}`;
  return new Promise(resolve => {
    fs.writeFile(IconPath, IconFileStr, err => {
      err && console.log(`\n❌ 自动生成icon组件失败`);
      resolve();
    });
  });
}

module.exports = setup;


/*
// 压缩svg
// https://github.com/svg/svgo
function minSvg(svgPath, svgString) {
  const result = optimize(svgString, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      // prefixIds
    ],
  });
  const optimizedSvgStr = result.data;
  // 设置preserveAspectRatio
  fs.writeFile(svgPath, optimizedSvgStr, err => {
    err && console.log(`\n❌ 写入${svgPath}失败`);
  });
  return optimizedSvgStr;
}
*/
