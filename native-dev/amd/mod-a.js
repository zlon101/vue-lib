log('加载 mod-a.js');

define('mod-a', {
  add: function(x, y){
    return x + y;
  },
  sub: (x, y) => x - y,
  uid: 'abcdefg',
});
