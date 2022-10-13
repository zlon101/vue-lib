<template>
  <div class="c-style-example">
    <div class="list-wrap" v-for="item in ClsList" :key="item.clsName">
      <p>
        <span>{{item.clsName}}：</span>
        <span class="note">{{item.note}}</span>
      </p>
    </div>

    <div class="example-wrap">
      <div class="example-item">
        <p>g-require</p>
        <div class="g-require">姓名</div>
      </div>
      <div class="example-item">
        <p>icon_refresh_blue</p>
        <div class="icon_refresh_blue"></div>
      </div>
      <div class="example-item">
        <p>g-single-text</p>
        <div class="g-single-text">文本文本文本文本文本文本文本文本文本文本文本文本</div>
      </div>
      <div class="example-item">
        <p>g-table-mutil-btn</p>
        <span class="g-table-mutil-btn red">删除</span>
        <span class="g-table-mutil-btn green">删除</span>
      </div>
      <div class="example-item">
        <p>g-error-msg</p>
        <div class="g-error-msg">错误信息</div>
      </div>

      <div class="example-item">
        <p>g-success-msg</p>
        <div class="g-success-msg">文本</div>
      </div>
      <div class="example-item">
        <p>g-processing-msg</p>
        <div class="g-processing-msg">文本</div>
      </div>
      <div class="example-item contain">
        <p>g-self-center</p>
        <div class="g-self-center"></div>
      </div>
      <div class="example-item contain">
        <p>g-background-grid</p>
        <div class="g-background-grid" style="height: 100%;"></div>
      </div>
      <div class="example-item contain" style="background-color:#000 ">
        <p style="color: #fff">g-page-bgfilter</p>
        <div class="g-page-bgfilter" style="height: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ClsList from './note.json';

export default {
  data() {
    return {
      ClsList,
    };
  },
};
</script>

<style lang="less">
.c-style-example {
  .list-wrap {
    > p {
      margin-bottom: 16px;
      border-bottom: 1px solid #06003b;
      > :first-child {
        display: inline-block;
        min-width: 150px;
        white-space: nowrap;
      }
      .note {

      }
    }
  }
  .example-wrap {
    outline: 2px solid red;
    .example-item {
      white-space: nowrap;
      display: inline-block;
      margin: 8px;
      padding: 4px;
      width: 200px;
      border: 1px solid #67C23A;
      border-radius: 8px;
      vertical-align: top;
      &.contain {
        height: 200px;
        position: relative;
      }
    }
    .g-self-center {
      width: 50%;
      height: 50%;
      background-color: #67C23A;
    }
    .g-single-text {
      max-width: 100%;
    }
  }
}
</style>
