import React from 'react';
import InvoicesTable from 'src/components/invoices/table';

const BEM_BLOCK = 'c-invoices';

function Invoices() {
  return (
    <div className={`${BEM_BLOCK}`}>
      <InvoicesTable />
    </div>
  );
};

export default Invoices;
