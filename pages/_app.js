import 'isomorphic-fetch';
import React from 'react';

// import Amplify from 'aws-amplify';
// import config from '../src/aws-exports';

// Amplify.configure({ ...config, ssr: true });
// Amplify.configure(config);

import { wrapper } from 'src/store';
import { withApollo } from 'src/lib/withApollo';
import Layout from 'src/components/common/layout';
import Navbar from 'src/components/common/navbar';
import MainMenu from 'src/components/common/main-menu';
import SideMenu from 'src/components/common/side-menu';
import Footer from 'src/components/footer';
import Modal from 'src/components/common/modal';
import { ToastProvider } from 'react-toast-notifications';

function Root({ Component, pageProps }) {
  return (
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
