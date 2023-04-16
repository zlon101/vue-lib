import Vue from 'vue';
import watermarkVue from './watermark.vue';

const WatermarkComponent = Vue.extend(watermarkVue);
let instance;

const Watermark = (name, phone) => {
  if (!instance) {
    instance = new WatermarkComponent({
      data: { name, phone },
    }).$mount();
    document.body.appendChild(instance.$el);
  }

  instance.name = name;
  instance.phone = phone;

  Vue.nextTick(() => {
    instance.show();
  });

  return instance;
};

export default Watermark;
