const AWS = require('aws-sdk');
const moment = require('moment');

const {
  AWS_ACCESS_KEY_ID, 
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = process.env;

const config = {
  aws_table_name: 'customers',
  aws_remote_config: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  }
};

const AddCustomer = (req, res) => {
  console.log('req.body', req.body);
  const { id, firstName, lastName, email, phoneNumber, createdBy } = req.body;

  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: config.aws_table_name,
    Item: {
      id,
      createdAt: moment().format(),
      createdBy,
      firstName,
      lastName,
      email,
      phoneNumber,
    }
  };

  db.put(params, function(err, data) {
    if (err) {
      res.send({
        success: false,
        error: err
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        customer: Items
      });
    }
  });
};

export default AddCustomer;
