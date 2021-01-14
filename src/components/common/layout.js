import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Auth } from 'aws-amplify';
import { isNil, isEmpty } from 'ramda';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'react-calendar/dist/Calendar.css';
import 'src/styles/app.scss';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';

function Layout(props) {
  const [user, setUser] = useState(null);
  const signIn = useAction(actions.session.signIn);
  const initialLoad = useAction(actions.root.initialLoad);
  const isLoggedIn = useAction(actions.session.isLoggedIn);

  useEffect(() => {
    initialLoad();
    isLoggedIn();

    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('User: ', user)
        setUser(user)
      })
      .catch(err => setUser(null))
  }, []);

  useEffect(() => {
    if (!isNil(user)) {
      console.log('user present');
      console.log({ user });
      signIn({...user});
    }
  }, [user]);

  console.log('user ', user);

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