import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import * as actions from 'src/store/actions';
import storeConnector from 'src/store/selectors/common';
import SideMenuTabs from 'src/components/common/side-menu-tabs';
import { ITINERARY } from 'src/store/constants/url';

function SideMenu() {
  const router = useRouter();

  const SideMenuItineraryPage = () => (
    <div className='side-menu side-menu__itinerary-page' />
  );

  return (
    <>
      {router.pathname === ITINERARY ? (
        <SideMenuItineraryPage />
      ) : (
        <div className='side-menu'>
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
