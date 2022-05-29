import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import cors from 'koa2-cors'

import run from './run'

const app = new Koa()

app.use(cors())
app.use(koaBody())

const router = new Router()

router.get('/api', async (ctx, next) => {
  ctx.body = { message: 'Hello World' }
  await next()
})

router.post('/api/save', async (ctx, next) => {
  console.log('save:', ctx.request.body)
  // ...储存到数据库
  ctx.body = { message: 'Save data successful', receivedData: ctx.request.body }
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

run(app.callback())
