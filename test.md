## POS 系統目前測試結果

```
PS D:\ccc\code\js\pos> npm run testS
npm WARN npm npm does not support Node.js v10.16.0
npm WARN npm You should probably upgrade to a newer version of node as we
npm WARN npm can't make any promises that npm will work with this version.
npm WARN npm Supported releases of Node.js are the latest release of 4, 6, 7, 8, 9.
npm WARN npm You can find the latest version at https://nodejs.org/

> pos@0.0.1 test D:\ccc\code\js\pos
> mocha test/**/*.js



  POS 商場搜尋

      √ 新增商店
      √ 列出所有商店
      √ 刪除所有商店

  POS 使用者《註冊/登入/登出》

  <-- POST /user/signup
  --> POST /user/signup 200 126ms 3b
      √ 註冊新帳戶，應該成功！ (191ms)
  <-- POST /user/signup
  --> POST /user/signup 400 10ms 25b
      √ 註冊第二次，應該失敗！
  <-- POST /user/login
  --> POST /user/login 200 17ms 3b
      √ 已註冊使用者登入正確帳號密碼，應該成功！
  <-- POST /user/login
  --> POST /user/login 400 6ms 18b
      √ 已註冊使用者登入錯誤帳號密碼，應該失敗！

  POS Model 測試
    使用者 CURD
      √ 新增 snoopy
      √ 刪除 snoopy


  9 passing (4s)
```

使用puppeteer測試需另開app.js，並執行npm run testC
