'use strict';

const dynamodb = require('./dynamodb');

module.exports.delete = async (event) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await dynamodb.delete(params).promise();
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'Couldn\'t remove the todo item.',
    };
  }

  // create a response
  return {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
  };
};
