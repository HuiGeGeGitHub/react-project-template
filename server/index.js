const path = require('path')
const server = require('koa-static')
const Koa = require('koa')
const app = new Koa()
// 1.主页静态网页 把静态页统一放到public中管理
console.log(path.join(__dirname,'/build'))
app.use(server(path.join(__dirname,'/build')))
app.listen(3838)