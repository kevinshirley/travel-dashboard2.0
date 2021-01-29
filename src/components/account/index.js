import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Account from 'src/components/account/account-component';
import PageHeader from 'src/components/common/page-header';

function AccountContainer({ profile }) {
  return (
    <>
      <PageHeader title={`Hi ${profile.firstName},`} />
      <ToastProvider>
        <Account profile={profile} />
      </ToastProvider>
    </>
  );
}

export default AccountContainer;
