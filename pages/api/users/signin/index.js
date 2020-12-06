const UserPool = require('../../../../src/lib/user-pool');
const { CognitoUser, AuthenticationDetails } = require('amazon-cognito-identity-js');

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
}

export default Signin;
