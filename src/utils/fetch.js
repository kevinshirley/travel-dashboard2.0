import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import qs from 'qs';

export const get = async url => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const post = async (url, payload) => {
  try {
    const response = await fetch(url, { 
      method: 'post',
      body: JSON.stringify(payload),
      headers: new Headers({
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const axiosPostDocument = async (url, payload) => {
  const response = await axios({
    method: 'POST',
    url: url,
    data: payload,
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
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

export const axiosGet = async (url) => {
  const response = await axios({
    method: 'GET',
    url,
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

export const axiosPost = async (url, payload = {}) => {
  const data = qs.stringify(payload);

  const response = await axios({
    method: 'POST',
    url: url,
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
