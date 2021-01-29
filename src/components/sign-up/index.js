import React from 'react';
import SignUp from 'src/components/sign-up/sign-up-component';
import PageHeader from 'src/components/common/page-header';
import { ToastProvider } from 'react-toast-notifications';

function SignUpContainer({ signUp, signUpError, signUpSuccess, isSignUpSubmitting }) {
  return (
    <>
      <div className='c-initial-layout'>
        <div className='c-sign-in__wrapper'>
          <ToastProvider>
            <SignUp
              isSignUpSubmitting={isSignUpSubmitting}
              signUp={signUp}
              signUpError={signUpError}
              signUpSuccess={signUpSuccess}
            />
          </ToastProvider>
        </div>
        <div className='c-initial-layout__sign-in-info'>
          <div className='c-initial-layout__sign-in-info--content'>
            <h1>A travel professional's<br/> all in one tool</h1>
            <h3>Build dynamic itineraries, create invoices, manage your clients in a stunning CRM, and much more</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpContainer;
