<template>
  <div ref="d-cib" class="c-info-bar">
    <div class="cib-content">
      <div ref="d-cibi" :style="{ paddingRight: pr }" class="cib-inner">
        <div v-if="title || $slots.left" class="cib-item">
          <span v-if="title">{{ title }}</span>
          <!-- 最左边value特殊的情况 -->
          <slot name="left"></slot>
        </div>
        <!-- 中间特殊情况 -->
        <slot name="mid"></slot>
        <div class="cib-item" v-for="(item, index) in data" :key="index" :style="item.style">
          <span v-if="item.title" class="cib-title">{{ item.title }}</span>
          <span v-if="typeof item.desc === 'string'">{{item.desc}}</span>
          <template v-else-if="Array.isArray(item.desc)">
            <span
              v-for="(desc, i) in item.desc"
              :key="i"
              :class="['cib-desc', typeof desc === 'object' && desc.class]"
              @click="desc.click && desc.click()"
            >
              {{ typeof desc === 'object' ? desc.text : desc }}
              <template v-if="typeof desc === 'object' && desc.children">
                <template v-for="(child, i2) in desc.children">
                  <span
                    :key="i2"
                    v-if="typeof child === 'object'"
                    :class="['child', child.class]"
                    v-text="child.text"
                    @click="child.click && child.click()"
                  ></span>
                  <span v-else :key="i2" class="child" v-text="child"></span>
                </template>
              </template>
            </span>
          </template>
          <span
            v-else-if="typeof item.desc === 'object'"
            :class="['cib-desc', item.desc.class]"
            @click="item.desc.click && item.desc.click()"
          >
            {{ item.desc.text }}
            <template v-for="(child, i2) in item.desc.children || []">
              <span
                v-if="typeof child === 'object'"
                :key="i2"
                :class="['child', child.class]"
                v-text="child.text"
                @click="child.click && child.click()"
              ></span>
              <span v-else :key="i2" class="child" v-text="child"></span>
            </template>
          </span>
        </div>
        <!-- 循环结束 -->
      </div>
    </div>
    <!-- 只能传入哪些绝对定位在右边的元素 -->
    <div ref="d-cibl" class="cib-last" :class="{ empty: !$slots.right }">
      <i ref="shadow" v-if="showShadow" class="cibl-shadow"></i>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
  },
  data() {
    return {
      showShadow: true,
      pr: '0',
      observer: null,
    };
  },
};
</script>

<style lang="less" scoped>
.c-info-bar {
  display: flex;
  align-items: stretch;
  position: relative;
  margin: 0 0 24px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 13px 0 rgba(184, 192, 207, 0.13);
  transition: all 0.2s;
  overflow: hidden;
  // z-index: @zLeveBreadcrumb;
  &:hover {
    box-shadow: 0 8px 40px 0 rgba(123, 129, 139, 0.13);
  }
  // 开关
  .root-status-toggle {
    margin-right: 0;
  }
  .c-hover-tip {
    margin: 0 60px;
    .hover-tip-wrap * {
      overflow: visible;
    }
  }
  // 服务Icon
  .icon-text {
    .name {
      margin-right: 0;
    }
  }
  .item:last-child {
    margin-right: 0;
  }
  .cib-content {
    flex: 1 1 auto;
    overflow: auto;
    padding-right: 80px;
    .cib-inner {
      display: inline-flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 16px 32px 16px 32px;
      .cib-item {
        word-break: break-all;
        margin-right: 64px;
        align-self: center;
        min-width: 96px;
        max-width: 200px;
        .cib-title {
          display: block;
          // font-size: 14px;
          // line-height: 22px;
          font-size: 12px;
          line-height: 18px;
          color: #17103d;
        }
        .name {
          font-size: 14px;
          line-height: 22px;
        }
        .cib-desc {
          display: block;
          // font-size: 12px;
          // line-height: 20px;
          font-size: 14px;
          line-height: 22px;
          color: #7f8fa4;
        }
        .link {
          font-size: 14px;
          color: #3a51e0;
          letter-spacing: 0;
          line-height: 24px;
          cursor: pointer;
        }
        &:last-child {
          margin-right: 0;
        }
        .copy-wrap {
          display: flex;
          align-items: center;
          > :first-child {
            display: inline-block;
            max-width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .copy_icon_black {
            margin-left: 8px;
          }
        }
      }
    }
  }
  .cib-last {
    flex: 0 0 auto;
    // position: absolute;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: auto;
    // margin: auto;
    // top: 0;
    // right: 0;
    // bottom: 0;
    padding-right: 32px;
    background: #fff;
    &.empty {
      padding-right: 0;
    }
    .cibl-shadow {
      position: absolute;
      pointer-events: none;
      width: 80px;
      top: 0;
      bottom: 0;
      left: -80px;
      background: rgba(255, 255, 255, 0.5);
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    }
  }
}
</style>
