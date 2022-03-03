'use strict'

const fetch = require('node-fetch')

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
     
    fetch('https://www.goldapi.io/api/XAU/USD', opts)
    .then((response) => response.json())
    .then((data) => {
      let price = data.price * 0.03215074;
      response.status(200).send({ status: 'ok', price: price });
      fs.writeFileSync('./public/goldg.html', JSON.stringify(price));
    });
     
 });
 next()
}
