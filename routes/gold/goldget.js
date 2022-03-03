'use strict'
const fetch = require('node-fetch')

module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, response, reply, gram) {
    var request = require('request');
    const fs = require('fs');
    // request from 'request';
    var opts = {

      //Get you free api key at www.goldapi.io
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

    fetch('https://www.goldapi.io/api/XAU/USD', opts)
    .then((response) => response.json())
    .then((data) => {
      let price = data.price;
      response.status(200).send({ status: 'ok', price: data });
      fs.writeFileSync('./public/gold.html', JSON.stringify(data));
    });
    
 });
 next()
}

