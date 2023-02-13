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

const IconAddDefaultFill = {
  '0': 'none',
  '1': '#3A51E0',
  '2': '#FFF'
};
const IconAddDefaultStroke = {};
export const IconAdd = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconAddDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconAddDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Z" fill={this.mergeFill[1]}/><path d="M12.636 8a.759.759 0 0 0-.757-.758H8.736V4.224a.736.736 0 1 0-1.472 0v3.018H4.12a.758.758 0 0 0 .001 1.515h3.143v3.035a.735.735 0 1 0 1.472 0V8.757h3.143c.418 0 .757-.34.757-.757" fill={this.mergeFill[2]}/></g></svg>);
  },
};

const IconCalenderDefaultFill = {
  '0': 'none',
  '1': '#B5BEC5',
  '2': '#B5BEC5',
  '3': '#B5BEC5',
  '4': '#B5BEC5'
};
const IconCalenderDefaultStroke = {
  '0': '#B5BEC5'
};
export const IconCalender = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconCalenderDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconCalenderDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><path d="M7.5 5h9a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z" stroke={this.mergeStroke[0]} stroke-width="2" stroke-linejoin="round"/><path d="M8.5 2a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z" fill={this.mergeFill[1]}/><rect fill={this.mergeFill[2]} x="7" y="10.5" width="10" height="2" rx="1"/><rect fill={this.mergeFill[3]} x="7" y="15" width="9" height="2" rx="1"/><path d="M15.5 2a1 1 0 0 1 1 1v3.5a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Z" fill={this.mergeFill[4]}/></g></svg>);
  },
};

const IconCopyDefaultFill = {
  '0': '#B5BEC5'
};
const IconCopyDefaultStroke = {};
export const IconCopy = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconCopyDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconCopyDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2.967H3a1.13 1.13 0 0 0-1.12 1.028l-.005.11v5.307c0 .592.446 1.078 1.017 1.133L3 10.55h4.5a1.13 1.13 0 0 0 1.12-1.028l.005-.11V4.104c0-.591-.446-1.077-1.017-1.132L7.5 2.967Zm2.25 4.26a1.14 1.14 0 0 0 .37-.738l.005-.11V2.588c0-.592-.446-1.078-1.017-1.133L9 1.45H6c-.333 0-.632.146-.838.38H7.5c1.243 0 2.25 1.018 2.25 2.274v3.123Zm0 2.185c0 1.257-1.007 2.275-2.25 2.275H3c-1.243 0-2.25-1.018-2.25-2.274v-5.31A2.262 2.262 0 0 1 3 1.83h.878A2.253 2.253 0 0 1 6 .313h3c1.243 0 2.25 1.018 2.25 2.274V6.38c0 .99-.626 1.833-1.5 2.146v.887Z" fill={this.mergeFill[0]}/></svg>);
  },
};

const IconCopy2DefaultFill = {
  '0': '#111010'
};
const IconCopy2DefaultStroke = {};
export const IconCopy2 = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconCopy2DefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconCopy2DefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M10.5.438a2.625 2.625 0 0 1 2.625 2.624v4.376c0 1.142-.73 2.115-1.75 2.475v1.024a2.625 2.625 0 0 1-2.625 2.626H3.5a2.625 2.625 0 0 1-2.625-2.626V4.814A2.625 2.625 0 0 1 3.5 2.188h5.25a2.625 2.625 0 0 1 2.625 2.624v3.603a1.31 1.31 0 0 0 .431-.851l.007-.127V3.063c0-.682-.521-1.242-1.187-1.306L10.5 1.75H7a1.31 1.31 0 0 0-.978.437H4.524A2.626 2.626 0 0 1 7 .437h3.5ZM8.75 3.5H3.5c-.682 0-1.243.52-1.306 1.186l-.006.127v6.125c0 .682.52 1.242 1.186 1.306l.126.006h5.25c.682 0 1.243-.52 1.306-1.186l.007-.127V4.814c0-.683-.521-1.243-1.187-1.307L8.75 3.5ZM6.125 5.25c.362 0 .656.294.656.656v1.312h1.313a.656.656 0 1 1 0 1.313H6.78v1.313a.656.656 0 1 1-1.312 0V8.53H4.156a.656.656 0 1 1 0-1.312l1.312-.001V5.906c0-.362.295-.656.657-.656Z" fill={this.mergeFill[0]}/></svg>);
  },
};

const IconCrossDefaultFill = {
  '0': '#F56C6C',
  '1': '#fff'
};
const IconCrossDefaultStroke = {};
export const IconCross = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconCrossDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconCrossDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16" fill={this.mergeFill[0]}/><path d="M11.279 4.736a.757.757 0 0 0-1.069 0L7.992 6.954l-2.128-2.13a.734.734 0 1 0-1.039 1.039l2.13 2.129-2.218 2.218a.756.756 0 0 0 1.069 1.068l2.217-2.217 2.142 2.14a.733.733 0 1 0 1.038-1.037L9.062 8.023l2.217-2.218a.757.757 0 0 0 0-1.069" fill={this.mergeFill[1]}/></svg>);
  },
};

const IconDeleDefaultFill = {
  '0': 'none',
  '1': '#B5BEC5',
  '2': '#FFF'
};
const IconDeleDefaultStroke = {};
export const IconDele = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconDeleDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconDeleDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Z" fill={this.mergeFill[1]} fill-rule="nonzero"/><rect fill={this.mergeFill[2]} x="3" y="7.1" width="10" height="1.8" rx=".9"/></g></svg>);
  },
};

const IconEditDefaultFill = {
  '0': '#3A51E0'
};
const IconEditDefaultStroke = {};
export const IconEdit = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconEditDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconEditDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6a.75.75 0 1 1 0 1.5H7.75a.25.25 0 0 0-.243.193L7.5 7.75v8a.25.25 0 0 0 .193.243L7.75 16h7a.25.25 0 0 0 .243-.193L15 15.75V13.5a.75.75 0 1 1 1.5 0v2.25a1.75 1.75 0 0 1-1.606 1.744l-.144.006h-7a1.75 1.75 0 0 1-1.744-1.606L6 15.75v-8a1.75 1.75 0 0 1 1.606-1.744L7.75 6H12Zm5.234.177a.75.75 0 0 1 .154.968l-.065.09-5.5 6.5a.75.75 0 0 1-1.21-.88l.064-.09 5.5-6.5a.75.75 0 0 1 1.057-.088Z" fill={this.mergeFill[0]}/></svg>);
  },
};

const IconErrDefaultFill = {
  '0': '#F56C6C'
};
const IconErrDefaultStroke = {};
export const IconErr = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconErrDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconErrDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 11.25a.75.75 0 0 0-.75.75v.5l.007.102A.75.75 0 0 0 8.75 12.5V12l-.007-.102A.75.75 0 0 0 8 11.25Zm0-8.5a.75.75 0 0 0-.75.75v6l.007.102A.75.75 0 0 0 8.75 9.5v-6l-.007-.102A.75.75 0 0 0 8 2.75Z" fill={this.mergeFill[0]} fill-rule="evenodd"/></svg>);
  },
};

const IconExpointDefaultFill = {
  '0': 'none',
  '1': '#F56C6C'
};
const IconExpointDefaultStroke = {
  '0': '#F56C6C'
};
export const IconExpoint = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconExpointDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconExpointDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><circle stroke={this.mergeStroke[0]} stroke-width="3" cx="28" cy="28" r="26.5"/><path d="M28.23 38.18c1.779 0 3.22 1.508 3.22 3.368 0 1.86-1.441 3.369-3.22 3.369-1.778 0-3.22-1.509-3.22-3.369 0-1.86 1.442-3.369 3.22-3.369ZM28 11.082a3.517 3.517 0 0 1 3.497 3.889L29.61 32.739a1.635 1.635 0 0 1-3.188.143l-.032-.143-1.887-17.767A3.517 3.517 0 0 1 28 11.083Z" fill={this.mergeFill[1]}/></g></svg>);
  },
};

const IconFoldDefaultFill = {
  '0': 'none'
};
const IconFoldDefaultStroke = {
  '0': '#06003B'
};
export const IconFold = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconFoldDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconFoldDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m4 6 4 4m4-4-4 4" stroke={this.mergeStroke[0]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill={this.mergeFill[0]}/></svg>);
  },
};

const IconFold2DefaultFill = {
  '0': 'currentColor'
};
const IconFold2DefaultStroke = {};
export const IconFold2 = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconFold2DefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconFold2DefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  viewBox="64 64 896 896" width="1em" height="1em" fill={this.mergeFill[0]} xmlns="http://www.w3.org/2000/svg">
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
</svg>);
  },
};

const IconGithubDefaultFill = {
  '0': '#161614',
  '1': '#FFFFFF'
};
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
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  data-v-43db14b3="" t="1648543328373" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4154" height="24px" class="icon" width="24px"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill={this.mergeFill[0]} p-id="4155"></path><path d="M411.306667 831.146667c3.413333-5.12 6.826667-10.24 6.826666-11.946667v-69.973333c-105.813333 22.186667-128-44.373333-128-44.373334-17.066667-44.373333-42.666667-56.32-42.666666-56.32-34.133333-23.893333 3.413333-23.893333 3.413333-23.893333 37.546667 3.413333 58.026667 39.253333 58.026667 39.253333 34.133333 58.026667 88.746667 40.96 110.933333 32.426667 3.413333-23.893333 13.653333-40.96 23.893333-51.2-85.333333-10.24-174.08-42.666667-174.08-187.733333 0-40.96 15.36-75.093333 39.253334-102.4-3.413333-10.24-17.066667-47.786667 3.413333-100.693334 0 0 32.426667-10.24 104.106667 39.253334 30.72-8.533333 63.146667-11.946667 95.573333-11.946667 32.426667 0 64.853333 5.12 95.573333 11.946667 73.386667-49.493333 104.106667-39.253333 104.106667-39.253334 20.48 52.906667 8.533333 90.453333 3.413333 100.693334 23.893333 27.306667 39.253333 59.733333 39.253334 102.4 0 145.066667-88.746667 177.493333-174.08 187.733333 13.653333 11.946667 25.6 34.133333 25.6 69.973333v104.106667c0 3.413333 1.706667 6.826667 6.826666 11.946667 5.12 6.826667 3.413333 18.773333-3.413333 23.893333-3.413333 1.706667-6.826667 3.413333-10.24 3.413333h-174.08c-10.24 0-17.066667-6.826667-17.066667-17.066666 0-5.12 1.706667-8.533333 3.413334-10.24z" fill={this.mergeFill[1]} p-id="4156"></path></svg>);
  },
};

const IconHookDefaultFill = {
  '0': 'none'
};
const IconHookDefaultStroke = {
  '0': '#3A51E0'
};
export const IconHook = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconHookDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconHookDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3.525 4.86 6.5l5.64-5" stroke={this.mergeStroke[0]} stroke-width="1.5" fill={this.mergeFill[0]} stroke-linecap="round" stroke-linejoin="round"/></svg>);
  },
};

const IconLoadingArrowDefaultFill = {
  '0': 'none',
  '1': '#FFF'
};
const IconLoadingArrowDefaultStroke = {
  '0': '#FFF'
};
export const IconLoadingArrow = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconLoadingArrowDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconLoadingArrowDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><defs><filter id={this.getId("loading-arrow-a", true)}><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.004284 0 0 0 0 0.000000 0 0 0 0 0.952910 0 0 0 1.000000 0"/></filter></defs><g filter={this.getId("loading-arrow-a", false, true)} fill={this.mergeFill[0]} fill-rule="evenodd"><path d="M14.664 2.949a.452.452 0 0 0-.555.33l-.356 1.37C12.6 2.477 10.369 1 7.796 1 4.043 1 1 4.134 1 8s3.043 7 6.796 7c3.125 0 5.75-2.175 6.544-5.133h-.046a.46.46 0 0 0-.453-.467.46.46 0 0 0-.453.467c0 .006.004.011.004.018-.77 2.427-2.983 4.182-5.596 4.182-3.253 0-5.89-2.717-5.89-6.067s2.637-6.067 5.89-6.067c2.356 0 4.384 1.429 5.325 3.489l-1.786-.493a.451.451 0 0 0-.555.33.468.468 0 0 0 .32.571l2.626.725a.452.452 0 0 0 .555-.33l.024-.092h.035l-.02-.061.664-2.552a.468.468 0 0 0-.32-.571" stroke={this.mergeStroke[0]} stroke-width=".5" fill={this.mergeFill[1]} stroke-linecap="round" stroke-linejoin="round"/></g></svg>);
  },
};

const IconLoadingDefaultFill = {
  '0': 'none'
};
const IconLoadingDefaultStroke = {
  '0': '#3A51E0'
};
export const IconLoading = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconLoadingDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconLoadingDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M9 1a8 8 0 1 0 8 8" stroke={this.mergeStroke[0]} stroke-width="2" fill={this.mergeFill[0]} stroke-linecap="round" stroke-linejoin="round"/></svg>);
  },
};

const IconNetErrDefaultFill = {
  '0': '#F56C6C'
};
const IconNetErrDefaultStroke = {};
export const IconNetErr = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconNetErrDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconNetErrDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]}><path d="M57.938 40.634a1.954 1.954 0 0 1-1.484-.682 26.155 26.155 0 0 0-19.821-9.232 1.943 1.943 0 0 1 .007-3.888h.007a30.054 30.054 0 0 1 22.767 10.595 1.933 1.933 0 0 1-.225 2.736 1.89 1.89 0 0 1-1.252.47Zm-42.455-.5a1.945 1.945 0 0 1-1.455-3.234c3.79-4.254 8.725-7.334 14.28-8.909 1.033-.28 2.11.31 2.397 1.343a1.941 1.941 0 0 1-1.342 2.398c-4.845 1.371-9.148 4.05-12.439 7.748a1.887 1.887 0 0 1-1.441.654Z"/><path d="M15.25 40.402c-.45 0-.9-.155-1.265-.472a1.94 1.94 0 0 1-.204-2.742l.253-.288a1.938 1.938 0 0 1 2.743-.155c.801.718.871 1.94.154 2.742l-.21.24a1.91 1.91 0 0 1-1.47.675Zm9.753 7.446a1.946 1.946 0 0 1-1.463-3.22 17.228 17.228 0 0 1 13.001-5.935c1.041 0 2.103.105 3.242.323a1.937 1.937 0 0 1 1.54 2.272 1.933 1.933 0 0 1-2.271 1.54 13.427 13.427 0 0 0-2.504-.254 13.321 13.321 0 0 0-10.068 4.592 1.938 1.938 0 0 1-1.477.682Zm43.622-13.57a1.954 1.954 0 0 1-1.484-.683 41.02 41.02 0 0 0-40.19-13.507 1.934 1.934 0 0 1-2.314-1.476 1.939 1.939 0 0 1 1.477-2.314 45.153 45.153 0 0 1 9.731-1.075c13.212 0 25.7 5.78 34.257 15.848a1.933 1.933 0 0 1-.225 2.735 1.877 1.877 0 0 1-1.252.471Zm-65.25-.352a1.946 1.946 0 0 1-1.462-3.22c4.584-5.274 10.504-9.479 17.12-12.158a1.945 1.945 0 0 1 1.456 3.607c-6.054 2.447-11.468 6.286-15.652 11.103a1.92 1.92 0 0 1-1.462.668ZM37.202 64.82a6.074 6.074 0 0 1-6.068-6.068 6.074 6.074 0 0 1 6.068-6.068 6.074 6.074 0 0 1 6.068 6.068c.007 3.347-2.72 6.068-6.068 6.068Zm0-8.255a2.19 2.19 0 0 0-2.186 2.187 2.19 2.19 0 0 0 2.186 2.187 2.19 2.19 0 0 0 2.187-2.187 2.19 2.19 0 0 0-2.187-2.187Z"/><path d="M54.738 57.495a5.15 5.15 0 0 1-3.712-1.59L38.01 42.272a1.942 1.942 0 0 1 .063-2.742 1.936 1.936 0 0 1 2.742.063L53.831 53.22c.464.485 1.287.506 1.772.042.5-.478.52-1.273.042-1.772L35.234 30.122a1.944 1.944 0 1 1 2.813-2.686l20.41 21.368c1.956 2.053 1.885 5.308-.168 7.263a5.112 5.112 0 0 1-3.55 1.428Z"/><path d="M39.41 42.877a1.954 1.954 0 0 1-1.406-.598L27.436 31.212a1.944 1.944 0 1 1 2.813-2.686l10.567 11.067a1.95 1.95 0 0 1-.063 2.75 1.96 1.96 0 0 1-1.343.534Z"/><path d="M28.842 31.81a1.934 1.934 0 0 1-1.406-.605l-9.084-9.507a1.942 1.942 0 0 1 .063-2.742 1.936 1.936 0 0 1 2.742.064l9.084 9.513c.739.773.71 2.004-.063 2.742a1.9 1.9 0 0 1-1.336.534Zm7.798-1.09a1.934 1.934 0 0 1-1.406-.605L25.13 19.533a1.942 1.942 0 0 1 .063-2.742 1.936 1.936 0 0 1 2.742.063L38.04 27.436c.738.773.71 2.004-.063 2.742a1.877 1.877 0 0 1-1.336.542Z"/><path d="M19.758 22.296a1.954 1.954 0 0 1-1.406-.598l-5.57-5.835a5.147 5.147 0 0 1 .17-7.264 5.185 5.185 0 0 1 3.663-1.42 5.106 5.106 0 0 1 3.6 1.589l7.727 8.086a1.95 1.95 0 0 1-.063 2.75 1.95 1.95 0 0 1-2.75-.064l-7.727-8.086a1.225 1.225 0 0 0-.879-.387 1.122 1.122 0 0 0-.893.345 1.255 1.255 0 0 0-.042 1.772l5.569 5.836a1.95 1.95 0 0 1-.063 2.749 1.939 1.939 0 0 1-1.336.527Z"/></g></svg>);
  },
};

const IconProcessingDefaultFill = {
  '0': '#C0C4CC'
};
const IconProcessingDefaultStroke = {};
export const IconProcessing = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconProcessingDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconProcessingDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 2.75a.75.75 0 0 0-.75.75v5l.007.102A.75.75 0 0 0 8 9.25h5l.102-.007A.75.75 0 0 0 13 7.75H8.75V3.5l-.007-.102A.75.75 0 0 0 8 2.75Z" fill={this.mergeFill[0]} fill-rule="evenodd"/></svg>);
  },
};

const IconProhibiteDefaultFill = {
  '0': 'none',
  '1': '#F56C6C'
};
const IconProhibiteDefaultStroke = {
  '0': '#F56C6C'
};
export const IconProhibite = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconProhibiteDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconProhibiteDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><circle cx="8" cy="8" r="8"/><rect stroke={this.mergeStroke[0]} stroke-width="1.5" x="1.25" y=".87" width="13.5" height="14.25" rx="6"/><path fill={this.mergeFill[1]} d="m3.757 2.343 9.9 9.9-1.414 1.414-9.9-9.9z"/></g></svg>);
  },
};

const IconQuestionDefaultFill = {
  '0': 'none',
  '1': '#FAAD14',
  '2': '#FAAD14'
};
const IconQuestionDefaultStroke = {
  '0': '#FAAD14'
};
export const IconQuestion = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconQuestionDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconQuestionDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g fill={this.mergeFill[0]} fill-rule="evenodd"><circle stroke={this.mergeStroke[0]} stroke-width="3" cx="28" cy="28" r="26.5"/><circle fill={this.mergeFill[1]} cx="28" cy="41" r="3"/><path d="M29.9 32.866v-.501c0-.98.208-1.868.622-2.667.362-.721.905-1.39 1.629-2.01 1.914-1.622 3.039-2.653 3.375-3.09.983-1.263 1.474-2.873 1.474-4.83 0-2.37-.776-4.264-2.328-5.681C33.095 12.696 31.012 12 28.427 12c-2.897 0-5.186.85-6.867 2.55-1.498 1.448-2.339 3.372-2.522 5.772a8.06 8.06 0 0 0-.013.347 2.09 2.09 0 0 0 2.09 2.143c1.16 0 2.11-.924 2.141-2.085.006-.22.013-.37.02-.447.118-1.247.451-2.255 1-3.025.827-1.107 2.133-1.661 3.918-1.661 1.422 0 2.534.4 3.336 1.198.75.798 1.125 1.88 1.125 3.246 0 1.03-.349 1.996-1.047 2.898-.362.36-1.177 1.12-2.444 2.28-1.267 1.133-2.173 2.228-2.716 3.284-.543 1.108-.814 2.396-.814 3.865v.501a2.134 2.134 0 1 0 4.267 0Z" fill={this.mergeFill[2]}/></g></svg>);
  },
};

const IconRefreshDefaultFill = {
  '0': 'none'
};
const IconRefreshDefaultStroke = {
  '0': '#0D00FE'
};
export const IconRefresh = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconRefreshDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconRefreshDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1a7 7 0 0 0-7 7m7 7a7 7 0 0 0 7-7" stroke={this.mergeStroke[0]} stroke-width="2" fill={this.mergeFill[0]} stroke-linecap="round" stroke-linejoin="round"/></svg>);
  },
};

const IconSearchDefaultFill = {
  '0': 'none'
};
const IconSearchDefaultStroke = {
  '0': '#06003B'
};
export const IconSearch = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconSearchDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconSearchDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke={this.mergeStroke[0]} stroke-width="1.5" stroke-linejoin="round" fill={this.mergeFill[0]} fill-rule="evenodd"><circle cx="11" cy="11.5" r="6"/><path stroke-linecap="round" d="m16 15.25 4 3.5"/></g></svg>);
  },
};

const IconSuccessDefaultFill = {
  '0': '#67C23A'
};
const IconSuccessDefaultStroke = {};
export const IconSuccess = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconSuccessDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconSuccessDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm4.53 4.97a.75.75 0 0 0-1.06 0L7 9.439l-2.47-2.47-.084-.072A.75.75 0 0 0 3.47 8.03l3 3a.75.75 0 0 0 .935.101l.031-.02.008-.007a.756.756 0 0 0 .086-.074l5-5 .073-.084a.75.75 0 0 0-.073-.976Z" fill={this.mergeFill[0]} fill-rule="evenodd"/></svg>);
  },
};

const IconSuccess2DefaultFill = {
  '0': 'none',
  '1': '#67C23A'
};
const IconSuccess2DefaultStroke = {
  '0': '#67C23A'
};
export const IconSuccess2 = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconSuccess2DefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconSuccess2DefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g stroke={this.mergeStroke[0]} fill={this.mergeFill[0]} fill-rule="evenodd"><circle stroke-width="3" cx="28" cy="28" r="26.5"/><path d="M35.949 19.93a2.105 2.105 0 0 1 2.079.55 2.166 2.166 0 0 1-.024 3.06v-.001l-11.86 11.982a2.11 2.11 0 0 1-3.008 0l-5.19-5.26a2.152 2.152 0 0 1-.596-1.509 2.151 2.151 0 0 1 .622-1.499 2.11 2.11 0 0 1 2.984-.024l3.685 3.737 10.352-10.46c.267-.28.599-.475.956-.576Z" stroke-width=".3" fill={this.mergeFill[1]}/></g></svg>);
  },
};

const IconYesDefaultFill = {
  '0': '#67C23A'
};
const IconYesDefaultStroke = {};
export const IconYes = {
  mixins: [mixin],
  computed: {
    mergeFill() {
      return { ...IconYesDefaultFill, ...(this.fill || {}) };
    },
    mergeStroke() {
      return { ...IconYesDefaultStroke, ...(this.stroke || {}) };
    },
  },
  render(h) {
    return (<svg style={this.mergeStyle} onClick={this.handleClick}  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12.883 3.403c-3.045 1.948-5.252 4.4-6.246 5.634L4.212 7.05l-1.076.9 4.195 4.458c.725-1.93 3.014-5.705 5.808-8.387l-.256-.618ZM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Z" fill={this.mergeFill[0]} fill-rule="evenodd"/></svg>);
  },
};
