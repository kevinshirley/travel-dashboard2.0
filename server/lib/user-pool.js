require('dotenv').config();
const { 
  SOFTELO_AWS_USER_POOL_ID,
  SOFTELO_AWS_CLIENT_ID,
} = process.env;
const { CognitoUserPool } = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: SOFTELO_AWS_USER_POOL_ID,
  ClientId: SOFTELO_AWS_CLIENT_ID,
};

module.exports = new CognitoUserPool(poolData);
