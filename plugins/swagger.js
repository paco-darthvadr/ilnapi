'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts, next, gold) {
fastify.register(require('fastify-swagger'), {
  routePrefix: '/swagger',
  swagger: {
    info: {
      title: 'ILN API',
      description: 'Testing the ILN API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: '0.0.0.0:3000/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next(), gold() },
    preHandler: function (request, reply, next) { next(), gold() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true
})
})
