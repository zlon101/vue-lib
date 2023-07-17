import {createApp} from 'vue';
import WatermarkComponent from './watermark.vue';

let instance;

const Watermark = (name, phone) => {
  const parent = document.body;

  if (!instance) {
    instance = createApp(WatermarkComponent);
    const container = document.createElement('div');
    instance.mount(container);
    parent.appendChild(container);
  }
  instance.name = name;
  instance.phone = phone;
  instance.show();
  return instance;
};

export default Watermark;
