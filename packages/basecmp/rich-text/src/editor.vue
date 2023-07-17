<template>
  <div :class="['c-editor', preview && 'preview']">
    <div class="textarea"></div>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'Editor',
  props: {
    value: Object,
    preview: Boolean, // 预览模式
    placeholder: {
      type: String,
      default: '请输入内容',
    },
  },
  data() {
    return {
      quill: null,
    };
  },
  watch: {
    preview() {
      this.quill.enable(!this.preview);
    },
  },
  mounted() {
    const dom = this.$el.querySelector('.textarea');
    this.quill = new Quill(dom, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
      placeholder: this.placeholder,
    });
    this.quill.setContents(this.value);
    this.quill.on('text-change', () => {
      this.$emit('input', this.quill.getContents());
    });
    this.quill.enable(!this.preview);
  },
};
</script>

<style lang="less" scoped>
.c-editor {
  &.preview {
    :deep(.ql-toolbar.ql-snow) {
      display: none;
    }
    .textarea {
      border: none;
    }
    :deep(.ql-editor) {
      padding: 0;
    }
  }
}
</style>
