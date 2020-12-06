const UserPool = require('../../../../src/lib/user-pool');

const Logout = (req, res) => {
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
};

export default Logout;
