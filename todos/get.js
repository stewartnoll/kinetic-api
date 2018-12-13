'use strict';

const dynamodb = require('./dynamodb');

module.exports.get = async (event) => {
  const params = {
    TableName: process.env.TODOS_TABLE_NAME,
    Key: {
      id: event.pathParameters.id,
    },
  };
  let getResult = null;
  try {
    getResult = await dynamodb.get(params).promise();
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: 'Couldn\'t fetch the todo item.',
    };
  }

  // create a response
  return {
    statusCode: 200,
    body: JSON.stringify(getResult.Item),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  };
};
