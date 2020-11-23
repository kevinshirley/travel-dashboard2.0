const UserPool = require('src/lib/user-pool');
const { axiosGet } = require('src/utils/fetch');

const Session = (req, res) => {
  const user = UserPool.getCurrentUser();
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
        const profile = axiosGet(`http://localhost:3010/api/profile?id=${userData.username}`);

        profile
          .then(result => {
            const data = result.data;
            if (data.success) {
              return res.send({
                success: true,
                message: 'Session is true.',
                data: {
                  id: data.profile.id,
                  session,
                  profile: data.profile,
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