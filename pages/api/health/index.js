const Health = (req, res) => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  return res.send({
    success: true,
    message: 'This API is healty!',
    appUrl: process.env.APP_URL,
    firebaseProjectKey: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    firebasePrivateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebaseDatabaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
};

export default Health;
