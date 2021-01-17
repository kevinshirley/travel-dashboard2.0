import React, { useRef } from 'react';
import * as R from 'ramda';
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
import Alert from 'src/components/material-ui/alert';
import { MODALS } from 'src/store/constants/modals';

import firebaseClient from "firebase/app";
import initFirebase, { useDB } from 'src/lib/auth/initFirebase';
import { setUserCookie } from 'src/lib/auth/userCookies';
import { mapUserData } from 'src/lib/auth/mapUserData';

initFirebase();

function SignUpModal({ isLoading }) {
  const closeModal = useAction(actions.ui.closeModal);
  const signUp = useAction(actions.session.signUp);
  const signUpError = useSelector(selectsignUpError);
  const signUpSuccess = useSelector(selectSignUpSuccess);
  const openModal = useAction(actions.ui.openModal);
  const { addToast } = useToasts();
  const closeBtnRef = useRef();
  const { db } = useDB();

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
            // signUp(values);
            console.log({ values });
            // db.collection('userProfile').add({
            //   firstName: values.firstName,
            //   lastName: values.lastName,
            //   username: values.username,
            //   email: values.email,
            // });
            // const res = firebaseClient.auth().createUserWithEmailAndPassword(values.email, values.password);
            // console.log({ 'user created res': res });
            firebaseClient.auth().createUserWithEmailAndPassword(values.email, values.password).then(userAuth => userAuth).then(async user => {
              const userData = await mapUserData(user.user);
              console.log({ 'user created user': user });
              console.log({ 'user created userData': userData });
              // setUserCookie(userData);

              db.collection('userProfile').add({
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
              });
              console.log('account and profile created!');
            }).catch(err => console.log('firebase error', err));
          } catch (err) {
            addToast('Error', {
              appearance: err.message ? err.message : 'Error when signing up',
              autoDismiss: true, 
            });
            console.log({ err });
          }
        }}
      >
        <Form className='c-generic-modal-form'>
          {!R.isEmpty(signUpError) && !R.isEmpty(signUpError.message) && (
            <>
              <Alert type='warning'>{signUpError.message}</Alert>
              {SPACING}
            </>
          )}
          {!R.isEmpty(signUpSuccess) && !R.isEmpty(signUpSuccess.message) && (
            <>
              <Alert type='success'>{signUpSuccess.message}</Alert>
              {SPACING}
            </>
          )}
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
