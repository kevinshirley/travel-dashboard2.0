import React from 'react';
import { isNil, isEmpty, toUpper } from 'ramda';
import cx from 'classnames';
import Avatar from 'src/components/material-ui/avatar';
import Badge from '@material-ui/core/Badge';
import { MORE_VERT_ICON } from 'src/components/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { PERSON_OUTLINE_ICON, ARROW_RIGHT_ALT_ICON } from 'src/components/material-ui/icons';
import Link from 'src/components/common/link';

const BEM_BLOCK = 'c-customers-all-tab-content';

function CustomersAllTabContent({ customers = [] }) {
  const setCustomer = useAction(actions.customer.set);

  const onCustomerClicked = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImage,
    trips,
    isOnline,
    id,
    createdAt,
    createdBy,
    notes,
  }) =>
    setCustomer({
      firstName,
      lastName,
      email,
      phoneNumber,
      profileImage,
      trips,
      isOnline,
      id,
      createdAt,
      createdBy,
      notes,
    });

  return (
    <section className={`${BEM_BLOCK}__container`}>
      <div className='inner'>
        {!isEmpty(customers) ? (
          <>
            {customers.map((customer, i) => {
              const badgeClasses = cx(`${BEM_BLOCK}__single-avatar`, {
                'badge__is-online': customer.isOnline === 'true',
                'badge__not-online': customer.isOnline === 'false',
              });

              return (
                <div className={`${BEM_BLOCK}__single-wrapper`} key={i}>
                  <div className={`${BEM_BLOCK}__single`} index={i} onClick={() => onCustomerClicked({
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email,
                    phoneNumber: customer.phoneNumber,
                    profileImage: customer.profileImage,
                    trips: customer.trips,
                    isOnline: customer.isOnline,
                    id: customer.id,
                    createdAt: customer.createdAt,
                    createdBy: customer.createdBy,
                    notes: customer.notes,
                  })}>
                    <div className={`${BEM_BLOCK}__single-more`}>
                      <IconButton aria-label="messages" color="inherit">{MORE_VERT_ICON}</IconButton>
                    </div>
                    <div className={`${BEM_BLOCK}__single-avatar-wrapper`}>
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
                    <div className={`${BEM_BLOCK}__single-details`}>
                      <span className='name'>{`${customer.firstName} ${customer.lastName}`}</span>
                      <span className='email'>{customer.email}</span>
                      <span className='phoneNumber'>{customer.phoneNumber}</span>
                    </div>
                  </div>
                  <div className={`${BEM_BLOCK}__single-buttons`}>
                    <Link
                      className={`${BEM_BLOCK}__single-button`}
                      href={`/customers/${customer.id}`}
                    >
                      {ARROW_RIGHT_ALT_ICON}
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            No customers available
          </>
        )}
      </div>
    </section>
  );
}

export default CustomersAllTabContent;
