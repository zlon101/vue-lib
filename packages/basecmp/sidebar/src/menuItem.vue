<!-- <template>
  <div :class="['c-menu-item', icon ? 'parent' : 'child', { active }]">
    <slot :name="icon"></slot>
    <p class="title">{{ title }}</p>
    <IconFold
      v-if="hasChild"
      s="24px"
      :style="{ color: active ? '#7F8FA4' : '#06003B' }"
      :class="['fold', { unfold }]"
      :stroke="{ 0: 'currentColor' }"
    />
  </div>
</template> -->

<script>
import { IconFold } from '@zl/icon';

export default {
  components: { IconFold },
  inheritAttrs: false,
  props: {
    title: String,
    vpath: String,
    icon: [String, Object],
    iconAttr: Object,
    unfold: Boolean,
    hasChild: Boolean,
  },
  computed: {
    active() {
      const menuvpath = this.vpath;
      const nowUrl = this.$route.meta.vpath;
      return new RegExp(`^${menuvpath}`).exec(nowUrl);
    },
  },
  render(h) {
    const { active, unfold, title, hasChild, icon, iconAttr } = this;
    const wrapCls = ['c-menu-item', icon ? 'parent' : 'child', { active }];
    const childs = [h('p', { class: 'title' }, title)];

    if (icon) {
      const IconCmp = typeof icon === 'string' ? h('span', { class: icon }) : h(icon, { props: iconAttr, class: 'icon' });
      childs.unshift(IconCmp);
    }
    if (hasChild) {
      const foldChild = h(IconFold, {
        class: ['fold', { unfold }],
        style: { color: active ? '#3A51E0' : '#7F8FA4' },
        props: { s: '14px', stroke: { 0: 'currentColor' } },
      });
      childs.push(foldChild);
    }
    return h('div', {
      class: wrapCls,
    }, childs);
  },
};
</script>

<style lang="less">
.c-menu-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease-out;
  &.child {
    height: 40px;
    color: #8d8c99;
    padding: 0 0 0 52px;
    margin: 4px 0;
    &.active {
      position: relative;
      height: 48px;
      background: #ebedff;
      &::after {
        content: ' ';
        position: absolute;
        top: 50%;
        right: 0;
        width: 3px;
        height: 20px;
        background: #3A51E0;
        border-radius: 10px;
        transform: translateY(-50%);
      }
    }
  }
  &.parent {
    height: 48px;
    color: #06003b;
    padding: 0 16px;
    margin: 0;
  }
  &.active {
    color: #3a51e0;
    font-weight: bold;
  }
  &:hover {
    background: #f0f2ff;
  }
  .title {
    flex: 1 1 auto;
  }
  .icon {
    margin-right: 12px;
  }
  .fold {
    transform: rotate(0deg);
    transition: transform 0.3s ease-out;
    &.unfold {
      transform: rotate(180deg);
    }
  }
}
</style>
