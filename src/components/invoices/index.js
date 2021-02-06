import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from 'src/components/common/page-header';
import Invoices from 'src/components/invoices/invoices.component';
import { ToastProvider } from 'react-toast-notifications';

function InvoicesContainer({ addInvoiceSuccess, resetSuccess }) {
  return (
    <>
      <PageHeader title='Invoices' />
      <ToastProvider>
        <Invoices
          addInvoiceSuccess={addInvoiceSuccess}
          resetSuccess={resetSuccess}
        />
      </ToastProvider>
    </>
  );
};

export default InvoicesContainer;
