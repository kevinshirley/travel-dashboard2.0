import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as R from 'ramda';

import ManageItinerarySection1 from 'src/components/manage-itinerary/manage-itinerary-section-1';
import DisplayItinerary from 'src/components/display-itinerary/display-itinerary-component';
import PageHeader from 'src/components/common/page-header';
import selectItineraryEvents from 'src/store/constants/new-events';
import { indexedObjectToArray } from 'src/utils/object';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Spinner from 'src/components/common/spinner';

function DisplayItineraryContainer({
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
  toggleEditStartDate,
  isEditingTripStartDate,
  overviewTripStartDate,
  openModal,
  setItineraries,
  addEventToUpdatingDay,
  itineraryId,
}) {
  const itineraryEvents = selectItineraryEvents();
  const dayToDays = indexedObjectToArray(dayToDayList);
  const setItineraryToDisplay = useAction(actions.itinerary.setItineraryToDisplay);
  const router = useRouter();
  const tripOverview = R.head(dayToDays);

  useEffect(() => {
    setItineraryToDisplay(router);
  }, []);

  return (
    <div className='manage-itinerary'>
      {R.isEmpty(dayToDays) || R.isNil(dayToDays) ? (
        <Spinner />
      ) : (
        <>
          <PageHeader coverImage={coverImage} title={R.propOr('', 'title', tripOverview)} />
          <DisplayItinerary
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
            toggleEditStartDate={toggleEditStartDate}
            isEditingTripStartDate={isEditingTripStartDate}
            overviewTripStartDate={overviewTripStartDate}
            openModal={openModal}
            addEventToUpdatingDay={addEventToUpdatingDay}
            tripOverview={tripOverview}
          />
        </>
      )}
    </div>
  );
};

export default DisplayItineraryContainer;
