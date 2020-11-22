import React from 'react';
import PropTypes from 'prop-types';
import RoundedButton from 'src/components/material-ui/rounded-button';
import TabPanel from 'src/components/material-ui/tab-panel';
import CurrentDayContent from 'src/components/add-itinerary/current-day-content';
import TripInfoContent from 'src/components/add-itinerary/trip-info-content';
import { MODALS } from 'src/store/constants/modals';

function AddItinerarySection1({
  openStartDateCalendar, 
  closeStartDateCalendar,
  isStartDateCalendarOpened,
  tripStartDate,
  uploadCoverImage,
  setPriceType,
  dayToDayTab,
  openNewEventList,
  closeNewEventList,
  isNewEventListOpened,
  addEventToDay,
  itineraryEvents,
  dayToDays,
  tripOverview,
  toggleEditStartDate,
  isEditingTripStartDate,
  overviewTripStartDate,
  openModal,
}) {
  return (
    <div className='c-add-itinerary'>
      <div className='inner'>
        {dayToDays && dayToDays.map(day => {
          return day.id === 0 ? (
            <TabPanel value={dayToDayTab} index={day.id} key={day.id}>
              <TripInfoContent
                closeStartDateCalendar={closeStartDateCalendar}
                day={day.id}
                isEditingTripStartDate={isEditingTripStartDate}
                isStartDateCalendarOpened={isStartDateCalendarOpened}
                openStartDateCalendar={openStartDateCalendar}
                setPriceType={setPriceType}
                tripOverview={tripOverview}
                tripStartDate={tripStartDate}
                uploadCoverImage={uploadCoverImage}
                overviewTripStartDate={overviewTripStartDate}
                toggleEditStartDate={toggleEditStartDate}
              />
            </TabPanel>
          ) : (
            <TabPanel value={dayToDayTab} index={day.id} key={day.id}>
              <CurrentDayContent
                addEventToDay={addEventToDay}
                closeNewEventList={closeNewEventList}
                dayToDay={day}
                name={day.name}
                isNewEventListOpened={isNewEventListOpened}
                itineraryEvents={itineraryEvents}
                openNewEventList={openNewEventList}
                openModal={openModal}
              />
            </TabPanel>
          );
        })}
        <div
          onClick={() => openModal({
            modal: MODALS.SAVE_NEW_ITINERARY,
          })}
          type='submit'
        >
          <RoundedButton
            className='add-trip-cta'
            text='Publish'
            type='submit'
          />
        </div>
      </div>
    </div>
  );
}

AddItinerarySection1.prototypes = {
  openStartDateCalendar: PropTypes.func,
  closeStartDateCalendar: PropTypes.func,
};

export default AddItinerarySection1;
