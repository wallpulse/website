import Hapi from 'hapi'
import React from 'react'
import { readFileSync } from 'fs'
import App from './lib'

const template = readFileSync('./dist/index.html').toString()

const defaultConfig = {
  cache: {
    expiresIn: 30 * 24 * 3600000,
    privacy: 'public'
  }
}

var server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 3000
})

if (process.env.NODE_ENV === 'production') {
  console.log('Enabling redirect.')
  server.ext('onRequest', (request, reply) => {
    if (request.headers.host !== 'wallpul.se') {
      return reply.redirect('https://wallpul.se' + request.path)
    }
    reply.continue()
  })
}

server.ext('onPreResponse', (request, reply) => {
  if (request.response.isBoom) {
    request.response.output.payload = request.response.message
  }
  reply.continue()
})

server.on('response', (request) => {
  console.log(`${request.info.remoteAddress} - ${request.response.statusCode} ${request.method.toUpperCase()} ${request.url.path}`)
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    const rendered = React.renderToString(<App />)
    reply(template.replace('<div id="app"></div>', `<div id="app">${rendered}</div>`))
  },
  config: defaultConfig
})

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist'
    }
  },
  config: defaultConfig
})

server.start(() => {
  console.log('Server running at:', server.info.uri)
})
