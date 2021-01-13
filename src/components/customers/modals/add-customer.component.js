import React, { useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import TextField from 'src/components/common/text-field';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { SPACING } from 'src/components/material-ui/icons';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { selectAddCustomerIsSubmitting } from 'src/store/selectors/forms';

import { API } from 'aws-amplify';
import uuidv4 from 'src/utils/uuidv4';

function AddCustomerModal() {
  const closeModal = useAction(actions.ui.closeModal);
  const addCustomer = useAction(actions.customer.add);
  const isSubmitting = useSelector(selectAddCustomerIsSubmitting);
  const closeBtnRef = useRef();

  React.useEffect(() => {
    console.log('pulling customersapi');
    API.get('customersapi', '/customers/id').then(customers => console.log({ customers }));
  });

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
        <div className='header-content'>
          <h2 className='title'>Add a new customer</h2>
        </div>
      </div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        }}
        onSubmit={async values => {
          try {
            // addCustomer(values);
            console.log({ values });
            API.post('customersapi', '/customers', {
              body: {
                id: uuidv4(),
                createdAt: new Date(),
                createdBy: 'kevin-testing',
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                isOnline: false,
                phoneNumber: values.phoneNumber,
                notes: []
              }
            });
          } catch (err) {
            addToast(`Error: ${err}`, {
              appearance: 'error',
              autoDismiss: true, 
            });
          }
        }}
      >
        <Form className='c-generic-modal-form'>
          <Field name='firstName' label='First Name' type='text' component={TextField} />
          {SPACING}
          <Field name='lastName' label='Last Name' type='text' component={TextField} />
          {SPACING}
          <Field name='email' label='Email' type='text' component={TextField} />
          {SPACING}
          <Field name='phoneNumber' label='Phone Number' type='text' component={TextField} />
          {SPACING}
          <RoundedButton
            className='sign-in-cta'
            isLoading={isSubmitting}
            text='Add'
            type='submit'
          />
        </Form>
      </Formik>
    </>
  );
}

export default AddCustomerModal;
