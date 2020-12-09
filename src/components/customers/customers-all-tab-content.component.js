import React from 'react';
import * as R from 'ramda';
import cx from 'classnames';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';
import { MORE_VERT_ICON } from 'src/components/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

function CustomersAllTabContent({ customers = [] }) {
  const onCustomerClicked = (firstName) => {
    console.log(`clicked on ${firstName} profile`);
  };
  return (
    <section className='c-customers-all-tab-content__container'>
      <div className='inner'>
        {customers.map((customer, i) => {
          const badgeClasses = cx('c-customers-all-tab-content__single-avatar', {
            'badge__is-online': customer.isOnline,
            'badge__not-online': !customer.isOnline,
          });

          return (
            <div className='c-customers-all-tab-content__single-wrapper'>
              <div className='c-customers-all-tab-content__single' index={i} onClick={() => onCustomerClicked(customer.firstName)}>
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
                <div className='c-customers-all-tab-content__single-details'>
                  <span className='name'>{`${customer.firstName} ${customer.lastName}`}</span>
                  <span className='email'>{customer.email}</span>
                  <span className='phoneNumber'>{customer.phoneNumber}</span>
                </div>
              </div>
              <div className='c-customers-all-tab-content__single-buttons'>
                <div className='c-customers-all-tab-content__single-button'>
                  <span>{R.toUpper('Trips')}</span>
                </div>
                <div className='c-customers-all-tab-content__single-button'>
                  <span>{R.toUpper('Notes')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CustomersAllTabContent;
