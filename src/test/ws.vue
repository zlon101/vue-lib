<template>
  <section>
    <h2>WS 测试</h2>
    <button @click="onCreateWs">建立WS连接</button>
    <button @click="onWsSend">发送消息</button>
  </section>
</template>

<script>
// 建立Ws连接
function createWs() {
  // Create WebSocket connection.
  const socket = new WebSocket('ws://127.0.0.1:8380');

  // Connection opened
  socket.addEventListener('open', event => {
    socket.send('Hello Server!');
  });

  // Listen for messages
  socket.addEventListener('message', event => {
    console.debug('收到来自服务端的Ws消息:', event.data);
    console.debug(event);
  });
  return socket;
}

export default {
  methods: {
    // Ws
    onCreateWs() {
      this.ws = createWs();
    },
    onWsSend() {
      this.ws.send('测试数据');
    },
  },
};
</script>
