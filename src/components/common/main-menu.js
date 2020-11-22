import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions';
import storeConnector from 'src/store/selectors/add-itinerary';
import Link from 'src/components/common/link';
import {
  HOME_ICON, 
  PEOPLE_ICON, 
  BAR_CHART_ICON,
  TODAY_CALENDAR_ICON,
  CLOCK_ICON,
  NOTIFICATIONS_ICON,
  SETTINGS_ICON,
  LOGOUT_ICON,
} from 'src/components/material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Button from 'src/components/material-ui/text-button';
import DayToDayTabs from 'src/components/common/day-to-day-tabs.js';
import { ITINERARY_EDITOR_PATHNAMES, ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';
import { selectDayToDayToManage } from 'src/store/selectors/manage-itinerary';
import { useAction } from 'src/store/hooks';

function MainMenu({
  setDayToDayTab,
  addDayToDay,
  dayToDayList,
  dayToDayTab,
  addUpdatingDayToDay,
}) {
  const router = useRouter();
  const tab = dayToDayTab;
  const dayToDayToManage = useSelector(selectDayToDayToManage);
  const logout = useAction(actions.session.logout);

  const dayToDayListTabs = () => {
    if (router.pathname === MANAGE_ITINERARY) {
      return dayToDayToManage;
    }
    return dayToDayList;
  }

  const handleAddedItineraryDay = () => {
    if (router.pathname === ADD_ITINERARY) {
      addDayToDay();
    }
    if (router.pathname === MANAGE_ITINERARY) {
      addUpdatingDayToDay();
    }
  }

  const MainMenuContent = () => (
    <div className="main-menu">
      <div className='inner'>
        <div className='main-navigation'>
          <Link className='main-navigation-icon' href="/">
            {HOME_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/profiles">
            {PEOPLE_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/itineraries">
            {TODAY_CALENDAR_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/reports">
            {BAR_CHART_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/search-history">
            {CLOCK_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/notifications">
            {NOTIFICATIONS_ICON}
          </Link>
          <Link className='main-navigation-icon' href="/settings">
            {SETTINGS_ICON}
          </Link>
        </div>
        <div className='logout'>
          <div className='main-navigation-icon' onClick={() => logout()}>
            {LOGOUT_ICON}
          </div>
        </div>
      </div>
    </div>
  );

  const AddItineraryMenuContent = ({ setDayToDayTab }) => (
    <div className="main-menu add-itinerary-menu">
      <div className='inner'>
        <DayToDayTabs setDayToDayTab={setDayToDayTab} list={dayToDayListTabs()} tab={tab} />
        <Button onClick={handleAddedItineraryDay}>
          <span>+ New Day</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {!(ITINERARY_EDITOR_PATHNAMES.includes(router.pathname)) ? (
        <MainMenuContent />
      ) : (
        <AddItineraryMenuContent setDayToDayTab={setDayToDayTab} />
      )}
    </>
  );
}

export default connect(
  storeConnector,
  {
    setDayToDayTab: actions.ui.setDayToDayTab,
    addDayToDay: actions.itinerary.addDayToDay,
    addUpdatingDayToDay: actions.itinerary.addUpdatingDayToDay,
  },
)(MainMenu);
