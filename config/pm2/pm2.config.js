module.exports = {
  name: 'csrf-app',
  script: 'src/app.ts',
  interpreter: 'node',
  interpreter_args:
    '--require ts-node/register --require tsconfig-paths/register',
  watch: true,
  ignore_watch: ['node_modules'],
  max_restarts: 10,
  restart_delay: 3000,
  min_uptime: 3000,
  combine_logs: true,
  merge_logs: true,
  error_file: 'logs/err.log',
  out_file: 'logs/out.log',
  time: true,
  // pm2 不支持esm https://github.com/Unitech/pm2/issues/3751
  args: '--color',
  'max-memory-restart': '300M'
}
