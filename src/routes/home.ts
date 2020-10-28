import { Context, DefaultState } from 'koa'
import * as Router from 'koa-router'

const router = new Router<DefaultState, Context>()

const COOKIE_NAME = 'CSRF_COOKIE'
const COOKIE_VALUE = 'Are you ok ?'

let name = 'chaos1ee'

router.get('/', async ctx => {
  ctx.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    maxAge: 60 * 60 * 1000,
    secure: true,
    sameSite: false
  })

  await ctx.render('index', {
    name,
    cookies: [
      {
        name: COOKIE_NAME,
        value: ctx.cookies.get(COOKIE_NAME) || COOKIE_VALUE
      }
    ]
  })
})

router.get('/get', async ctx => {
  if (ctx.cookies.get(COOKIE_NAME) === COOKIE_VALUE) {
    name = ctx.query.name

    ctx.body = {
      name
    }
  } else {
    ctx.body = {
      msg: '获取不到cookie'
    }
  }
})

module.exports = router
