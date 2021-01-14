import React, { useRef } from 'react';
import * as R from 'ramda';
import { Formik, Field, Form } from 'formik';

import * as actions from 'src/store/actions';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { useAction } from 'src/store/hooks';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';
import { selectsignInError } from 'src/store/selectors/session';
import AmplifySignInContainer from 'src/components/sign-in/amplify-sign-in.component';
import { SPACING } from 'src/components/material-ui/icons';
import Alert from 'src/components/material-ui/alert';
import { MODALS } from 'src/store/constants/modals';

function SignInModal({ isLoading }) {
  const closeModal = useAction(actions.ui.closeModal);
  const openModal = useAction(actions.ui.openModal);
  const signIn = useAction(actions.session.signIn);
  const signInError = useSelector(selectsignInError);
  const { addToast } = useToasts();
  const closeBtnRef = useRef();

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
        <div className='header-content'>
          <h2 className='title'>Sign into your TripImagine account</h2>
        </div>
      </div>
      <AmplifySignInContainer />
    </>
  );
}

export default SignInModal;
