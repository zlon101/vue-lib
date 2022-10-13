<template>
  <transition name="slide-fade">
    <canvas v-show="visible" id="c-watermark" class="c-watermark"></canvas>
  </transition>
</template>

<script>
import { dateToString } from '@zl/utils/lib/date';
import extendToast from '@zl/extend-toast';
import './watermark.less';

export default {
  data() {
    return {
      visible: false,
      name: '',
      phone: '',
      timeout: 5,
    };
  },
  mounted() {
    window.addEventListener('resize', this.renderWatermark, false);
  },
  destroyed() {
    window.removeEventListener('resize', this.renderWatermark, false);
  },
  methods: {
    show() {
      this.visible = true;
      this.$nextTick(this.renderWatermark);
      let times = 0;
      this.toast(times);
      const timerId = setInterval(() => {
        times++;
        if (times >= this.timeout) {
          this.visible = false;
          clearInterval(timerId);
        } else {
          this.toast(times);
        }
      }, 1000);
    },
    toast(times) {
      return extendToast({
        type: 'warning',
        text: `预览中，剩余${this.timeout - times}秒`,
        icon: 'icon-processing',
        timeout: 1000,
      });
    },
    renderWatermark() {
      const canvas = document.getElementById('c-watermark');
      const ctx = canvas.getContext('2d');

      const realWidth = canvas.offsetWidth;
      const realHeight = canvas.offsetHeight;

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      ctx.rotate((328 * Math.PI) / 180);
      ctx.fillStyle = 'rgba(170, 170, 170, 0.4)';
      ctx.font = '12px PingFangSC-Regular';

      const width = 245;
      const height = 174;

      const wCount = realWidth / width + 5;
      const hCount = realHeight / height + 3;

      for (let h = -3; h < hCount; h++) {
        for (let w = -3; w < wCount; w++) {
          ctx.fillText(this.name, h * width + (w % 2 === 0 ? width / 2 : 0), w * height);
          ctx.fillText(this.phone, h * width + (w % 2 === 0 ? width / 2 : 0) + 92, w * height);
          ctx.fillText(dateToString(new Date(), 'YYYY-MM-DD hh:mm:ss'), h * width + (w % 2 === 0 ? width / 2 : 0), w * height + 17);
        }
      }
    },
  },
};
</script>
