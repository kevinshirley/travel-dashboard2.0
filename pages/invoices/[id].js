// import React from 'react';
import { connect } from 'react-redux';
import nookies from 'nookies';
import { firebaseAdmin } from '../../src/lib/auth/firebaseAdmin';
import { selectInvoicesConnector } from 'src/store/selectors/accounting';
import * as actions from 'src/store/actions';
import DisplayInvoicePage from 'src/components/display-invoice';

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    console.log({ token });

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { email, uid },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

const actionCreators = {
  resetSuccess: actions.forms.resetSuccess,
  resetError: actions.forms.resetError,
};

export default connect(
  selectInvoicesConnector,
  actionCreators,
)(DisplayInvoicePage);
