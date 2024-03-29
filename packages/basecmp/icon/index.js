import './src/font.less';
import * as TotalIcon from './src/icon.jsx';

export const registor = (app, name) => {
  const component = TotalIcon[name];
  if (component && !component.installed) {
    component.installed = true;
    app.component(name, component);
  }
};

export * from './src/icon.jsx';
export { default as example } from './example/usage.vue';
