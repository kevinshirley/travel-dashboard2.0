import React from 'react';
import Account from 'src/components/account/account-component';
import PageHeader from 'src/components/common/page-header';

function AccountContainer({ profile }) {
  return (
    <>
      <PageHeader title={`Hi ${profile.firstName},`} />
      <Account profile={profile} />
    </>
  );
}

export default AccountContainer;
