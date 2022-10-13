function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const { name } = child.$options;
    if (name === componentName) {
      child.$emit(eventName, params);
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let { name } = parent.$options;
      if (componentName === name) {
        parent.$emit(eventName, params);
        return;
      }
      while (parent) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
          if (componentName === name) {
            parent.$emit(eventName, params);
            return;
          }
        }
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
