import React from 'react';
import * as R from 'ramda';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Alert from 'src/components/material-ui/alert';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

function SignIn({ signIn, signInError }) {
  const { addToast } = useToasts();
  const router = useRouter();

  return (
    <section className="c-sign-in">
      <div className="overlay">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async values => {
            try {
              // signIn(values);
              await firebaseClient.auth().signInWithEmailAndPassword(values.email, values.password);
              router.push('/');
            } catch (err) {
              addToast('Error', {
                appearance: 'error',
                autoDismiss: true, 
              });
              console.error({ err });
            }
          }}
        >
          <Form className='c-sign-in-form'>
            {!R.isEmpty(signInError) && (
              <Alert type='warning'>{signInError.message}</Alert>
            )}
            <Field name='email' label='Email' type='text' component={TextField} />
            {SPACING}
            <Field name='password' label='Password' type='password' component={TextField} />
            {SPACING}
            <RoundedButton 
              className='add-trip-cta'
              text='Join now'
              type='submit'
            />
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default SignIn;
