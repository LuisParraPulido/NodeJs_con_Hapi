'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')
const { config } = require('../config/config')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `${config.dbUrl}`
})

const db = firebase.database()

const Users = require('./users')
const Questions = require('./questions')

module.exports = {
  users: new Users(db),
  questions: new Questions(db)
}