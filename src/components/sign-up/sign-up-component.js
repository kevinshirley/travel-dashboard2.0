import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isEmpty, omit } from 'ramda';
import { Formik, Field, Form } from 'formik';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Alert from 'src/components/material-ui/alert';
import Link from 'src/components/common/link';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();
import { mapUserData } from 'src/lib/auth/mapUserData';

function SignUp({ isSignUpSubmitting, signUp, signUpError, signUpSuccess }) {
  const { addToast } = useToasts();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const db = firebaseClient.firestore();
  const isFormSubmitting = useAction(actions.forms.isSubmitting);

  useEffect(() => {
    if (user && user.id) {
      db.collection('userProfile').add({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        createdAt: firebaseClient.firestore.FieldValue.serverTimestamp(),
      });
      isFormSubmitting({ isSubmitting: false, form: 'signUp' });
      router.push('/account');
    }
  }, [user]);

  return (
    <section className='c-sign-up'>
      <div className='overlay'>
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            username: '',
          }}
          onSubmit={async values => {
            isFormSubmitting({ isSubmitting: true, form: 'signUp' });
            try {
              // signUp(values);
              await firebaseClient
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password);

              firebaseClient
                .auth()
                .onIdTokenChanged(async (user) => {
                  if (user) {
                    const userData = await mapUserData(user);
                    setUser({ ...omit(['token'], userData), ...omit(['password'], values) });
                  } else {
                    addToast('Error while signing up', {
                      appearance: 'error',
                      autoDismiss: true, 
                    });
                  }
                })
            } catch (err) {
              isFormSubmitting({ isSubmitting: false, form: 'signUp' });
              addToast('HTTP error', {
                appearance: 'error',
                autoDismiss: true, 
              });
            }
          }}
        >
          <Form className='c-sign-up-form'>
            {!isEmpty(signUpError) && (
              <Alert type='warning'>{signUpError.message}</Alert>
            )}
            {!isEmpty(signUpSuccess) && (
              <Alert type='success'>
                {signUpSuccess.message}
                <Link href='/sign-in'>here.</Link>
              </Alert>
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
              className='add-trip-cta'
              isLoading={isSignUpSubmitting}
              text='Join now'
              type='submit'
            />
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default SignUp;
