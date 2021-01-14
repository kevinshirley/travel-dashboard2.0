import React from 'react';
import HomeSection1 from 'src/components/home/home-section-1';
import HomeSection2 from 'src/components/home/home-section-2';
import PageHeader from 'src/components/common/page-header';

import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'

function Home() {

  return (
    <>
      <PageHeader title='Travel Dashboard' />
      <HomeSection1 />
      <HomeSection2 />
      <br />
      <br />
      <AmplifySignOut />
    </>
  );
};

export default withAuthenticator(Home);
