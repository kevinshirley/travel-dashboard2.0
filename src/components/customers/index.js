import React from 'react';
import Customers from 'src/components/customers/customers.component';
import PageHeader from 'src/components/common/page-header';

function CustomersPage() {
  return (
    <>
      <PageHeader title='Customers' />
      <Customers />
    </>
  );
};

export default CustomersPage;
