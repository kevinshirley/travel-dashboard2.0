import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ItineraryOverviewDrawerOption from 'src/components/common/itinerary-overview-drawer-option';
import { Formik, Field } from 'formik';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { useRouter } from 'next/router';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';

function ItineraryOverviewDrawer({
  day,
  categoryTabIndex,
  uploadCoverImage,
  openStartDateCalendar,
  tripStartDate,
  isStartDateCalendarOpened,
  closeStartDateCalendar,
  setPriceType,
  tripOverview
}) {
  const setOverviewToUpdatingDay = useAction(actions.itinerary.setOverviewToUpdatingDay);
  const setOverviewToDay = useAction(actions.itinerary.setOverviewToDay);
  const toggleEventDrawer = useAction(actions.ui.toggleEventDrawer);
  const router = useRouter();

  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ [anchor]: open });
  };

  const list = () => (
    <Formik 
      onSubmit={(values) => {
        if (router.pathname === ADD_ITINERARY) {
          setOverviewToDay({ day, values });
        }
        if (router.pathname === MANAGE_ITINERARY) {
          setOverviewToUpdatingDay({ day, values });
        }
        setState({ ...state, right: false });
      }}
      initialValues={{
        title: tripOverview && tripOverview.title ? tripOverview.title : '',
        location: tripOverview && tripOverview.location ? tripOverview.location : '',
        country: tripOverview && tripOverview.country ? tripOverview.country : '',
        price: tripOverview && tripOverview.price ? tripOverview.price : '',
        priceType: tripOverview && tripOverview.priceType ? tripOverview.priceType : 'perPerson',
        pathname: tripOverview && tripOverview.pathname ? tripOverview.pathname : '',
        overview: tripOverview && tripOverview.overview ? tripOverview.overview : '',
      }}
    >
      {() => (
        <ItineraryOverviewDrawerOption
          categoryTabIndex={categoryTabIndex}
          uploadCoverImage={uploadCoverImage}
          openStartDateCalendar={openStartDateCalendar}
          tripStartDate={tripStartDate}
          isStartDateCalendarOpened={isStartDateCalendarOpened}
          closeStartDateCalendar={closeStartDateCalendar}
          setPriceType={setPriceType}
        />
      )}
    </Formik>
  );

  return (
    <>
      <Button className='manage-trip-info__cta' onClick={toggleDrawer('right', true)}>+ Manage Trip Info</Button>
      <SwipeableDrawer 
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}

export default ItineraryOverviewDrawer;
