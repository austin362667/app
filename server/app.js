// 伺服器主程式: 使用 MVC 架構。

const V = require('./view')
const M = require('./model')
const router = require('./router')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const koaJson = require('koa-json')
const session = require('koa-session')
const serve = require('koa-static');
const views = require('koa-views');

const Koa = require('koa')
const app = module.exports = new Koa()

app.keys = ['adfjjhvlkjafdjaf'];

const CONFIG = {
  key: 'ejkladsjflakfj', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
}

app.use(views('../public'))
app.use(session(CONFIG, app))
app.use(logger())
app.use(koaBody())
app.use(koaJson())
app.use(router.routes())

app.start = async function () { return await M.open() }
app.stop = async function () { return await M.close() }
app.clear = async function () { return await M.clear() } 

async function main() {
  await app.start() // M.open()
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

if (!module.parent) {
  main().catch(error=>console.log('error'))
}
