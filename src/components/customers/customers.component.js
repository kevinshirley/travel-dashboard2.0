import React from 'react';
import CustomersTabs from 'src/components/customers/customers-tabs.component';

function Customers() {
  return (
    <section className='c-customers'>
      <div className='overlay'>
        <CustomersTabs />
      </div>
    </section>
  );
}

export default Customers;
