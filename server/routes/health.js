const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  return res.send({
    success: true,
    message: 'This API is healty!'
  });
});

module.exports = router;
