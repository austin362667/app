const User = module.exports = {}
const M = require('./model')



User.signup = async function (ctx) {
    const user = ctx.request.body
    console.log(user)
  let dbUser = await M.findOne('users', {uid:user.uid})
  if (dbUser == null) { // 該 uid 的使用者不存在，可以使用該名稱註冊
    let r = await M.insertOne('users', user)
    ctx.status = 200
      ctx.body = 'OK!'
      ctx.redirect('/user/login')
  } else { // 該 uid 的使用者已經存在，無法使用該 uid 註冊
    ctx.status = 400
    ctx.body = 'Error: User already exist'
      }
}

User.login = async function (ctx) {


    const user = ctx.request.body
    console.log(user)
  let dbUser = await M.findOne('users', {uid:user.uid})
  if (dbUser != null && dbUser.password === user.password) { // 帳號密碼正確，登入成功！
    ctx.status = 200
    ctx.session.user = user.uid
    ctx.body = `<script language="javascript">
                alert('Login successful!')
                </script>`   
    //ctx.redirect('/')

  } else { // 帳號密碼錯誤，登入失敗！
    ctx.status = 400
    ctx.body = `<script language="javascript">
                alert('Login failed!')
                </script>` 
    
  }
}

User.logout = async function(ctx) {
  delete ctx.session.user
  ctx.status = 200
  ctx.body = 'OK!'
}

User.monitor = async function (ctx) {
    uid = ctx.session.user
    let dbPosts = await M.find('ask', { $text: { $search: uid } })
    
    if (uid) {

        ctx.body = `
<head>
	<title>Monitor</title>
    <h1>Monitor</h1>
<ul>
  <li><a href="http://localhost:3000/">Home</a></li>
  <li><a href="http://localhost:3000/sell">Sell</a></li>
  <li><a href="http://localhost:3000/user/signup">Signup</a></li>
  <li><a href="http://localhost:3000/user/login">Login</a></li>
  <li><a href="http://localhost:3000/searchResult">Search</a></li>
  <li><a href="http://localhost:3000/user/monitor">Monitor</a></li>
</ul>
</head>
<body>
<p>Hi <strong>${uid}</strong> !</p>
<p>You have posted <strong>${dbPosts.length}</strong> items  for sell!</p>
  <ul id="posts">
    ${ dbPosts.map(result =>
            `<li>
        <h5>Content : ${result.task},  Price : $${result.price}</h5>
        <h5>Sell by : ${result.uid},  State : ${result.state}</h5>
      </li>`
        ).join('\n')}
  </ul>
</body>
 `
    } else {
        ctx.body = `
<head>
	<title>Monitor</title>
<ul>
  <li><a href="http://localhost:3000/">Home</a></li>
  <li><a href="http://localhost:3000/sell">Sell</a></li>
  <li><a href="http://localhost:3000/user/signup">Signup</a></li>
  <li><a href="http://localhost:3000/user/login">Login</a></li>
</ul>
</head>
<p>Please login !</p>`
    }
}
