# 家庭商店 Pos 系統

#### 不分店家或顧客，任何身分皆可買賣，每件商品以一則post為單位。考量到電商產業中許多商品並非量產，例如二手衣物等。另一方面，簡化使用者體驗。像是社交媒體instagram，拍照po文，但是我們每發一則貼文，即代表販賣貼文所述的商品或服務。

## 物件(暫定)

* User -- 使用者: 創建帳號後可以採購或販售商品。
* Market -- 商場: 有很多商品，可以搜尋後下單。
* Model -- MVC 的 M: 資料庫存取者
* Router -- MVC 的 C: 控制路由轉發
* View -- MVC 的 V: 目前使用 koa-json 丟給前端，沒有獨立物件。

## 功能點 Function Point

* 註冊 User.signup
* 登入 User.login
* 登出 User.logout(尚未完成)
* 商品清單 Market.listItems
* 上架商品 Market.addItem
* 商品搜尋 Market.searchItems(部分完成)(標籤可以是分類或地點等)

## 使用個案 User Story(部分異動)

* [UserTest.js](test/server/UserTest.js) -- 使用者註冊帳號，然後登入。
* [ShopCreater.js](test/server/ShopCreater.js) -- 經營者創立商店 (ccc, 20191204)
* [ShopEmployee.js](test/server/ShopEmployee.js) -- 商店自己輸入訂單
* [MarketSearch.js](test/server/MarketSearch.js) -- 選擇區域後查詢該區域的商店列表。
* [Buyer.js](test/server/Buyer.js) -- 購物者搜尋商店，然後訂購物品
* [MobileBuyer.js](test/server/MobileBuyer.js) -- 使用手機尋找附近商店
