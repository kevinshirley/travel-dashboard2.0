import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { isNil, isEmpty } from 'ramda';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { selectCustomer } from 'src/store/selectors/customers';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';
import Button from 'src/components/material-ui/text-button';
import CustomersSideMenuTabs from 'src/components/customers/side-menu/customer-profile-side-menu-tabs.component';
import { PERSON_OUTLINE_ICON, KEYBOARD_ARROW_RIGHT_ICON, SPACING } from 'src/components/material-ui/icons';

const BEM_BLOCK = 'c-customer-side-menu';

function CustomerProfileSideMenu() {
  const customer = useSelector(selectCustomer);
  const closeCustomerSideMenu = useAction(actions.customer.closeCustomerSideMenu);

  const badgeClasses = cx(`${BEM_BLOCK}__single-avatar`, {
    'badge__is-online': customer.isOnline === 'true',
    'badge__not-online': customer.isOnline === 'false',
  });

  return (
    <div className={`${BEM_BLOCK} side-menu`}>
      {customer && (
        <div className={`${BEM_BLOCK}__profile-wrapper`}>
          <div className={`${BEM_BLOCK}__close-profile`}>
            <Button onClick={() => closeCustomerSideMenu()}>Close</Button>
          </div>
          <div className={`${BEM_BLOCK}__profile-avatar`}>
            <Badge
              badgeContent=" "
              className={badgeClasses}
              color="secondary"
              overlap="circle"
              variant="dot"
            >
              {(isNil(customer.profileImage) || isEmpty(customer.profileImage)) ? (
                <Avatar>
                  {PERSON_OUTLINE_ICON}
                </Avatar>
              ) : (
                <Avatar>
                  {PERSON_OUTLINE_ICON}
                </Avatar>
              )}
            </Badge>
          </div>
          <div className={`${BEM_BLOCK}__details`}>
            <span className='name'>{`${customer.firstName} ${customer.lastName}`}</span>
            <span className='email'>{customer.email}</span>
            <span className='phoneNumber'>{customer.phoneNumber}</span>
          </div>
          <CustomersSideMenuTabs />
          <div className={`${BEM_BLOCK}__full-profile-btn-wrapper`}>
            <Button className={`${BEM_BLOCK}__full-profile-btn`} onClick={() => console.log('see full profile')}>See more{SPACING}{KEYBOARD_ARROW_RIGHT_ICON}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfileSideMenu;
