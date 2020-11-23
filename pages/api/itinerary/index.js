const AWS = require('aws-sdk');
const { head } = require('ramda');

const {
  SOFTELO_AWS_ACCESS_KEY_ID, 
  SOFTELO_AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = process.env;

const config = {
  aws_table_name: 'itineraries',
  aws_remote_config: {
    accessKeyId: SOFTELO_AWS_ACCESS_KEY_ID,
    secretAccessKey: SOFTELO_AWS_SECRET_ACCESS_KEY,
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
        return res.send({
          success: false,
          error: err
        });
      } else {
        const { Items } = data;
        return res.send({
          success: true,
          itinerary: head(Items)
        });
      }
    });
  }

  if (req.method === 'POST') {
    const { itinerary_id, createdAt, createdBy, updatedAt, country, tripInformation, tripItinerary } = req.body;

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
      } else {
        res.send({
          success: true,
          itineraries: params.Items
        });
      }
    });
  }
};

export default Itinerary;
