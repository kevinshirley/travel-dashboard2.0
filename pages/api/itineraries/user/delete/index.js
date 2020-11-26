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

const DeleteUserItinerary = (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();
  const { itinerary_id, country } = req.body;

  const params = {
    TableName: config.aws_table_name,
    Key: {
      "itinerary_id": itinerary_id,
      "country": country,
    },
    ConditionExpression:"itinerary_id = :val",
    ExpressionAttributeValues: {
      ":val": itinerary_id
    }
  };

  db.delete(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      res.send({
        success: true,
        data
      });
    }
  });
};

export default DeleteUserItinerary;
