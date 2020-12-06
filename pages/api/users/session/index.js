const { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken } = require('amazon-cognito-identity-js');
const UserPool = require('../../../../src/lib/user-pool');
const fetchGet = require('../../../../server/utils/fetch');

const Session = (req, res) => {
  const user = UserPool.getCurrentUser();
  console.log({ user });
  const userData = {
    ...user,
  };

  if (userData && userData.username) {
    user.getSession((err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: err.message,
          error: err
        });
      } else {
        const profile = fetchGet(`${process.env.APP_URL}/api/profile?id=${userData.username}`);

        profile
          .then(result => {
            console.log({ result });

            if (result.success) {
              return res.send({
                success: true,
                message: 'Session is true.',
                data: {
                  id: result.profile.id,
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
}

export default Session;