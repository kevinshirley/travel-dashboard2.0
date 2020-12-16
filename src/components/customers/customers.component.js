import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import CustomersTabs from 'src/components/customers/customers-tabs.component';
import { useToasts } from 'react-toast-notifications';

function Customers({ addCustomerSuccess, resetSuccess }) {
  const { addToast } = useToasts();

  useEffect(() => {
    if (!isEmpty(addCustomerSuccess)) {
      addToast(addCustomerSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetSuccess({ form: 'addCustomer' }));
    }
  }, [addCustomerSuccess]);

  return (
    <section className='c-customers'>
      <div className='overlay'>
        <CustomersTabs />
      </div>
    </section>
  );
}

Customers.prototypes = {
  addCustomerSuccess: PropTypes.object,
};

export default Customers;
