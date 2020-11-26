require('dotenv').config();
const AWS = require('aws-sdk');
const { head } = require('ramda');
const moment = require('moment');

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

const Itinerary = (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();

  if (req.method === 'GET') {
    const itinerary_id = req.query.itinerary_id;

    const params = {
      TableName: config.aws_table_name,
      KeyConditionExpression: 'itinerary_id = :i',
      ExpressionAttributeValues: {
        ':i': itinerary_id
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
          itinerary: head(Items)
        });
        res.end();
      }
    });
  }

  if (req.method === 'POST') {
    const parsed = JSON.parse(req.body);
    const { itinerary_id, createdAt, createdBy, updatedAt, country, tripInformation, tripItinerary } = parsed;

    const params = {
      TableName: config.aws_table_name,
      Item: {
        itinerary_id,
        createdAt: createdAt ? createdAt : moment().format(),
        createdBy,
        updatedAt: updatedAt ? updatedAt : '',
        country,
        tripInformation,
        tripItinerary
      }
    };

    db.put(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          error: err
        });
        res.end();
      } else {
        res.send({
          success: true,
          itineraries: params.Items
        });
        res.end();
      }
    });
  }
};

export default Itinerary;
