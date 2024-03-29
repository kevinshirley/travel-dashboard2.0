import React from 'react';
import * as R from 'ramda';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import SideMenuTabs from 'src/components/common/side-menu-tabs';
import CustomerProfileSideMenu from 'src/components/customers/side-menu/customer-profile-side-menu.component';
import { ITINERARY, CUSTOMERS } from 'src/store/constants/url';
import { selectCustomer } from 'src/store/selectors/customers';
import { selectIsCustomerSideMenu, selectIsSideMenuMinimized } from 'src/store/selectors/common';

function SideMenu() {
  const router = useRouter();
  const customer = useSelector(selectCustomer);
  const isCustomerSideMenuOpened = useSelector(selectIsCustomerSideMenu);

  const isSideMenuMinimized = useSelector(selectIsSideMenuMinimized);

  const sideMenuClasses = cx('side-menu', {
    'side-menu__no-box-shadow': router.pathname === CUSTOMERS,
    'side-menu__minimized': isSideMenuMinimized,
  });

  const SideMenuItineraryPage = () => (
    <div className='side-menu side-menu__itinerary-page' />
  );

  const renderSideMenu = () => {
    if (router.pathname === ITINERARY) {
      return <SideMenuItineraryPage />;
    }

    if (router.pathname === CUSTOMERS && !R.isEmpty(customer) && isCustomerSideMenuOpened) {
      return <CustomerProfileSideMenu />;
    }

    return (
      <div className={sideMenuClasses}>
        <SideMenuTabs />
      </div>
    );
  };

  return (
    <>
      {renderSideMenu()}
    </>
  );
}

export default SideMenu;
