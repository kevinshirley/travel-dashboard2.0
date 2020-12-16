import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import CustomersTabs from 'src/components/customers/customers-tabs.component';
import { useToasts } from 'react-toast-notifications';

function Customers({
  addCustomerSuccess,
  addCustomerError,
  resetSuccess,
  resetError
}) {
  const { addToast } = useToasts();

  useEffect(() => {
    if (!isEmpty(addCustomerSuccess)) {
      addToast(addCustomerSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetSuccess({ form: 'addCustomer' }));
    }

    if (!isEmpty(addCustomerError)) {
      addToast(addCustomerError.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetError({ form: 'addCustomer' }));
    }
  }, [addCustomerSuccess, addCustomerError]);

  return (
    <section className='c-customers'>
      <div className='overlay'>
        <CustomersTabs />
      </div>
    </section>
  );
}

Customers.prototypes = {
  addCustomerError: PropTypes.object,
  addCustomerSuccess: PropTypes.object,
  resetError: PropTypes.func,
  resetSuccess: PropTypes.func,
};

export default Customers;
