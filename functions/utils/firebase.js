const admin = require('firebase-admin')
const serviceAccount = require('./firebase-service-account')

let initialized = false

const _initialize = () => {
  if (!initialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FB_DATABASE_URL,
    })
    initialized = true
  }
}

const createToken = async () => {
  _initialize()
  const uid = Math.random().toString(36)
  const token = await admin.auth().createCustomToken(uid, {
    admin_username: process.env.ADMIN_USERNAME,
  })
  return token
}

module.exports.createToken = createToken
