'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { request } = require('http')
const { appendFile } = require('fs')
const cors = require ('fastify-cors')
const { Readable } = require('stream')
const fs = require('fs');





module.exports = async function (fastify, opts) {

  fastify.get('/', async function (request, reply) {
    
  })
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  })




  fastify.register(require('fastify-cors'), { 
    origin: 'http://paco.ddns.me/',
    methods: ['GET', 'POST'],
    credentials: ['Content-Type', 'Authorization'],
  })


  

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
