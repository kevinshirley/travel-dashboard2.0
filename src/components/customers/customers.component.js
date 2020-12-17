import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import PropTypes from 'prop-types';
import CustomersTabs from 'src/components/customers/customers-tabs.component';
import { useToasts } from 'react-toast-notifications';

function Customers({
  addCustomerSuccess,
  addCustomerError,
  resetSuccess,
  resetError,
  userCustomers
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
        appearance: 'error',
        autoDismiss: false,
      }, () => resetError({ form: 'addCustomer' }));
    }
  }, [addCustomerSuccess, addCustomerError]);

  return (
    <section className='c-customers'>
      <div className='overlay'>
        <CustomersTabs userCustomers={userCustomers} />
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
};

export default Customers;
