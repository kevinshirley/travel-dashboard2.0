require('dotenv').config();
const express = require('express');
const router = express.Router();
const contentful = require('contentful');

const { 
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PROD_HOST
} = process.env;

router.get('/contentful', async (req, res) => {
  const client = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
    host: CONTENTFUL_PROD_HOST
  });

  const data = await client.getEntries({ content_type: 'itineraryDestination' });
  return res.json({ data });
});

module.exports = router;
