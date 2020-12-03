const UserPool = require('src/lib/user-pool');
const { dissoc } = require('ramda');
const moment = require('moment');
const axiosPost = require('../../../../server/utils/axiosPost');
// const { axiosPost } = require('src/utils/fetch');

const SignUp = (req, res) => {
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

      // axiosPost('http://localhost:3010/api/profile', profileData)
      axiosPost('https://d4jedgskaall.cloudfront.net/api/profile', profileData)
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
};

export default SignUp;
