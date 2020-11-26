const Health = (req, res) => {
  return res.send({
    success: true,
    message: 'This API is healty!'
  });
};

export default Health;
