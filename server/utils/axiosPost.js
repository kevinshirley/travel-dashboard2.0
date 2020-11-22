const axios = require('axios');
const qs = require('qs');

const axiosPost = async (url, payload = {}) => {
  const data = qs.stringify(payload);

  const response = await axios({
    method: 'POST',
    url,
    data,
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log('axios error:', e);
    });

  return response;
};

module.exports = axiosPost;
