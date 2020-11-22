import React from 'react';
import LogoutSection1 from 'src/components/logout/logout-section-1';
import PageHeader from 'src/components/common/page-header';

function Logout() {
  return (
    <>
      <PageHeader title='Log out' />
      <LogoutSection1 />
    </>
  );
};

export default Logout;
