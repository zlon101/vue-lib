/* eslint-disable */
// === 该文件是自动生成 ===

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
        return `${str}${attr}:${styObj[attr]};`;
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
      return isUrl ? `url(#${id})` : `#${id}`;
    },
  },
};

const IconGithubDefaultFill = {};
const IconGithubDefaultStroke = {};
export const IconGithub = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconGithubDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconGithubDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 85.333C276.267 85.333 85.333 276.267 85.333 512a426.41 426.41 0 0 0 291.755 404.821c21.333 3.712 29.312-9.088 29.312-20.309 0-10.112-.555-43.69-.555-79.445-107.178 19.754-134.912-26.112-143.445-50.134-4.821-12.288-25.6-50.133-43.733-60.288-14.934-7.978-36.267-27.733-.555-28.245 33.621-.555 57.6 30.933 65.621 43.733 38.4 64.512 99.755 46.379 124.246 35.2 3.754-27.733 14.933-46.378 27.221-57.045C340.267 689.621 241.067 652.8 241.067 489.6c0-46.421 16.512-84.779 43.733-114.688-4.267-10.667-19.2-54.4 4.267-113.067 0 0 35.712-11.178 117.333 43.776A395.947 395.947 0 0 1 513.067 291.2c36.266 0 72.533 4.779 106.666 14.379 81.579-55.467 117.334-43.691 117.334-43.691 23.466 58.667 8.533 102.4 4.266 113.067 27.179 29.866 43.734 67.712 43.734 114.645 0 163.755-99.712 200.021-194.646 210.688 15.446 13.312 28.8 38.912 28.8 78.933 0 57.046-.554 102.912-.554 117.334 0 11.178 8.021 24.49 29.354 20.224A427.35 427.35 0 0 0 938.667 512c0-235.733-190.934-426.667-426.667-426.667z"/></svg>);
  },
};
