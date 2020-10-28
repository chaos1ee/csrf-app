const Koa = require('koa')
const koaStatic = require('koa-static')
const { resolve } = require('path')
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')

import registerRouter from './routes/index'
// import logger from './util/logger'

const https = require('https')
const fs = require('fs')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

app.use(bodyparser())

app.use(koaStatic(resolve(__dirname + 'public')))

app.use(
  views(resolve(__dirname, 'views'), {
    map: { html: 'ejs' },
    extension: 'ejs'
  })
)

app.use(registerRouter())


const getTlsOptions = () => isDev ? {
    key: fs.readFileSync(resolve(__dirname, './keys/', 'server.key')),
    cert: fs.readFileSync(resolve(__dirname, './keys/', 'server.crt'))
  }
  : {
    key: fs.readFileSync(resolve('/keys/', 'server.key')),
    cert: fs.readFileSync(resolve('/keys/', 'server.crt'))
  }


https
  .createServer(
    getTlsOptions(),
    app.callback()
  )
  .listen(Number(process.env.PORT), '0.0.0.0')
