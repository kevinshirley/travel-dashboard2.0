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

const Itineraries = (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: config.aws_table_name
  };

  db.scan(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        itineraries: Items
      });
    }
  });
};


export default Itineraries;
