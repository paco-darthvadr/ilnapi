'use strict'


module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, response, reply, gram) {
    var request = require('request');
    const fs = require('fs');
    // request from 'request';
    var opts = {

      //Get you free api key at www.goldapi.io


      url: 'https://www.goldapi.io/api/XAU/USD',
      schema: { 
        tags: ['goldg'],
        description: 'gram gold price',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string'},
              gold: { type: 'string', body: 'string'} 
            }
          }
        }
      },
      headers: {
        'x-access-token': 'api-key',
        'Content-Type': 'application/json'
      },
    }

     async function request(opts, response) {
      const res = request(opts, response)
      await reply
      const body = JSON.stringify(res.body)
      var oz = body.price;
      const gram = oz * 0.03215074;
      fastify.log.info(JSON.stringify(body));
     } 
    request(opts)
    reply.then(reply.send(JSON.stringify(body)))
    return { status: 'ok', gold: (JSON.stringify(body)) }
     .then(body => console.log('resolved', body));
 })
 next()
}

