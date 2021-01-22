import React, { useEffect } from 'react';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'react-calendar/dist/Calendar.css';
import 'src/styles/app.scss';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';

import { useUser } from 'src/lib/auth/useUser';
import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

function Layout(props) {
  const db = firebaseClient.firestore();
  const initialLoad = useAction(actions.root.initialLoad);
  const setProfile = useAction(actions.session.setProfile);
  const { user } = useUser();

  useEffect(() => {
    initialLoad();
  }, []);

  useEffect(() => {
    if (user) {
      db.collection('userProfile').where('id', '==', user.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const profile = doc.data();
          setProfile(profile);
        });
      });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Travel Dashboard</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" type='text/css' />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" type='text/css' />
        <script src="https://code.iconify.design/1/1.0.3/iconify.min.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.12/css/all.css" integrity="sha384-G0fIWCsCzJIMAVNQPfjH08cyYaUtMwjJwqiRKxxE/rx96Uroj1BtIQ6MLJuheaO9"></link>
        {/* <script src="https://kit.fontawesome.com/a19f8eb38c.js" crossOrigin="anonymous"></script> */}
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <div className='main-content'>
        {props.children}
      </div>
    </>
  );
};

export default Layout;