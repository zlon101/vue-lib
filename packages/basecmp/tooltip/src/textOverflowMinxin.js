import { isOverflow } from '@pic/utils/lib/dom';

export default {
  props: {
    showIfOverflow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hidePoper: false,
    };
  },
  methods: {
    handleMouseEnter() {
      this.checkIsOverFlow();
    },
    // handleMouseLeave() {
    //   this.hidePoper = false;
    // },
    checkIsOverFlow() {
      this.hidePoper = false;
      if (this.always) return;
      const anchorDom = this.$refs.reference;
      const popperDom = this.$refs.popper;
      if (this.showIfOverflow && popperDom) {
        // console.debug(isOverflow(anchorDom));
        if (!isOverflow(anchorDom)) {
          this.hidePoper = true;
          this.visible = false;
        }
      }
    },
  },
  mounted() {
    const referenceEle = this.$refs.reference;
    if (referenceEle) {
      referenceEle.addEventListener('mouseenter', this.handleMouseEnter);
      // referenceEle.addEventListener('mouseleave', this.handleMouseLeave);
    }
  },
  beforeDestroy() {
    const referenceEle = this.$refs.reference;
    referenceEle.removeEventListener('mouseenter', this.handleMouseEnter);
    // referenceEle.removeEventListener('mouseleave', this.handleMouseLeave);
  },
};
