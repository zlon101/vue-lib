<template>
  <div :class="['c-input-image', {disabled}]">
    <slot>
      <div v-if="value" class="preview" :style="sizeSty">
        <img :src="value" alt="上传的图像" />
        <i class="act-icon iconfont icon-cross" @click="onDelete"></i>
      </div>
      <div v-else class="empty" :style="sizeSty" @click="onEdit">
        <span class="image-desc">{{ desc }}</span>
        <slot name="empty"></slot>
        <span class="act-icon iconfont icon-edit"></span>
      </div>
    </slot>
    <div v-if="!hideErrMsg" class="g-error-msg">{{ error || errMsg }}</div>
    <input ref="input" type="file" accept="image/png, image/jpeg, image/jpg" @change="onChange" />
  </div>
</template>

<script>
export default {
  name: 'InputImage',
  props: {
    value: String,
    maxSize: {
      type: Number,
      default: 3,
    },
    desc: String,
    width: String,
    height: String,
    errMsg: String,
    disabled: Boolean,
    hideErrMsg: Boolean, // 隐藏报错信息
  },
  data() {
    return {
      error: '',
    };
  },
  computed: {
    sizeSty({ width, height }) {
      const styObj = {};
      width && (styObj.width = width);
      height && (styObj.height = height);
      return styObj;
    },
  },
  methods: {
    onChange(e) {
      if (this.disabled) return;
      this.error = '';
      const file = e.target.files[0];
      if (!file) return;
      if (!['image/jpg', 'image/png', 'image/jpeg'].includes(file.type)) {
        this.error = '图片格式不支持，上传失败';
        this.$emit('error', this.error);
        return;
      }
      if (file.size > this.maxSize * 1024 * 1024) {
        this.error = '图像尺寸过大';
        this.$emit('error', this.error);
        return;
      }
      const loadImg = base64 => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = base64;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('图片加载失败'));
        });
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        loadImg(base64).then(() => {
          this.$emit('input', base64, file);
        });
      };
    },
    onEdit() {
      if (this.disabled) return;
      const ele = this.$refs.input;
      ele.value = '';
      ele.click();
    },
    onDelete() {
      if (this.disabled) return;
      this.$emit('input', '');
    },
  },
};
</script>

<style lang="less" scoped>
.c-input-image {
  &.disabled {
    cursor: not-allowed;
    .empty {
      cursor: not-allowed;
      .image-desc {
        color: #BFC4CD;
      }
    }
  }
  input[type='file'] {
    display: none;
  }
  .empty {
    display: block;
    height: 44px;
    width: 44px;
    border: 1px dashed #c0c4cc;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
  }
  .image-desc {
    color: #3a51e0;
    font-size: 14px;
    line-height: 22px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .preview {
    width: 44px;
    height: 44px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .act-icon {
    &.icon-edit {
      width: 24px;
      height: 24px;
      font-size: 24px;
      line-height: 24px;
    }
    &.icon-cross {
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
    }
    display: inline-block;
    position: absolute;
    right: -10px;
    bottom: -8px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px 0 rgba(184, 192, 207, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
