import React from 'react';
import { head, propOr } from 'ramda';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import CurrentDayContent from 'src/components/add-itinerary/current-day-content';
import { camelCaseToNormal } from 'src/utils/string';

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
        <>
          <div className='trip-information'>
            <h4>Trip Information</h4>
            <div className='trip-information__content'>
              <p><span>Trip Start Date: </span>{moment.utc(propOr('', 'tripStartDate', tripOverview)).format('LL')}</p>
              <p><span>Destination: </span>{`${propOr('', 'location', tripOverview)}, ${propOr('', 'country', tripOverview)}`}</p>
              <p><span>Price: </span>{`$${propOr('', 'price', tripOverview)} ${camelCaseToNormal(propOr('', 'priceType', tripOverview))}`}</p>
              <p><span>Overview: </span>{propOr('', 'overview', tripOverview)}</p>
            </div>
          </div>
        </>
        <>
          {dayToDays.map(day =>
            Number(day.id) !== 0 && (
              <CurrentDayContent
                addEventToDay={addEventToDay}
                closeNewEventList={closeNewEventList}
                dayToDay={day}
                name={day.name}
                isNewEventListOpened={isNewEventListOpened}
                itineraryEvents={itineraryEvents}
                openNewEventList={openNewEventList}
                shouldHideDeleteDayButton
              />
            )
          )}
        </>
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
