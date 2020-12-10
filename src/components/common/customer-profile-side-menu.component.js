import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { selectCustomer } from 'src/store/selectors/customers';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';
import Button from 'src/components/material-ui/text-button';

const BEM_BLOCK = 'c-customer-side-menu';

function CustomerProfileSideMenu() {
  const customer = useSelector(selectCustomer);

  const badgeClasses = cx(`${BEM_BLOCK}__single-avatar`, {
    'badge__is-online': customer.isOnline,
    'badge__not-online': !customer.isOnline,
  });

  return (
    <div className={`${BEM_BLOCK} side-menu`}>
      {customer && (
        <div>
          <div className={`${BEM_BLOCK}__close-profile`}>
            <Button>Close</Button>
          </div>
          <div className={`${BEM_BLOCK}__profile-avatar`}>
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
          <div className={`${BEM_BLOCK}__details`}>
            <span className='name'>{`${customer.firstName} ${customer.lastName}`}</span>
            <span className='email'>{customer.email}</span>
            <span className='phoneNumber'>{customer.phoneNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfileSideMenu;
