import { Context, DefaultState } from 'koa'
import * as Router from 'koa-router'

const router = new Router<DefaultState, Context>()

const COOKIE_NAME = 'CSRF_COOKIE'
const COOKIE_VALUE = 'Are you ok ?'

let name = 'chaos1ee'

router.get('/', async ctx => {
  if (!ctx.cookies.get(COOKIE_NAME)) {
    ctx.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: false
    })
  }

  await ctx.render('index', { name })
})

router.get('/get', async ctx => {
  name = ctx.query.name
  ctx.redirect('/')
})

module.exports = router
