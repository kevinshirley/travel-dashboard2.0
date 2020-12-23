import React from 'react';
import CustomerNotes from 'src/components/customer-profile/customer-notes.component';

const BEM_BLOCK = 'c-customer-notes-tab';

function CustomerDetailsTab({ descendantCustomerNotes }) {
  return (
    <div className={`${BEM_BLOCK}`}>
      <CustomerNotes descendantCustomerNotes={descendantCustomerNotes} />
    </div>
  );
}

export default CustomerDetailsTab;
