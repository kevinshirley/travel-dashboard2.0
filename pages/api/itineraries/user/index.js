require('dotenv').config();
const AWS = require('aws-sdk');

const {
  AWS_ACCESS_KEY_ID, 
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = process.env;

const config = {
  aws_table_name: 'itineraries',
  aws_remote_config: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  }
};

const UserItineraries = (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();
  const userId = req.query.userId;

  const params = {
    TableName: config.aws_table_name,
    IndexName: 'createdBy-index',
    KeyConditionExpression: 'createdBy = :i',
    ExpressionAttributeValues: {
      ':i': userId
    }
  };

  db.query(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
      res.end();
    } else {
      const { Items } = data;
      res.send({
        success: true,
        itineraries: Items
      });
      res.end();
    }
  });
};

export default UserItineraries;
