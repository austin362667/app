// MVC 的 C: Controller = Router -- 處理任務委派事宜。
const router = module.exports = require('koa-router')()
const User = require('./user')
const Shop = require('./shop')
const Market = require('./market')
const View = require('./view')



router
    .get('/user/signup', View.signup) // 靜態註冊頁
    .post('/apis/signup', User.signup) // 註冊 
    .get('/user/login', View.login) // 靜態登入頁
    .post('/apis/login', User.login) // 登入
  .post('/user/logout', User.logout) // 登出
  .post('/shop/create', Shop.create) // 開店
  .post('/shop/setting', Shop.setting) // 設定: 可自訂商店產品
  .post('/shop/order', Shop.order) // 訂購商品
  .post('/shop/report', Shop.report) // 商店訂單報表
    .get('/', Market.listItems)
    .get('/sell', Market.editItem)
    .post('/apis/sell', Market.addItem)
    .get('/searchResult', View.searchItems)
    .post('/searchResult', Market.searchItems)
    .get('/user/monitor', User.monitor)
    .post('/apis/buy', Market.userBuy)