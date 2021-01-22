import React from 'react';
import HomeSection1 from 'src/components/home/home-section-1';
import HomeSection2 from 'src/components/home/home-section-2';
import PageHeader from 'src/components/common/page-header';
import Link from 'next/link';

function Home() {
  return (
    <>
      <PageHeader title='Travel Dashboard' />
      <HomeSection1 />
      <HomeSection2 />
      <Link href='/authenticated'>
        <a>Authenticated</a>
      </Link>
    </>
  );
};

export default Home;
