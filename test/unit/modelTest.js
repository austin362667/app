const M = require('../../server/model')

describe('POS Model 測試', function() {
  before(async function() {
    await M.open()
    await M.clear()
  })
  after(async function () {
    await M.close()
  })

  describe('使用者 CURD', function() {
    it('新增 snoopy', async function() {
      await M.insertOne('users', {uid:'snoopy', password:'123'})
    })
    it('刪除 snoopy', async function() {
      await M.deleteMany('users', {uid:'snoopy'})
    })
  })
})
