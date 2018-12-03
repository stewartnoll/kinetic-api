'use strict';

const dynamodb = require('./dynamodb');

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // delete the todo from the database
  dynamodb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Couldn\'t remove the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
    };
    callback(null, response);
  });
};
