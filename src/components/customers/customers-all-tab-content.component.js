import React from 'react';
import cx from 'classnames';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';
import { MORE_VERT_ICON } from 'src/components/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

function CustomersAllTabContent({ customers = [] }) {
  return (
    <section className='c-customers-all-tab-content__container'>
      {customers.map((customer, i) => {
        const badgeClasses = cx('c-customers-all-tab-content__single-avatar', {
          'badge__is-online': customer.isOnline,
          'badge__not-online': !customer.isOnline,
        });

        return (
          <div className='c-customers-all-tab-content__single' index={i}>
            <div className='c-customers-all-tab-content__single-more'>
              <IconButton aria-label="messages" color="inherit">{MORE_VERT_ICON}</IconButton>
            </div>
            <div className='c-customers-all-tab-content__single-avatar-wrapper'>
              <Badge
                badgeContent=" "
                className={badgeClasses}
                color="secondary"
                overlap="circle"
                variant="dot"
              >
                <Avatar>
                  {customer.profileImage}
                </Avatar>
              </Badge>
            </div>
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
