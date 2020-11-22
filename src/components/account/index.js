import React from 'react';
import Account from 'src/components/account/account-component';
import PageHeader from 'src/components/common/page-header';

function AccountContainer({ logout, profile }) {
  return (
    <>
      <PageHeader title='Hi user,' />
      <Account logout={logout} profile={profile} />
    </>
  );
}

export default AccountContainer;
