import React from 'react';
import PropTypes from 'prop-types';
import Customers from 'src/components/customers/customers.component';
import PageHeader from 'src/components/common/page-header';
import { ToastProvider } from 'react-toast-notifications';

function CustomersPage({ addCustomerSuccess, resetSuccess }) {
  return (
    <>
      <PageHeader title='Customers' />
      <ToastProvider>
        <Customers addCustomerSuccess={addCustomerSuccess} resetSuccess={resetSuccess} />
      </ToastProvider>
    </>
  );
}

CustomersPage.prototypes = {
  addCustomerSuccess: PropTypes.object,
};

export default CustomersPage;
