'use strict';

const uuid = require('uuid');
const dynamodb = require('./dynamodb');

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed (text)');
    return {
      statusCode: 400,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: 'Couldn\'t create the todo item.',
    };
  }

  const timestamp = new Date().getTime();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  };
  try {
    await dynamodb.put(params).promise();
  } catch(error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: 'Couldn\'t create the todo item.',
    };
  }

  // create a response
  return {
    statusCode: 201,
    body: JSON.stringify(params.Item),
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true 
    },
  };
};
