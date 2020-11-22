import React from 'react';
import HomeSection1 from 'src/components/home/home-section-1';
import PageHeader from 'src/components/common/page-header';

function Home() {
  return (
    <>
      <PageHeader title='Travel Dashboard' />
      <HomeSection1 />
    </>
  );
};

export default Home;
