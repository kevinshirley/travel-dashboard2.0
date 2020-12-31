import React from 'react';
import PageHeader from 'src/components/common/page-header';
import NewInvoice from 'src/components/new-invoice/new-invoice.component';
import { ToastProvider } from 'react-toast-notifications';

function NewInvoiceContainer() {
  return (
    <>
      <PageHeader title='New Invoice' />
      <ToastProvider>
        <NewInvoice />
      </ToastProvider>
    </>
  );
};

export default NewInvoiceContainer;
