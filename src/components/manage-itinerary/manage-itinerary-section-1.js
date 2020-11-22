import React from 'react';
import RoundedButton from 'src/components/material-ui/rounded-button';
import TabPanel from 'src/components/material-ui/tab-panel';
import PropTypes from 'prop-types';
import CurrentDayContent from 'src/components/add-itinerary/current-day-content';
import TripInfoContent from 'src/components/add-itinerary/trip-info-content';
import { MODALS } from 'src/store/constants/modals';

function ManageItinerarySection1({
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
  addEventToUpdatingDay,
}) {
  return (
    <div className='c-add-itinerary'>
      <div className='inner'>
        {dayToDays.map(day => {
          return Number(day.id) === 0 ? (
            <TabPanel value={dayToDayTab} index={Number(day.id)} key={Number(day.id)}>
              <TripInfoContent
                closeStartDateCalendar={closeStartDateCalendar}
                day={Number(day.id)}
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
            <TabPanel value={dayToDayTab} index={Number(day.id)} key={Number(day.id)}>
              <CurrentDayContent
                addEventToDay={addEventToDay}
                addEventToUpdatingDay={addEventToUpdatingDay}
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
            modal: MODALS.SAVE_UPDATED_ITINERARY,
          })}
          type='submit'
        >
          <RoundedButton
            className='add-trip-cta'
            text='Save'
            type='submit'
          />
        </div>
      </div>
    </div>
  );
}

ManageItinerarySection1.prototypes = {
  addEventToUpdatingDay: PropTypes.func,
  openStartDateCalendar: PropTypes.func,
  closeStartDateCalendar: PropTypes.func,
};

export default ManageItinerarySection1;
