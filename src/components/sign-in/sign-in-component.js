import React from 'react';
import * as R from 'ramda';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/router';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Alert from 'src/components/material-ui/alert';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

function SignIn({ signIn, signInError, isSubmitting }) {
  const { addToast } = useToasts();
  const router = useRouter();
  const isFormSubmitting = useAction(actions.forms.isSubmitting);

  return (
    <section className="c-sign-in">
      <div className="overlay">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async values => {
            isFormSubmitting({ isSubmitting: true, form: 'signIn' });
            try {
              // signIn(values);
              await firebaseClient.auth().signInWithEmailAndPassword(values.email, values.password);
              isFormSubmitting({ isSubmitting: false, form: 'signIn' });
              router.push('/');
            } catch (err) {
              isFormSubmitting({ isSubmitting: false, form: 'signIn' });
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
              isLoading={isSubmitting}
              text='Sign in'
              type='submit'
            />
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default SignIn;
