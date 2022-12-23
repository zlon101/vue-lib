<template>
  <div>
    <img src="./test.png" ref="imgDom" style="width:200px" @click="renderImg" />
    <div ref="imgContainer" style="outline:2px solid red"></div>
  </div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import React from 'react';
import EditorImg from '../src/index';
import './test.png';

export default {
  methods: {
    renderImg() {
      const EditorCmp = React.createElement(EditorImg, {
        source: this.$el.querySelector('img'),
        saveImage: (...param) => {
          console.debug('🔥 saveImage:\n', param);
        },
        imgFormat: 'png',
      });
      if (!this.reactRoot) {
        this.reactRoot = createRoot(this.$refs.imgContainer);
      }
      this.reactRoot.render(EditorCmp);
    },
  },
};
</script>
