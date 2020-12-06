const { CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');
const UserPool = require('../../../../src/lib/user-pool');

const Signin = (req, res) => {
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
    onSuccess: session => {
      const tokens = {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      };
      console.log({ session, tokens });
      user['tokens'] = tokens;

      return res.send({
        success: true,
        message: 'Welcome back!',
        data: tokens
      });
    },
    onFailure: err => {
      return res.send({
        success: false,
        message: err.message,
        error: err
      });
    },
    newPasswordRequired: session => {
      const tokens = {
        accessToken: session.getAccessToken().getJwtToken(),
        idToken: session.getIdToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      };

      user['tokens'] = tokens;

      return res.send({
        success: true,
        message: 'Welcome back, new password required.',
        data: tokens
      });
    }
  });
}

export default Signin;
