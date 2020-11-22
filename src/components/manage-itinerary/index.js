import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';

import ManageItinerarySection1 from 'src/components/manage-itinerary/manage-itinerary-section-1';
import PageHeader from 'src/components/common/page-header';
import selectItineraryEvents from 'src/store/constants/new-events';
import { indexedObjectToArray } from 'src/utils/object';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Spinner from 'src/components/common/spinner';

function ManageItinerary({
  openStartDateCalendar,
  closeStartDateCalendar,
  isStartDateCalendarOpened,
  tripStartDate,
  uploadCoverImage,
  coverImage,
  setPriceType,
  priceType,
  dayToDayList,
  dayToDayTab,
  openNewEventList,
  closeNewEventList,
  isNewEventListOpened,
  addEventToDay,
  openEditEventPanel,
  closeEditEventPanel,
  isEventDrawerOpened,
  tripOverview,
  toggleEditStartDate,
  isEditingTripStartDate,
  overviewTripStartDate,
  openModal,
  setItineraries,
  addEventToUpdatingDay,
}) {
  const itineraryEvents = selectItineraryEvents();
  const dayToDays = indexedObjectToArray(dayToDayList);
  const setItineraryToManage = useAction(actions.itinerary.setItineraryToManage);
  const router = useRouter();

  useEffect(() => {
    setItineraryToManage(router);
  }, []);

  return (
    <div className='manage-itinerary'>
      {R.isEmpty(dayToDays) || R.isNil(dayToDays) ? (
        <Spinner />
      ) : (
        <>
          <PageHeader coverImage={coverImage} title='Manage an itinerary' />
          <ManageItinerarySection1
            openStartDateCalendar={openStartDateCalendar}
            closeStartDateCalendar={closeStartDateCalendar}
            isStartDateCalendarOpened={isStartDateCalendarOpened}
            tripStartDate={tripStartDate}
            uploadCoverImage={uploadCoverImage}
            coverImage={coverImage}
            setPriceType={setPriceType}
            priceType={priceType}
            dayToDayTab={dayToDayTab}
            openNewEventList={openNewEventList}
            closeNewEventList={closeNewEventList}
            isNewEventListOpened={isNewEventListOpened}
            addEventToDay={addEventToDay}
            openEditEventPanel={openEditEventPanel}
            isEventDrawerOpened={isEventDrawerOpened}
            itineraryEvents={itineraryEvents}
            dayToDays={dayToDays}
            tripOverview={tripOverview}
            toggleEditStartDate={toggleEditStartDate}
            isEditingTripStartDate={isEditingTripStartDate}
            overviewTripStartDate={overviewTripStartDate}
            openModal={openModal}
            addEventToUpdatingDay={addEventToUpdatingDay}
          />
        </>
      )}
    </div>
  );
};

export default ManageItinerary;
