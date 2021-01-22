import { connect } from 'react-redux';
import nookies from 'nookies';
import CustomersPage from 'src/components/customers';
import storeConnector from 'src/store/selectors/customers';
import * as actions from 'src/store/actions';

import { firebaseAdmin } from '../../firebaseAdmin';

const actionCreators = {
  resetSuccess: actions.forms.resetSuccess,
  resetError: actions.forms.resetError,
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    console.log({ token });

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Welcome! Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log({ err });
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

export default connect(
  storeConnector,
  actionCreators,
)(CustomersPage);
