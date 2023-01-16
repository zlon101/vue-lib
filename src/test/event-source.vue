<template>
  <section>
    <h2>EventSource 测试</h2>
    <button @click="onCreate">建立 Server Sent Event 连接</button>
    <div ref="msgs"></div>
  </section>
</template>

<script>
import { BaseUrl } from './xhr';

export default {
  methods: {
    onCreate() {
      /*****
      ajax({
        url: `${BaseUrl}/server-event`,
        method: 'get',
      }).then(resp => {
        console.debug('resp: \n', resp);
      }).catch(err => {
        console.debug('err:\n', err);
      });**********/
      const evtSource = new EventSource(`${BaseUrl}/server-event`);
      evtSource.onmessage = event => {
        const nEle = document.createElement('p');
        nEle.textContent = event.data;
        this.$refs.msgs.appendChild(nEle);
      };
      evtSource.onerror = err => {
        console.error('EventSource failed:', err);
        evtSource.close();
      };
    },
  },
};
</script>
