require('dotenv').config();
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require('path');
const moment = require('moment');
const forwardSlashToDash = require('../utils/forward-slash-to-dash');

const { 
  SOFTELO_AWS_ACCESS_KEY_ID, 
  SOFTELO_AWS_SECRET_ACCESS_KEY,
  AWS_S3_TRAVEL_DASH_BUCKET
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: SOFTELO_AWS_ACCESS_KEY_ID,
  secretAccessKey: SOFTELO_AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_S3_TRAVEL_DASH_BUCKET
});

/**
 * Check file type
 */
function checkFileType(file, cb) {
  // allowed ext
  const filetypes = /jpeg|jpg|png|gif|doc|txt|docx|pdf|md|pptx|mp4/;
  // check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);

  let result;

  if (mimetype && extname) {
    result = cb(null, true);
  } else {
    result = cb('Error: Not an accepted file type.');
  }

  return result;
}

/**
 * Single Upload
 */
const uploadSingleFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_TRAVEL_DASH_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, forwardSlashToDash(moment().format('L')) + '/' + path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    }
  }),
  limits:{ fileSize: 10000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ) {
    checkFileType( file, cb );
  }
}).single('document');

// Add an itinerary
router.post('/upload/cover-image', (req, res, next) => {
  uploadSingleFile( req, res, (error) => {
    console.log('req.file 2', req.file);
    if (error) {
     console.log('errors', error);
     res.json({ error: error });
    } else {
      // If File not found
      if(req.file === undefined) {
        console.log( 'Error: No File Selected!' );
        res.json({ error: 'Error: No File Selected' });
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation
        });
      }
    }
  });
});

module.exports = router;