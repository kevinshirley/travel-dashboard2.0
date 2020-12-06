const Health = (req, res) => {
  return res.send({
    success: true,
    message: 'This API is healty!',
    envVarTest: process.env.KEVIN_TEST_KEY,
    appUrl: process.env.APP_URL
  });
};

export default Health;
