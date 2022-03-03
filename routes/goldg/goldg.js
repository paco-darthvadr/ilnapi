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
              goldg: { type: 'number', format: 'gram'} 
            }
          }
        }
      },
      headers: {
        'x-access-token': 'api-key',
        'Content-Type': 'application/json'
      },
    }
     
     request(opts, function (error, response) {
       if (error) throw new Error(error);
       const body = JSON.parse(response.body)
       var oz = body.price;
       const gram = oz * 0.03215074;
       fastify.log.info(JSON.stringify(gram));
       fs.writeFileSync('./public/goldg.html', JSON.stringify(gram));
      })
      request(opts)
      reply.then(reply.send(JSON.stringify(gram)))
      return { status: 'ok', gold: (JSON.stringify(gram)) }
  })
  next()
}
