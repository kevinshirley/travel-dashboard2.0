import React, { useRef, useState } from 'react';
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

import firebase from "firebase";
import firebaseClient from "firebase/app";
import initFirebase, { useDB } from 'src/lib/auth/initFirebase';
import { mapUserData } from 'src/lib/auth/mapUserData';
import axios from 'axios';

initFirebase();

function SignUpModal({ isLoading }) {
  const closeModal = useAction(actions.ui.closeModal);
  const signUp = useAction(actions.session.signUp);
  const setUserToken = useAction(actions.session.setUserToken);
  const setIsLoggedIn = useAction(actions.session.setIsLoggedIn);
  const signUpError = useSelector(selectsignUpError);
  const signUpSuccess = useSelector(selectSignUpSuccess);
  const openModal = useAction(actions.ui.openModal);
  const [user, setUser] = useState(null);
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
            firebaseClient.auth().createUserWithEmailAndPassword(values.email, values.password).then(userAuth => userAuth).then(async user => {
              const userData = await mapUserData(user.user);

              db.collection('userProfile').add({
                id: userData.id,
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              })
              addToast('Successfully signed up!', {
                appearance: 'success',
                autoDismiss: true, 
              })
            }).catch(err => console.log('firebase error', err));
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
