'user strict'

const Joi = require('@hapi/joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

module.exports = [{
  method: 'GET',
  path: '/',
  handler: site.home
},

{
  method: 'GET',
  // options: {
  //   validate: {
  //     payload: {
  //       name: Joi.string().required().min(3),
  //       email: Joi.string().required().email(),
  //       password: Joi.string().required().min(6)
  //     }
  //   }
  // },
  path: '/register',
  handler: site.register
},

{
  method: 'POST',
  path: '/create-user',
  handler: user.createUser
},

{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      index: ['index.html']
    }
  }
}
]