`use strict`


const Hapi = require('@hapi/hapi')
const handlebars = require('handlebars')
const inert = require('@hapi/inert')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const vision = require('@hapi/vision')

handlebars.registerHelper('answerNumber', (answers) => {
  if (answers === undefined) {
    return 0;
  }
  const keys = Object.keys(answers)
  return keys.length
})

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  
  try {
    await server.register(inert)
    await server.register(vision)

    server.state('user',{
      ttl: 1000*60*60*24*7,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout:true,
      layoutPath: 'views'
    })

    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)

    await server.start()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  console.error('unhandleRejection', error.message, error);
})
process.on('unhandleExeption', error => {
  console.error('unhandleExeption', error.message, error);
})

init()
