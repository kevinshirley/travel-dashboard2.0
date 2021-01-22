import React from 'react';
import SignUp from 'src/components/sign-up/sign-up-component';
import PageHeader from 'src/components/common/page-header';
import { ToastProvider } from 'react-toast-notifications';

function SignUpContainer({ signUp, signUpError, signUpSuccess, isSignUpSubmitting }) {
  return (
    <>
      <PageHeader title='Sign Up' />
      <ToastProvider>
        <SignUp
          isSignUpSubmitting={isSignUpSubmitting}
          signUp={signUp}
          signUpError={signUpError}
          signUpSuccess={signUpSuccess}
        />
      </ToastProvider>
    </>
  );
};

export default SignUpContainer;
