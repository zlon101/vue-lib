module.exports = {
  apps : [{
    name: 'picNpm',
    script: 'vue-cli-service serve',
    cwd: './',
    watch: false,
    error_file: './log/pic-npm-error.log', // 自定义应用程序错误日志
    out_file: './log/pic-npm-out.log', // 自定义应用程序标准输出
    autorestart: false, // 出现异常时自动重启, 有未捕获的错误会立即重新执行
    // cron_restart: '20 8 * * *', // 定时重启 https://pm2.fenxianglu.cn/docs/general/restart-strategies/
    merge_logs: true, // 追加日志而不是新建日志
  }, {
    name: 'verda',
    script: 'verdaccio -c ./verdaccio-config.yaml',
    cwd: './',
    watch: false,
    error_file: './log/verdaccio-error.log',
    out_file: './log/verdaccio-out.log',
    autorestart: false,
    merge_logs: true,
  }],
};
