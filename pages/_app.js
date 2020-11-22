import 'isomorphic-fetch';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
// import { ApolloProvider } from 'react-apollo';

// import configureStore from 'src/store';
import { wrapper } from 'src/store';
import { withApollo } from 'src/lib/withApollo';
import Layout from 'src/components/common/layout';
import Navbar from 'src/components/common/navbar';
import MainMenu from 'src/components/common/main-menu';
import SideMenu from 'src/components/common/side-menu';
import Footer from 'src/components/footer';
import Modal from 'src/components/common/modal';
import { ToastProvider } from 'react-toast-notifications';

function Root({ Component, pageProps, store }) {
  return (
    // <Provider store={store}>
    //   <div className='container layout'>
    //     <Navbar />
    //     <div className='main'>
    //       <MainMenu />
    //       <Layout>
    //         <div className='content'>
    //           <Component {...pageProps} />
    //         </div>
    //         <Footer />
    //       </Layout>
    //       <SideMenu />
    //     </div>
    //   </div>
    //   <ToastProvider>
    //     <Modal />
    //   </ToastProvider>
    // </Provider>
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
// const AuthRoot = withAuthenticator(Root, true);
// export default withRedux(configureStore)(withReduxSaga(AuthRoot));
// const rootRedux = withRedux(configureStore)(withReduxSaga(Root));
const rootRedux = wrapper.withRedux(Root);
export default withApollo(rootRedux);
