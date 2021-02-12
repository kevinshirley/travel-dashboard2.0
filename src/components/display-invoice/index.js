import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'ramda';
import { ToastProvider } from 'react-toast-notifications';

import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Spinner from 'src/components/common/spinner';
import NewInvoice from 'src/components/new-invoice/new-invoice.component';
import Link from 'src/components/common/link';
import { CHEVRON_LEFT_ICON } from 'src/components/material-ui/icons';

function DisplayInvoiceContainer({ uid, invoice }) {
  const setInvoiceToDisplay = useAction(actions.invoices.setInvoiceToDisplay);
  const router = useRouter();
  console.log({ invoice });
  useEffect(() => {
    setInvoiceToDisplay({ router, uid });
  }, []);

  return (
    <div className='c-display-invoice'>
      {!isEmpty(invoice) ? (
        <ToastProvider>
          <Link href='/invoices'>{CHEVRON_LEFT_ICON} Back</Link>
          <h1>{`Invoice ${invoice.invoiceNumber}`}</h1>
          <NewInvoice displayMode invoice={invoice} />
        </ToastProvider>
      ) : <Spinner />}
    </div>
  );
};

export default DisplayInvoiceContainer;
