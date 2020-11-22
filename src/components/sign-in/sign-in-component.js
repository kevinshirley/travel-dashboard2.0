import React from 'react';
import * as R from 'ramda';
import { Formik, Field, Form } from 'formik';

import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import Alert from 'src/components/material-ui/alert';

function SignIn({ signIn, signInError }) {
  const { addToast } = useToasts();

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
