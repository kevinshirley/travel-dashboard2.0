import React from 'react';
import HomeSection1 from 'src/components/home/home-section-1';
import HomeSection2 from 'src/components/home/home-section-2';
import PageHeader from 'src/components/common/page-header';

import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("User: ", user)
        setUser(user)
      })
      .catch(err => setUser(null))
  }, [])

  return (
    <>
      <PageHeader title='Travel Dashboard' />
      <HomeSection1 />
      <HomeSection2 />
      <div className='c-generic-modal-form'>
        { user && <h1>Welcome, {user.attributes.email}</h1> }
        <AmplifySignOut />
      </div>
    </>
  );
};

export default withAuthenticator(Home);
