require('dotenv').config();
const { CognitoUserPool } = require('amazon-cognito-identity-js');

const {
  AWS_USER_POOL_ID,
  AWS_CLIENT_ID,
} = process.env;

const poolData = {
  UserPoolId: AWS_USER_POOL_ID,
  ClientId: AWS_CLIENT_ID,
};

module.exports = new CognitoUserPool(poolData);
