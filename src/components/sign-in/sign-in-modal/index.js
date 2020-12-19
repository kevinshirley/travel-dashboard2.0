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
import TextField from 'src/components/common/text-field';
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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async values => {
          try {
            signIn(values);
          } catch (err) {
            addToast('Error', {
              appearance: 'error',
              autoDismiss: true, 
            });
            console.error({ err });
          }
        }}
      >
        <Form className='c-generic-modal-form'>
          {!R.isEmpty(signInError) && !R.isEmpty(signInError.message) && (
            <>
              <Alert type='warning'>{signInError.message}</Alert>
              {SPACING}
            </>
          )}
          <Field name='email' label='Email' type='text' component={TextField} />
          {SPACING}
          <Field name='password' label='Password' type='password' component={TextField} />
          {SPACING}
          <RoundedButton
            className='sign-in-cta'
            isLoading={isLoading}
            text='Sign in'
            type='submit'
          />
          <div className='rotate-form'>
            <span className='text'>New to TripImagine? <span className='cta' onClick={() => openModal({ modal: MODALS.SIGN_UP })}>Create an account</span></span>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default SignInModal;
