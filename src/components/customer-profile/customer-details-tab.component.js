import React from 'react';
import CustomerInfo from 'src/components/customer-profile/customer-info.component';

const BEM_BLOCK = 'c-customer-details-tab';

function CustomerDetailsTab({ customer }) {
  return (
    <div className={`${BEM_BLOCK}`}>
      <CustomerInfo customer={customer} />
    </div>
  );
}

export default CustomerDetailsTab;
