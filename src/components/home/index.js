import React from 'react';
import PageHeader from 'src/components/common/page-header';
import HomeSection1 from 'src/components/home/home-section-1';
import HomeSection2 from 'src/components/home/home-section-2';

function Home() {
  return (
    <>
      <PageHeader title='Travel Dashboard' />
      <HomeSection1 />
      <HomeSection2 />
    </>
  );
};

export default Home;
