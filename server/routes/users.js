const express = require('express');
const router = express.Router();
const UserPool = require('../lib/user-pool');
const { CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');
const axiosPost = require('../utils/axiosPost');
const { dissoc } = require('ramda');
const moment = require('moment');
const fetchGet = require('../utils/fetch');

router.post('/users/sign-up', (req, res) => {
  const { email, password } = req.body;

  UserPool.signUp(email, password, [], null, (err, data) => {
    if (err) {
      return res.send({
        success: false,
        message: err.message,
        error: err
      });
    } else {
      const profileData = {
        ...dissoc('password', req.body),
        id: data.userSub,
        createdAt: moment().format(),
      };

      axiosPost('http://localhost:3010/api/profile', profileData)
        .then(result => {
          if (result.status === 200) {
            return res.send({
              success: true,
              message: 'Successfully created profile!',
              data,
              profile: {
                ...result.data.profile,
              },
            });
          } else {
            return res.send({
              success: false,
              message: 'Able to sign up, but profile was not created.',
              data,
              error: result,
            });
          }
        })
        .catch(err => {
          return res.send({
            success: false,
            message: 'Able to sign up, but profile was not created.',
            data,
            error: err,
          });
        });
    }
  });
});

router.post('/users/sign-in', (req, res) => {
  const { email, password } = req.body;

  const user = new CognitoUser({
    Username: email,
    Pool: UserPool
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  user.authenticateUser(authDetails, {
    onSuccess: data => {
      return res.send({
        success: true,
        message: 'Welcome back!',
        data
      });
    },
    onFailure: err => {
      return res.send({
        success: false,
        message: err.message,
        error: err
      });
    },
    newPasswordRequired: data => {
      return res.send({
        success: true,
        message: 'Welcome back, new password required.',
        data
      });
    }
  });
});

router.post('/users/session', (req, res) => {
  const user = UserPool.getCurrentUser();
  const userData = {
    ...user,
  };

  if (user) {
    user.getSession((err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: err.message,
          error: err
        });
      } else {
        fetchGet(`http://localhost:3010/api/profile?id=${userData.username}`)
          .then(result => {
            if (result.success) {
              return res.send({
                success: true,
                message: 'Session is true.',
                data: {
                  id: userData.username,
                  session,
                  profile: result.profile,
                }
              });
            } else {
              return res.send({
                success: true,
                message: 'Session is true.',
                data: {
                  id: userData.username,
                  session,
                  profile: {},
                }
              });
            }
          })
          .catch(err => {
            return res.send({
              success: false,
              message: 'HTTP error',
              error: err,
            });
          });
      }
    })
  } else {
    return res.send({
      success: false,
      message: 'No user or session active.',
      data: {}
    });
  }
});

router.post('/users/logout', (req, res) => {
  const user = UserPool.getCurrentUser();

  if (user) {
    user.signOut();

    return res.send({
      success: true,
      message: 'Logged out successfully',
      data: {}
    });
  } else {
    return res.send({
      success: false,
      message: 'No user active to log out.',
      data: {}
    });
  }
});

module.exports = router;
