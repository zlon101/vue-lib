import TagGroup from './src/tagGroup';
export { default as example } from './example/usage';

TagGroup.install = function(Vue) {
  if (TagGroup.installed) return;
  TagGroup.installed = true;
  Vue.component(TagGroup.name, TagGroup);
};

export default TagGroup;
