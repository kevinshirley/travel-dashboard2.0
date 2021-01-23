import 'isomorphic-fetch';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { wrapper } from 'src/store';
import { withApollo } from 'src/lib/withApollo';
import Layout from 'src/components/common/layout';
import Navbar from 'src/components/common/navbar';
import MainMenu from 'src/components/common/main-menu';
import SideMenu from 'src/components/common/side-menu';
import Footer from 'src/components/footer';
import Modal from 'src/components/common/modal';
import SignIn from 'src/components/sign-in/sign-in-component';
import { selectSignInIsSubmitting, selectsignInError } from 'src/store/selectors/session';

import { AuthProvider } from '../auth';
import { useUser } from 'src/lib/auth/useUser';

function Root({ Component, pageProps }) {
  const { user } = useUser();
  const isSignInSubmitting = useSelector(selectSignInIsSubmitting);
  const signInError = useSelector(selectsignInError);
  const signIn = useAction(actions.session.signIn);

  return (
    <>
      <AuthProvider>
        {user && user.id ? (
          <>
            <div className='container layout'>
              <Navbar />
              <div className='main'>
                <MainMenu />
                <Layout>
                  <div className='content'>
                    <Component {...pageProps} />
                  </div>
                  <Footer />
                </Layout>
                <SideMenu />
              </div>
            </div>
            <ToastProvider>
              <Modal />
            </ToastProvider>
          </>
        ) : (
          <div className='container layout'>
            <ToastProvider>
              <div className='c-initial-layout'>
                <div className='c-sign-in__wrapper'>
                  <SignIn
                    isSubmitting={isSignInSubmitting}
                    signIn={signIn}
                    signInError={signInError}
                  />
                </div>
                <div className='c-initial-layout__sign-in-info'>
                  <div className='c-initial-layout__sign-in-info--content'>
                    <h1>A travel professional's<br/> all in one tool</h1>
                    <h3>Build dynamic itineraries, create invoices, manage your clients in a stunning CRM, and much more</h3>
                  </div>
                </div>
              </div>
            </ToastProvider>
          </div>
        )}
      </AuthProvider>
    </>
  );
}

Root.getInitialProps = (async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps
  };
});

// @ts-ignore
const rootRedux = wrapper.withRedux(Root);
export default withApollo(rootRedux);
