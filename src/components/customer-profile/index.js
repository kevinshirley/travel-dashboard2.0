import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PageHeader from 'src/components/common/page-header';
import CustomerProfile from 'src/components/customer-profile/customer-profile.component';

function CustomerProfileContainer({
  customer,
  descendantCustomerNotes,
  setCustomerOnInit,
  userCustomers
}) {
  const router = useRouter();
  const customerName = customer.firstName ? `${customer.firstName} ${customer.lastName}` : 'Customer';

  useEffect(() => {
    setCustomerOnInit(router);
  }, [userCustomers]);

  return (
    <>
      <PageHeader title={customerName} />
      <CustomerProfile
        customer={customer}
        descendantCustomerNotes={descendantCustomerNotes}
      />
    </>
  );
}

export default CustomerProfileContainer;
