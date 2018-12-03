'use strict';

const dynamodb = require('./dynamodb');

module.exports.list = async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  const scanPromise = dynamodb.scan(params).promise();
  scanPromise.then(result => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    };
    callback(null, response);
  }).catch(error => {
    console.error(error);
    callback(null, {
      statusCode: error.statusCode || 500,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Couldn\'t fetch the todo item.',
    });
  });
};
