const T = require('./tester')

describe('POS 商場搜尋', function() {
  before(async ()=>{ await T.start() })
  after(async ()=>{ await T.stop() })

  describe('', function() {
    it('新增商店', async ()=>{
      // await T.post('/shop/create', 200, {uid:'snoopy', name:'狗狗之家'})
    })
    it('列出所有商店', async ()=>{
      // await T.get('/market/shopList', 200).expect(/snoopy/).expect('Content-Type', /json/)
    })
    it('刪除所有商店', async ()=>{
      // await T.post('/shop/delete', 200).expect(/snoopy/).expect('Content-Type', /json/)
    })
  })
})
