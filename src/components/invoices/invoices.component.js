import React, { useEffect } from 'react';
import { isEmpty } from 'ramda';
import InvoicesTable from 'src/components/invoices/table';
import { useToasts } from 'react-toast-notifications';

const BEM_BLOCK = 'c-invoices';

function Invoices({ addInvoiceSuccess, invoices, resetSuccess }) {
  const { addToast } = useToasts();

  useEffect(() => {
    if (!isEmpty(addInvoiceSuccess)) {
      addToast(addInvoiceSuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      }, () => resetSuccess({ form: 'addInvoice' }));
    }
  }, [addInvoiceSuccess]);

  return (
    <div className={`${BEM_BLOCK}`}>
      {!isEmpty(invoices) ? (
        <InvoicesTable invoices={invoices} />
      ) : (
        <>
          <br />
          No invoices available. Click on +New to add an invoice to this list.
        </>
      )}
    </div>
  );
};

export default Invoices;
