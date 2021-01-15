import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGl-qCipKpPq7ydoawQ42lDpvlE8iiR3M",
  authDomain: "traveldashboard-65f90.firebaseapp.com",
  projectId: "traveldashboard-65f90",
  storageBucket: "traveldashboard-65f90.appspot.com",
  messagingSenderId: "1019908432447",
  appId: "1:1019908432447:web:e5661cc9b753b8adac8e8a",
  measurementId: "G-GRE50FNZ6S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
