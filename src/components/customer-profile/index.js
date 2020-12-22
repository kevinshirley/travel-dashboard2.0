import React from 'react';
import PageHeader from 'src/components/common/page-header';
import CustomerProfile from 'src/components/customer-profile/customer-profile.component';

function CustomerProfileContainer({ customer, descendantCustomerNotes }) {
  return (
    <>
      <PageHeader title={`${customer.firstName} ${customer.lastName}`} />
      <CustomerProfile customer={customer} descendantCustomerNotes={descendantCustomerNotes} />
    </>
  );
}

export default CustomerProfileContainer;
