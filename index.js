import Hapi from 'hapi'

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
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist'
    }
  }
})

server.start(() => {
  console.log('Server running at:', server.info.uri)
})
