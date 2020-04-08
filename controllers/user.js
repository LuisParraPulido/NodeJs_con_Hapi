'use strict'

const users = require('../models/index').users

function register (req, h) {
  return h.view('register')
}

async function createUser (req, h) {
  let result
  try {
    // const createUserId = await users.create(req.payload)

    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.response('Problemas creando el usuario').code(500)
  }
  return h.response(`Usuario creado ID: ${result}`)

}

module.exports = {
  register,
  createUser: createUser
}