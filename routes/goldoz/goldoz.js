'use strict'



module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, reply, gram, oz) {
    var request = require('request');
    const fs = require('fs');
    // request from 'request';
    var opts = {

      //Get you free api key at www.goldapi.io

      url: 'https://www.goldapi.io/api/XAU/USD',
      schema: { 
        tags: ['goldoz'],
        description: 'oz of gold price',
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string'},
              goldoz: { type: 'number', format: 'oz'} 
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
       //Your code here
       const body = JSON.parse(response.body)
       const oz = body.price;
       const gram = oz * 0.03215074;
       fastify.log.info(JSON.stringify(oz)); 
       fs.writeFileSync('./public/goldoz.html', JSON.stringify(oz));     
     })
     return { status: 'ok'};
  })
  next()
}
