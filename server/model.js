// MVC 的 M: Model -- 所有資料庫存取都透過此模組。
const M = module.exports = {}
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'pos'

M.open = async function () {
  M.client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
  M.db = await M.client.db(dbName)
  M.db.collection('ask').createIndex({ task: "text", uid: "text" })
}

M.clear = async function () {
  await M.db.collection('users').remove({})
  await M.db.collection('shops').remove({})
  //await M.db.collection('ask').remove({})
  // await M.users.drop()
  // await M.shops.drop()
}

M.close = async function () {
  await M.client.close()
}

M.insertOne = async function (table, obj) {
  return await M.db.collection(table).insertOne(obj)
}

M.deleteMany = async function (table, query) {
  return await M.db.collection(table).deleteMany(query)
}

M.findOne = async function (table, query) {
  return await M.db.collection(table).findOne(query)
}

M.find = async function (table, query) {

    return await M.db.collection(table).find(query).toArray()
}

M.update = async function (table,  f,query) {

    return await M.db.collection(table).updateOne({ "_id": ObjectID(f)}, query)
}