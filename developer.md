# POS 開發者須知

本專案將採用下列技術組合：

1. 採用 Web 2.0 模式，以 fetch API 作為前後端 AJAX 通訊方法
2. 採用 Koa 作為 Server 端框架，搭配 koa-static, koa-session, koa-body, koa-router 等周邊模組。
3. 採用 MongoDB 作為資料庫
4. 使用 ES6 的 template string (模板字符串) 作為樣板引擎，不需另外安裝樣板引擎。
5. 使用 ES6 的語法，但不使用 import , export 等新語法，不使用 babel 去轉換語法，也不使用 vue.js, angular.js, react.js 等前端框架。
6. 使用 mocha + supertest + puppeteer 進行測試。 (TDD 視情況採用，不強求！))

## 檔案結構

```
/public      // 前端網頁
/server      // server 端程式碼
/test        // 測試程式
```

## 目前狀態

1. 目前《前端/後端》兩邊尚未連接起來
2. test 資料夾中的測試程式分三類
    * unit -- 單元測試
    * server -- 使用 supertest 進行 server 端程式碼測試
    * e2e -- 使用 puppeteer 模仿使用者在瀏覽器中的操作進行 e2e 測試
