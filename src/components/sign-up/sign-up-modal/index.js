import React, { useRef, useEffect } from 'react';
import { isEmpty } from 'ramda';
import { Formik, Field, Form } from 'formik';

import * as actions from 'src/store/actions';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { useAction } from 'src/store/hooks';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';
import { selectsignUpError, selectSignUpSuccess } from 'src/store/selectors/session';
import TextField from 'src/components/common/text-field';
import { SPACING } from 'src/components/material-ui/icons';
import { MODALS } from 'src/store/constants/modals';

function SignUpModal({ isLoading }) {
  const closeModal = useAction(actions.ui.closeModal);
  const signUp = useAction(actions.session.signUp);
  const signUpError = useSelector(selectsignUpError);
  const signUpSuccess = useSelector(selectSignUpSuccess);
  const openModal = useAction(actions.ui.openModal);
  const resetSuccess = useAction(actions.forms.resetSuccess);
  const resetError = useAction(actions.forms.resetError);
  const { addToast } = useToasts();
  const closeBtnRef = useRef();

  useEffect(() => {
    if (!isEmpty(signUpSuccess) && !isEmpty(signUpSuccess.message)) {
      addToast(signUpSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      });
      closeBtnRef.current.click();
      resetSuccess({ form: 'signUp' });
    }

    if (!isEmpty(signUpError) && !isEmpty(signUpError.message)) {
      addToast(signUpError.message, {
        appearance: 'error',
        autoDismiss: false,
      });
      resetError({ form: 'signUp' })
    }
  }, [signUpSuccess, signUpError]);

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
        <div className='header-content'>
          <h2 className='title'>Create your TripImagine account</h2>
        </div>
      </div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={async values => {
          try {
            console.log({ values });
            signUp(values);
          } catch (err) {
            addToast(err.message ? err.message : 'Error when signing up', {
              appearance: 'error',
              autoDismiss: false, 
            })
            console.log({ err })
          }
        }}
      >
        <Form className='c-generic-modal-form'>
          <Field name='firstName' label='First Name' type='text' component={TextField} />
          {SPACING}
          <Field name='lastName' label='Last Name' type='text' component={TextField} />
          {SPACING}
          <Field name='username' label='Username' type='text' component={TextField} />
          {SPACING}
          <Field name='email' label='Email' type='text' component={TextField} />
          {SPACING}
          <Field name='password' label='Password' type='password' component={TextField} />
          {SPACING}
          <RoundedButton
            className='sign-in-cta'
            isLoading={isLoading}
            text='Join now'
            type='submit'
          />
          <div className='rotate-form'>
            <span className='text'>Already have an account? <span className='cta' onClick={() => openModal({ modal: MODALS.SIGN_IN })}>Sign in</span></span>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default SignUpModal;
