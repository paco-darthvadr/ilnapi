'use strict'


module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, response, gram) {
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
        'x-access-token': '',
        'Content-Type': 'application/json'
      },
    }
     
     request(opts, function (error, response) {
       if (error) throw new Error(error);
       const body = JSON.parse(response.body)
       var oz = body.price;
       const gram = oz * 0.03215074;
       fastify.log.info(JSON.stringify(body));
       fs.writeFileSync('./public/gold.html', JSON.stringify(body));
      })
      return { status: 'ok'};
  })
  next()
}
