'use strict'

const fetch = require('node-fetch')

module.exports = async function (fastify, opts, next) {
  fastify.get('/', async function (request, response,reply, gold) {
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
     
    fetch('https://stats-api.atomicdex.io/api/v1/ticker', opts)
    .then((response) => response.json())
    .then((data) => {
      let last_price = data.last_price;
      response.status(200).send({ status: 'ok', last_price: data });
      fs.writeFileSync('./public/adex.html', JSON.stringify(data));
    });
  })
  next()
}