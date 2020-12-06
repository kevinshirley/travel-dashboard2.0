const Health = (req, res) => {
  return res.send({
    success: true,
    message: 'This API is healty!',
    appUrl: process.env.APP_URL
  });
};

export default Health;
