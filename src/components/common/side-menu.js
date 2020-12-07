import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import * as actions from 'src/store/actions';
import storeConnector from 'src/store/selectors/common';
import SideMenuTabs from 'src/components/common/side-menu-tabs';
import { ITINERARY, CUSTOMERS } from 'src/store/constants/url';

function SideMenu() {
  const router = useRouter();

  const sideMenuClasses = cx({
    'side-menu__no-box-shadow': router.pathname === CUSTOMERS,
  }, 'side-menu');

  const SideMenuItineraryPage = () => (
    <div className='side-menu side-menu__itinerary-page' />
  );

  return (
    <>
      {router.pathname === ITINERARY ? (
        <SideMenuItineraryPage />
      ) : (
        <div className={sideMenuClasses}>
          <SideMenuTabs />
        </div>
      )}
    </>
  );
}

export default connect(
  storeConnector,
  {},
)(SideMenu);
