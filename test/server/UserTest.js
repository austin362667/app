const T = require('./tester')

describe('POS 使用者', function() {
  before(async () => { await T.start() })
  after(async () => { await T.stop() })

  describe('註冊/登入/登出', function() {
    it('signup: 註冊新帳戶，應該成功！', async () => {
      await T.post('/user/signup', 200, {
        'uid': 'snoopy',
        'password': '123',
      })
    })
    it('signup: 註冊第二次，應該失敗！', async () => {
      await T.post('/user/signup', 400, {
        'uid': 'snoopy',
        'password': '123',
      })
    })
    it('login: 已註冊使用者登入正確帳號密碼，應該成功！', async () => {
      await T.post('/user/login', 200, {
        'uid': 'snoopy',
        'password': '123',
      })
    })
    it('logout : 已登入後登出應該會成功！', async () => {
      await T.post('/user/logout', 200,)
    })
    it('login: 已註冊使用者登入錯誤帳號密碼，應該失敗！', async () => {
      await T.post('/user/login', 400, {
        'uid': 'snoopy',
        'password': '333',
      })
    })

  })
})
