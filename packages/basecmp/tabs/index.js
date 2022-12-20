import Tabs from './src/tabs.vue';
import TabsPane from './src/tabsPane.vue';
import TabsPaneV2 from './src/tabsPaneV2.vue';

Tabs.Pane = TabsPane;
Tabs.install = function(Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabsPane.name, TabsPane);
  Vue.component(TabsPaneV2.name, TabsPaneV2);
};

export {
  Tabs,
  TabsPane,
  TabsPaneV2,
};
export default Tabs;
