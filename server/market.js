//Ask 商店: 使用者創建問題後可以買東西或服務。
const Market = module.exports = {}
const M = require('./model')

Market.addItem = async function (ctx) {
    const post = ctx.request.body

    
    let r = await M.insertOne('ask', post)
    console.log(post)
    ctx.status = 200
    ctx.body = 'OK!'
    //ctx.redirect('/')
}

Market.searchItems = async function (ctx) {
    //await M.deleteMany('ask', {})

    
        var dbPosts = await M.find('ask', { $text: { $search: ctx.request.body.q } })

 
    uid = ctx.session.user

    
        console.log(dbPosts)
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
<p>We have <strong>${dbPosts.length}</strong> posts matched your search!</p>
  <ul id="posts">
    ${  dbPosts.map(result =>

            `
      <li>
        <h5>Content : ${result.task}</h5>
        <h5>Sell by : ${result.uid}</h5>
      </li>
`
        ).join('\n')}
  </ul>

</body>`
    
}

Market.userBuy = async function (ctx) {

    let post = JSON.parse(ctx.request.body)
    p = post.id
    console.log(p)
    await M.update('ask', post.id, { $set: { state: "sold" } })
        .then((obj) => {
        console.log('Updated - ' + obj);
    })
        .catch((err) => {
            console.log('Error: ' + err);
        }) 
    
    ctx.status = 200
    //alert('Purchased successful!')
    ctx.redirect('/')

}

Market.listItems = async function (ctx) {
    //await M.deleteMany('ask', {})
    let dbPosts = await M.find('ask', {})
    dbPosts.forEach(function (post, index, array) {
        console.log(index, post)
    })
    uid = ctx.session.user

    if (uid) {
        
        ctx.body = `
<head>
	<title>Home page</title>
    <h1>Home</h1>
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
<p>Now have <strong>${dbPosts.length}</strong> posts wait for buyers!</p>
  <ul id="posts">
    ${ dbPosts.map(result =>
            `<li>
        <h5>Content : ${result.task},  Price : $${result.price}</h5>
        <h5>Sell by : ${result.uid},  State : ${result.state}</h5>
        <button type="button" onclick="buy('${result._id}')">BUY!</button>
      </li>`
        ).join('\n')}
  </ul>
<script type='text/javascript'>

function buy(p){
  postData('/apis/buy', {id: p})
}

    async function postData(url, data) {
    // Default options are marked with *
        await fetch(url, {
            body: JSON.stringify(data),
            headers: {
      'user-agent': 'Mozilla/4.0 MDN Example'
            },
            method: 'POST' 
        })
}
</script>
</body>
 `
    } else {
        ctx.body = `
<head>
	<title>Home page</title>
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

Market.editItem = async function (ctx) {
    uid = ctx.session.user
    console.log(uid)
    if (uid) {

        ctx.body = `
<html>
<head>
	<title>Sell</title>
    <h1>Sell anything</h1>
<ul>
  <li><a href="http://localhost:3000/">Home</a></li>
  <li><a href="http://localhost:3000/sell">Sell</a></li>
  <li><a href="http://localhost:3000/user/signup">Signup</a></li>
  <li><a href="http://localhost:3000/user/login">Login</a></li>
</ul>
</head>
<body>
    <p>Hi <strong id="uid">${uid}</strong> !</p>
    <p>Post an item or service here.</p>
    <button onclick="eating()">Eating</button>
    <button onclick="clothing()">Clothing</button>
    <button onclick="living()">Living</button>
    <button onclick="moving()">Moving</button>
    <button onclick="entertaining()">Entertaining</button>
    <form>
        <textarea  type="text" id="case" placeholder="You can edit goods content here.."></textarea>
        <input  type="number" id="price" placeholder="please enter price here.."></input>
        <button type="button" onclick="create()">Post</button>
    </form>

    <script>

        function create() {
            var problem = document.getElementById("case").value
            var money = document.getElementById("price").value
            var name = "${uid}"//document.getElementById("uid").value
            var Data = { "task": problem , "uid": name, "price": money, "state": "selling"}
            postData('/apis/sell', Data)
        }

        async function postData(url, data) {
            // Default options are marked with *
            await fetch(url, {
                body: JSON.stringify(data),
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
        }
        var x = document.getElementById("case");

        function eating() {
            x.innerHTML += "eating ";
        }
        function clothing() {
            x.innerHTML += "clothing ";
        }
        function living() {
            x.innerHTML += "Living ";
        }
        function moving() {
            x.innerHTML += "Moving ";
        }
        function entertaining() {
            x.innerHTML += "Entertaining ";
        }
    </script>
</body>
</html>
`
    } else {

        ctx.body = `
<head>
	<title>Sell</title>
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


