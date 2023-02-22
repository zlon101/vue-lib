log('加载 index.js');

require(['mod-a'], ModA => {
  log(ModA.add(3, 5));
})