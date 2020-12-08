import React from 'react';
import cx from 'classnames';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';

function CustomersAllTabContent({ customers = [] }) {
  return (
    <section className='c-customers-all-tab-content__container'>
      {customers.map((customer, i) => {
        const badgeClasses = cx({
          'badge__is-online': customer.isOnline,
          'badge__not-online': !customer.isOnline,
        });

        return (
          <div className='c-customers-all-tab-content__single' index={i}>
            <Badge className={badgeClasses} color="secondary" overlap="circle" badgeContent=" " variant="dot">
              <Avatar>
                {customer.profileImage}
              </Avatar>
            </Badge>
            {customer.firstName}
            {customer.lastName}
            {customer.email}
            {customer.phoneNumber}
          </div>
        );
      })}
    </section>
  );
}

export default CustomersAllTabContent;
