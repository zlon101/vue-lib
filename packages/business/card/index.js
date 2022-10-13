import Card from './src/card';
export { default as example } from './example/usage.vue';

Card.install = function(Vue) {
  if (Card.installed) return;
  Card.installed = true;
  Vue.component(Card.name, Card);
};

export default Card;
