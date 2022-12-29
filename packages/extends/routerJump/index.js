/**
 * 打开新标签页
 */
import { getType } from '@zl/utils/object';

function jump(routeConfig, args) {
  const defaultArgs = { blank: false, replace: false, event: {} };

  if (getType(args).toLowerCase().includes('event')) {
    args = Object.assign(defaultArgs, { event: args });
  } else {
    args = Object.assign(defaultArgs, args);
  }
  // event: Boolean | MouseEvent
  let isNewTab = false;
  if (args.blank || args.event.ctrlKey || args.event.metaKey) {
    isNewTab = true;
  }
  let newHref = '';
  if (typeof routeConfig === 'string' && routeConfig.includes('//')) {
    newHref = routeConfig;
  } else {
    newHref = this.$router.resolve(routeConfig).href;
  }
  if (isNewTab) {
    window.open(newHref, '_blank');
    return;
  }
  if (newHref === window.location.href) { return; }

  if (args.replace) {
    this.$router.replace(routeConfig).catch(() => {});
  } else {
    this.$router.push(routeConfig).catch(() => {});
  }
};

export default function(Vue) {
  if (jump.installed) return;
  jump.installed = true;
  Vue.prototype.$routerJump = jump;
}
