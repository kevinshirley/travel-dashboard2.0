import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { omit, isNil, equals } from 'ramda';
import { Formik, Field, Form } from 'formik';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';
import { LOGO } from 'src/components/common/images';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

function SignUp({ isSignUpSubmitting, signUp }) {
  const { addToast } = useToasts();
  const router = useRouter();
  const [profileValues, setProfileValues] = useState(null);
  const isFormSubmitting = useAction(actions.forms.isSubmitting);

  useEffect(() => {
    if (!isNil(profileValues)) {
      signUp(profileValues);
      router.push('/account');
    }
    return () => setProfileValues(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileValues]);

  return (
    <section className='c-sign-up'>
      <img className='c-sign-up__logo' src={LOGO} alt='Trip Imagine Logo' />
      <h2 className='c-sign-up__title'>Create an account</h2>
      <div className='overlay'>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async values => {
            isFormSubmitting({ isSubmitting: true, form: 'signUp' });
            try {
              if (equals(values.password, values.confirmPassword)) {
                await firebaseClient
                  .auth()
                  .createUserWithEmailAndPassword(values.email, values.password);
                setProfileValues({ ...omit(['password', 'confirmPassword'], values) });
              } else {
                isFormSubmitting({ isSubmitting: false, form: 'signUp' });
                addToast('Please confirm your password.', {
                  appearance: 'error',
                  autoDismiss: true, 
                });
              }
            } catch (err) {
              isFormSubmitting({ isSubmitting: false, form: 'signUp' });
              addToast(err.message ? err.message : 'Error while signing up', {
                appearance: 'error',
                autoDismiss: true, 
              });
              console.log({ err });
            }
          }}
        >
          <Form className='c-sign-up-form'>
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
            <Field name='confirmPassword' label='Confirm password' type='password' component={TextField} />
            {SPACING}
            <RoundedButton
              className='c-sign-up-form__cta'
              isLoading={isSignUpSubmitting}
              text='Start free trial'
              type='submit'
            />
            {SPACING}
            <div className='c-sign-up-form__sign-up-cta' onClick={() => router.push('/')}>
              <div className='c-sign-up-form__already-signed-in'>Already have an account?</div>
              <RoundedButton text='Login' />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default SignUp;
