import React from 'react';
import CustomerProfileTabs from 'src/components/customer-profile/customer-profile-tabs.component';

const BEM_BLOCK = 'c-customer-profile';

function CustomerProfile({ customer, descendantCustomerNotes }) {
  return (
    <div className={`${BEM_BLOCK}`}>
      <CustomerProfileTabs customer={customer} descendantCustomerNotes={descendantCustomerNotes} />
    </div>
  );
}

export default CustomerProfile;
