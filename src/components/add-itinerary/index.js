import React from 'react';
import PropTypes from 'prop-types';
import AddItinerarySection1 from 'src/components/add-itinerary/add-itinerary-section-1';
import PageHeader from 'src/components/common/page-header';
import selectItineraryEvents from 'src/store/constants/new-events';
import { indexedObjectToArray } from 'src/utils/object';

function AddItinerary({
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
}) {
  const itineraryEvents = selectItineraryEvents();
  const dayToDays = indexedObjectToArray(dayToDayList);

  return (
    <div className='add-itinerary'>
      <PageHeader coverImage={coverImage} title='Add an itinerary' />
      <AddItinerarySection1
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
      />
    </div>
  );
};

AddItinerary.prototypes = {
  openStartDateCalendar: PropTypes.func,
  closeStartDateCalendar: PropTypes.func,
};

export default AddItinerary;
