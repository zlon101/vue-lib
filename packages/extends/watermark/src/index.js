import Vue from 'vue';
import watermarkVue from './watermark.vue';

const WatermarkComponent = Vue.extend(watermarkVue);
let instance;

const Watermark = (name, phone) => {
  const parent = document.body;

  if (!instance) {
    instance = new WatermarkComponent({
      el: document.createElement('div'),
      data: { name, phone },
    });
    parent.appendChild(instance.$el);
  }

  instance.name = name;
  instance.phone = phone;

  Vue.nextTick(() => {
    instance.show();
  });

  return instance;
};

export default Watermark;
