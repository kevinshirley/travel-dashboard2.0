require('dotenv').config();
const Health = (req, res) => {
  return res.send({
    success: true,
    message: 'This API is healty!',
    envVarTest: process.env.KEVIN_TEST_KEY,
    awsRegion: process.env.AWS_REGION
  });
};

export default Health;
