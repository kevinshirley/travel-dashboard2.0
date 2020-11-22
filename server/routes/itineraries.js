require('dotenv').config();
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { head } = require('ramda');
const moment = require('moment');

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

// Gets all itineraries
router.get('/itineraries', (req, res, next) => {
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
});

// Get a single itinerary by id
router.get('/itinerary', (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();
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
    } else {
      const { Items } = data;
      res.send({
        success: true,
        itinerary: head(Items)
      });
    }
  });
});

// Get all itineraries for specific user
router.get('/itineraries/user', (req, res, next) => {
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
    } else {
      const { Items } = data;
      res.send({
        success: true,
        itineraries: Items
      });
    }
  });
});

// Add an itinerary
router.post('/itinerary', (req, res, next) => {
  AWS.config.update(config.aws_remote_config);
  const db = new AWS.DynamoDB.DocumentClient();
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
});

// Remove an itinerary for specific user
router.post('/itineraries/user/delete', (req, res, next) => {
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
    console.log({ err, data });
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
});

module.exports = router;