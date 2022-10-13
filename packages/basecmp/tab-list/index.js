import TabList from './src/index';
export { default as example } from './example/usage';

TabList.install = function (Vue) {
  if (TabList.installed) return;
  TabList.installed = true;
  Vue.component(TabList.name, TabList);
};

export default TabList;
