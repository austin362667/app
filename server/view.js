// MVC 的 V: View -- 所有 server 端的顯示動作都透過此模組。
const View = module.exports = {}

View.signup = async function (ctx) {
    await ctx.render('./user/Signup.html')
}

View.login = async function (ctx) {
    await ctx.render('./user/Login.html')
}

View.searchItems = async function (ctx) {
    uid = ctx.session.user
    ctx.body = `
<head>
	<title>Searching</title>
    <h1>Searching</h1>
<ul>
  <li><a href="http://localhost:3000/">Home</a></li>
  <li><a href="http://localhost:3000/sell">Sell</a></li>
  <li><a href="http://localhost:3000/user/signup">Signup</a></li>
  <li><a href="http://localhost:3000/user/login">Login</a></li>
</ul>
</head>
<body>
<p>Hi <strong>${uid}</strong> !</p>
    <form action="/searchResult" method="post">
        <input  type="text" id="q" name="q" placeholder="You can enter keywords here.."></input>
        <button type="submit">Search</button>
    </form>

</body>
 `

}

View.home = async function (ctx) {
    ctx.body =
`
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body onload="ShopMain.start()">
<header>
  <div class="navbar" style="float:left">
    <a onclick="Ui.openNav()" style="cursor:pointer">&#9776;</a>
  </div>
  <div class="navbar" style="float:right">
    <div class="dropdown">
      <button class="dropbtn">
        <i class="fa fa-user"></i>
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="/user/login">登入</a>
        <a href="#logout">登出</a>
        <a href="/user/signup">註冊</a>
      </div>
    </div>
    <a href="#title" id="title">店名</a>
  </div>
</header>
<aside>
  <div id="leftNav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" onclick="Ui.closeNav()">&times;</a>
    <a href="#" class="bold" style="color:#E0E000;font-size:150%;">LaPos</a>
    <div id="leftMenu">
    </div>
  </div>
</aside>
<main>
  <div id="main" class="table" style="text-align:center">
  </div>
</main>

<footer>
</footer>
</body>
</html>
`
}