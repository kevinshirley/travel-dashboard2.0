import React, { useEffect, useState } from 'react';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import CustomersTabs from 'src/components/customers/customers-tabs.component';
import { useIsoEffect } from 'src/store/hooks';
import { dynamoGet } from 'src/utils/fetch';

import { API } from 'aws-amplify';

function Customers({
  addCustomerSuccess,
  addCustomerError,
  resetSuccess,
  resetError,
  userCustomers,
  addCustomerNoteSuccess,
  addCustomerNoteError,
}) {
  const { addToast } = useToasts();
  const [customers, setCustomers] = useState([]);

  useIsoEffect(() => {
    if (isEmpty(customers)) {
      dynamoGet('customersapi', '/customers/id')
        .then(res => setCustomers(res));
    }
    return () => setCustomers([]);
  }, []);

  useEffect(() => {
    if (!isEmpty(addCustomerSuccess)) {
      addToast(addCustomerSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetSuccess({ form: 'addCustomer' }));
    }

    if (!isEmpty(addCustomerError)) {
      addToast(addCustomerError.message, {
        appearance: 'error',
        autoDismiss: false,
      }, () => resetError({ form: 'addCustomer' }));
    }

    if (!isEmpty(addCustomerNoteSuccess)) {
      addToast(addCustomerNoteSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetSuccess({ form: 'addCustomerNote' }));
    }

    if (!isEmpty(addCustomerNoteError)) {
      addToast(addCustomerNoteError.message, {
        appearance: 'error',
        autoDismiss: false,
      }, () => resetError({ form: 'addCustomerNote' }));
    }
  }, [
    addCustomerSuccess,
    addCustomerError,
    addCustomerNoteSuccess,
    addCustomerNoteError,
  ]);

  return (
    <section className='c-customers'>
      <div className='overlay'>
        <CustomersTabs userCustomers={customers} />
      </div>
    </section>
  );
}

Customers.prototypes = {
  addCustomerError: PropTypes.object,
  addCustomerSuccess: PropTypes.object,
  resetError: PropTypes.func,
  resetSuccess: PropTypes.func,
  userCustomers: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      profileImage: PropTypes.object,
      trips: PropTypes.array,
      isOnline: PropTypes.bool,
    }),
  ),
  addCustomerNoteSuccess: PropTypes.object,
  addCustomerNoteError: PropTypes.object,
};

export default Customers;
