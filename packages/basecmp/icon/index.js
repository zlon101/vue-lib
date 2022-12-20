import Vue from 'vue';
import './src/font.less';
import * as TotalIcon from './src/icon';

export const registor = (name) => {
  const component = TotalIcon[name];
  if (component && !component.installed) {
    component.installed = true;
    Vue.component(name, component);
  }
};

export * from './src/icon';
export { default as example } from './example/usage.vue';
