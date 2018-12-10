'use strict';

const dynamodb = require('./dynamodb');

module.exports.list = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  let scanResult = null;
  try {
    scanResult = await dynamodb.scan(params).promise();
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Couldn\'t fetch the todo item.',
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(scanResult.Items),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  };
};
