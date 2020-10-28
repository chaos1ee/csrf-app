module.exports = {
  apps: [
    {
      ...require('./pm2.config'),
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 443
      }
    }
  ]
}
