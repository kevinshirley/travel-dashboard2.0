import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';

import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Spinner from 'src/components/common/spinner';

function DisplayItineraryContainer({ uid }) {
  const setInvoiceToDisplay = useAction(actions.invoices.setInvoiceToDisplay);
  const router = useRouter();

  useEffect(() => {
    console.log({ uid });
    setInvoiceToDisplay({ router, uid });
    console.log('set invoice');
    console.log({ router });
  }, []);

  return (
    <div className='c-display-invoice'>
      Invoice profile 111
      <br/>
      <br/>
      {router.query.id}
    </div>
  );
};

export default DisplayItineraryContainer;
