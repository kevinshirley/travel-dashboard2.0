import React from 'react';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import Link from 'src/components/common/link';
import { LOGO } from 'src/components/common/images';
import SearchBar from 'src/components/common/search-bar';
import ProfileDetails from 'src/components/common/profile-details';
import { useRouter } from 'next/router';
import { ARROW_BACK_IOS_ICON, KEYBOARD_ARROW_RIGHT_ICON } from 'src/components/material-ui/icons';
import Button from 'src/components/material-ui/text-button';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { ITINERARY_EDITOR_PATHNAMES, ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';
import { MODALS } from 'src/store/constants/modals';
import { selectSessionProfile } from 'src/store/selectors/session';

const selectItineraryOverviewModal = pathname => {
  if (pathname === ADD_ITINERARY) return MODALS.SAVE_NEW_ITINERARY;
  if (pathname === MANAGE_ITINERARY) return MODALS.SAVE_UPDATED_ITINERARY;
  return null;
};

function Navbar() {
  const router = useRouter();
  const openModal = useAction(actions.ui.openModal);
  const sessionProfile = useSelector(selectSessionProfile);

  const userName = `${sessionProfile.firstName} ${sessionProfile.lastName}`;
  const profileName = R.isEmpty(sessionProfile.firstName) || R.isEmpty(sessionProfile.lastName) || R.isNil(sessionProfile.firstName) || R.isNil(sessionProfile.lastName) ? 'Account' : userName;

  const MainNavbarContent = () => (
    <div className='inner'>
      <div className='logo'>
        <Link className='main-navigation-icon' href='/'>
          <img src={LOGO} alt='Trip Imagine Logo' />
        </Link>
      </div>
      <div className='search'>
        <SearchBar />
      </div>
      <div className='profile'>
        <ProfileDetails name={profileName} />
      </div>
    </div>
  );

  const AddItineraryNavbarContent = () => (
    <div className='inner'>
      <div className='back-to-itineraries'>
        <Link href='/itineraries'>
          <Button>
            {ARROW_BACK_IOS_ICON}
            <span>Itineraries</span>
          </Button>
        </Link>
      </div>
      <div className='save-itinerary'>
        <Button onClick={() => openModal({ modal: selectItineraryOverviewModal(router.pathname) })} type='submit'>
          <span>Publish</span>
          {KEYBOARD_ARROW_RIGHT_ICON}
        </Button>
      </div>
    </div>
  );

  return (
    <div className='navbar'>
      {!(ITINERARY_EDITOR_PATHNAMES.includes(router.pathname)) ? (
        <MainNavbarContent />
      ) : (
        <AddItineraryNavbarContent />
      )}
    </div>
  );
};

export default Navbar;
