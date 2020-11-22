import React from 'react';
import * as R from 'ramda';
import { Formik, Field, Form } from 'formik';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Alert from 'src/components/material-ui/alert';
import Link from 'src/components/common/link';

function SignUp({ signUp, signUpError, signUpSuccess }) {
  const { addToast } = useToasts();

  return (
    <section className='c-sign-up'>
      <div className='overlay'>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async values => {
            try {
              signUp(values);
            } catch (err) {
              addToast('HTTP error', {
                appearance: 'error',
                autoDismiss: true, 
              });
            }
          }}
        >
          <Form className='c-sign-up-form'>
            {!R.isEmpty(signUpError) && (
              <Alert type='warning'>{signUpError.message}</Alert>
            )}
            {!R.isEmpty(signUpSuccess) && (
              <Alert type='success'>
                {signUpSuccess.message}
                <Link href='/sign-in'>here.</Link>
              </Alert>
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

export default SignUp;
