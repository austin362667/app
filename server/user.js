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
