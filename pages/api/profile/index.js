require('dotenv').config();
const AWS = require('aws-sdk');
const { head, isEmpty } = require('ramda');

const {
  AWS_ACCESS_KEY_ID, 
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_SESSION_TOKEN
} = process.env;

const config = {
  aws_table_name: 'profiles',
  aws_remote_config: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  }
};

const Profile = (req, res) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient({ sessionToken: AWS_SESSION_TOKEN });

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
        return res.send({
          success: false,
          error: err
        });
      } else {
        return res.send({
          success: true,
          profile: params.Item,
        });
      }
    });
  }
}

export default Profile;
