import Vue from 'vue';
import dialogVue from './dialog.vue';

const DialogComponent = Vue.extend(dialogVue);

const Dialog = () => {
  const parent = document.body;
  const instance = new DialogComponent({
    el: document.createElement('div'),
  });

  parent.appendChild(instance.$el);

  return instance;
};

export default Dialog;
