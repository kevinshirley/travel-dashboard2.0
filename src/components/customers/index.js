import React from 'react';
import PropTypes from 'prop-types';
import Customers from 'src/components/customers/customers.component';
import PageHeader from 'src/components/common/page-header';
import { ToastProvider } from 'react-toast-notifications';

function CustomersPage({
  addCustomerSuccess,
  addCustomerError,
  resetSuccess,
  resetError
}) {
  return (
    <>
      <PageHeader title='Customers' />
      <ToastProvider>
        <Customers
          addCustomerSuccess={addCustomerSuccess}
          addCustomerError={addCustomerError}
          resetError={resetError}
          resetSuccess={resetSuccess}
        />
      </ToastProvider>
    </>
  );
}

CustomersPage.prototypes = {
  addCustomerError: PropTypes.object,
  addCustomerSuccess: PropTypes.object,
  resetError: PropTypes.func,
  resetSuccess: PropTypes.func,
};

export default CustomersPage;
