const { dissoc } = require('ramda');
const firebaseAdmin = require('../../../../src/lib/auth/firebaseAdmin');

const SignUp = (req, res) => {
  const { email, password, username } = req.body;
  const db = firebaseAdmin.firestore();

  const profileData = {
    ...dissoc('password', req.body),
    createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
  };

  firebaseAdmin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      // phoneNumber: '',
      password,
      displayName: username,
      // photoURL: '',
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user: ', userRecord);
      console.log({ db });
      db.collection('userProfile').add({
        id: userRecord.uid,
        ...profileData,
      });

      res.send({
        success: true,
        data: { userRecord, profile: profileData },
      });
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.send({
        success: false,
        error,
      });
    });
};

export default SignUp;
