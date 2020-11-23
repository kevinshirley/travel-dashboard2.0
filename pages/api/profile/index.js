require('dotenv').config();
const AWS = require('aws-sdk');
const { head, isEmpty } = require('ramda');

const {
  SOFTELO_AWS_ACCESS_KEY_ID, 
  SOFTELO_AWS_SECRET_ACCESS_KEY,
  SOFTELO_AWS_REGION
} = process.env;

const config = {
  aws_table_name: 'profiles',
  aws_remote_config: {
    accessKeyId: SOFTELO_AWS_ACCESS_KEY_ID,
    secretAccessKey: SOFTELO_AWS_SECRET_ACCESS_KEY,
    region: SOFTELO_AWS_REGION
  }
};

const Profile = (req, res) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();

  if (req.method === 'GET') {
    const id = req.query.id;

    const params = {
      TableName: config.aws_table_name,
      KeyConditionExpression: 'id = :i',
      ExpressionAttributeValues: {
        ':i': id
      }
    };

    db.query(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          error: err
        });
      } else {
        const { Items } = data;
  
        if (isEmpty(Items)) {
          res.send({
            success: false,
            profile: {},
          });
        } else {
          res.send({
            success: true,
            profile: head(Items),
          });
        }
      }
    });
  }

  if (req.method === 'POST') {
    const params = {
      TableName: config.aws_table_name,
      Item: {
        ...req.body,
      }
    };
  
    db.put(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          error: err
        });
      } else {
        res.send({
          success: true,
          profile: params.Item,
        });
      }
    });
  }
}

export default Profile;
