'use strict'

module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, reply, gold) {
    var request = require('request');
    const fs = require('fs')
    // request from 'request';
    var opts = {

      url: 'https://stats-api.atomicdex.io/api/v1/ticker',
      schema: { 
        tags: ['adex'],
        description: 'all adex prices',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string'},
              price: { type: 'number', format: 'last_price'} 
            }
          }
        }
      },
      headers: {
        'Content-Type': 'application/json'
      },
    }
     
     request(opts, function (error, response) {
       if (error) throw new Error(error);
       //Your code here
       const body = JSON.parse(response.body);
       fastify.log.info(JSON.stringify(response.body));
       fs.writeFileSync('./public/adex.html', JSON.stringify(body));
     })
     return { status: 'ok'};

  })
  next()
}