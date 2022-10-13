<template>
  <div class="c-infobar-ex">
    <InfoBar title="标题" :data="infoBarData" />
    <InfoBar :data="infoBarData">
      <template v-slot:left><button>左侧固定侧按钮</button></template>
      <template v-slot:right><button>右侧固定按钮</button></template>
    </InfoBar>
    <InfoBar :data="infoBarData">
      <template v-slot:mid>
        <p>中间内容</p>
        <p>中间内容</p>
      </template>
    </InfoBar>
  </div>
</template>

<script>
import InfoBar from '../src/infoBar';

export default {
  components: {
    InfoBar,
  },
  data() {
    return {
      infoBarData: [
        {
          title: '姓名',
          desc: '张三',
          style: 'color:red',
        },
        {
          title: '数组描述',
          desc: ['地址1', '地址2'],
        },
        {
          title: '对象描述',
          desc: {
            text: '点我',
            class: 'sklqosf',
            click: () => alert('提示'),
          },
        },
        {
          title: '对象描述2',
          desc: {
            text: '文本',
            class: 'gwosf',
            children: [
              '节点1',
              {
                text: '点我',
                click: () => alert('提示'),
              },
            ],
          },
        },
      ],
    };
  },
};
</script>
