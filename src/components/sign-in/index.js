import React from 'react';
import SignIn from 'src/components/sign-in/sign-in-component';
import PageHeader from 'src/components/common/page-header';
import { ToastProvider } from 'react-toast-notifications';

function SignInContainer({ signIn, signInError, isSignInSubmitting }) {
  return (
    <>
      <PageHeader title='Sign In' />
      <ToastProvider>
        <SignIn
          isSubmitting={isSignInSubmitting}
          signIn={signIn}
          signInError={signInError}
        />
      </ToastProvider>
    </>
  );
};

export default SignInContainer;
