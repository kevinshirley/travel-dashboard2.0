import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { indexedObjectToArray } from 'src/utils/object';
import Avatar from 'src/components/material-ui/avatar';
import { toUpperFirst, toUsdPrice, camelCaseToNormal } from 'src/utils/string';
import { SPACING } from 'src/components/material-ui/icons';
import NewEventsManager from 'src/components/add-itinerary/new-events-manager';
import EventDrawer from 'src/components/common/event-drawer';
import { TRASH_ICON } from 'src/components/material-ui/icons';
import { MODALS } from 'src/store/constants/modals';

function CurrentDayContent({
  addEventToDay,
  closeNewEventList,
  dayToDay,
  name,
  isNewEventListOpened,
  itineraryEvents,
  openNewEventList,
  addEventToUpdatingDay,
  openModal,
  shouldHideDeleteDayButton = false,
}) {
  const currentEvents = dayToDay && indexedObjectToArray(dayToDay.events);

  return (
    <>
      <div className='header'>
        <div className='current-day-title'>
          <h4>{name}</h4>
          {!shouldHideDeleteDayButton && (
            <div
              className='c-add-itinerary__remove-icon'
              onClick={() => openModal({
                modal: MODALS.DELETE_ITINERARY_DAY_CONFIRMATION,
                modalPayload: { day: dayToDay.id },
              })}
            >
              {TRASH_ICON}
            </div>
          )}
        </div>
        <NewEventsManager
          addEventToDay={addEventToDay}
          closeNewEventList={closeNewEventList}
          dayToDay={dayToDay}
          addEventToUpdatingDay={addEventToUpdatingDay}
          isNewEventListOpened={isNewEventListOpened}
          itineraryEvents={itineraryEvents}
          openNewEventList={openNewEventList}
        />
      </div>
      {currentEvents.length > 0 ? (
        <div className='daily-events'>
          {currentEvents && currentEvents.map((event, i) => {
            const currentTabIndex = itineraryEvents.filter(e => e.id === event.type);
            const tabIndex = currentTabIndex[0].eventCategoryTab;

            return (
              <div className='daily-event' key={i}>
                <div className='details-section'>
                  <div className='event-details'>
                    {event && (
                      <span>
                        <Avatar>{currentTabIndex[0].icon}</Avatar>
                      </span>
                    )}
                    <span>
                      {SPACING}
                      {SPACING}
                    </span>
                    {event && event.name && (
                      <span>
                        {event.name}
                        {SPACING}
                      </span>
                    )}
                    {event && event.flightDirection && (
                      <span>
                        {SPACING}
                        {event.flightDirection ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.flightDirection && (
                      <span>
                        {SPACING}
                        {toUpperFirst(event.flightDirection)}
                        {SPACING}
                      </span>
                    )}
                    {event && event.accommodationStatus && (
                      <span>
                        {SPACING}
                        {event.accommodationStatus ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.accommodationStatus && (
                      <span>
                        {SPACING}
                        {camelCaseToNormal(event.accommodationStatus)}
                        {SPACING}
                      </span>
                    )}
                    {event && event.transportationDirection && (
                      <span>
                        {SPACING}
                        {event.transportationDirection ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.transportationDirection && (
                      <span>
                        {SPACING}
                        {toUpperFirst(event.transportationDirection)}
                        {SPACING}
                      </span>
                    )}
                    {event && event.time && (
                      <span>
                        {SPACING}
                        {event.time ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.time && (
                      <span>
                        {SPACING}
                        {event.time}
                      </span>
                    )}
                    {event && event.checkInTime && (
                      <span>
                        {SPACING}
                        {event.checkInTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.checkInTime && (
                      <span>
                        {SPACING}
                        {event.checkInTime}
                      </span>
                    )}
                    {event && event.checkOutTime && (
                      <span>
                        {SPACING}
                        {event.checkOutTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.checkOutTime && (
                      <span>
                        {SPACING}
                        {event.checkOutTime}
                      </span>
                    )}
                    {event && event.transportationDepartureTime && (
                      <span>
                        {SPACING}
                        {event.transportationDepartureTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.transportationDepartureTime && (
                      <span>
                        {SPACING}
                        {event.transportationDepartureTime}
                      </span>
                    )}
                    {event && event.transportationArrivalTime && (
                      <span>
                        {SPACING}
                        {event.transportationArrivalTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.transportationArrivalTime && (
                      <span>
                        {SPACING}
                        {event.transportationArrivalTime}
                      </span>
                    )}
                    {event && event.tourTime && (
                      <span>
                        {SPACING}
                        {event.tourTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.tourTime && (
                      <span>
                        {SPACING}
                        {event.tourTime}
                      </span>
                    )}
                    {event && event.cruiseTime && (
                      <span>
                        {SPACING}
                        {event.cruiseTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.cruiseTime && (
                      <span>
                        {SPACING}
                        {event.cruiseTime}
                      </span>
                    )}
                    {event && event.infoTime && (
                      <span>
                        {SPACING}
                        {event.infoTime ? '-' : ''}
                        {SPACING}
                      </span>
                    )}
                    {event && event.infoTime && (
                      <span>
                        {SPACING}
                        {event.infoTime}
                      </span>
                    )}
                  </div>
                  <div className='edit-container'>
                    <EventDrawer day={Number(dayToDay.id)} event={event} categoryTabIndex={tabIndex} />
                  </div>
                </div>
                {event && event.title && (
                  <div className='title-section'>
                    <h2>{event.title}</h2>
                  </div>
                )}
                {event && event.notes && (
                  <div className='event-notes'>
                    <div className='info-item flight-notes'>
                      <p>{event.notes}</p>
                    </div>
                  </div>
                )}
                {event && (event.airline || event.terminal || event.flightNumber || event.gate || event.flightConfirmationNumber || event.flightDuration) && (
                  <div className='event-info'>
                    {event && event.airline && (
                      <div className='info-item airline'>
                        <h4>Airline</h4>
                        {event.airline}
                      </div>
                    )}
                    {event && event.terminal && (
                      <div className='info-item terminal'>
                        <h4>Terminal</h4>
                        {event.terminal}
                      </div>
                    )}
                    {event && event.flightNumber && (
                      <div className='info-item flight-airline'>
                        <h4>Flight Number</h4>
                        {event.flightNumber}
                      </div>
                    )}
                    {event && event.gate && (
                      <div className='info-item flight-gate'>
                        <h4>Gate</h4>
                        {event.gate}
                      </div>
                    )}
                    {event && event.flightConfirmationNumber && (
                      <div className='info-item flight-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.flightConfirmationNumber}
                      </div>
                    )}
                    {event && event.flightDuration && (
                      <div className='info-item flight-duration'>
                        <h4>Flight Duration</h4>
                        {event.flightDuration}
                      </div>
                    )}
                  </div>
                )}
                {event && (event.activityBookedOn || event.activityConfirmationNumber || event.activityDuration) && (
                  <div className='event-info'>
                    {event && event.activityBookedOn && (
                      <div className='info-item activity-booked-on'>
                        <h4>Booked On</h4>
                        {event.activityBookedOn}
                      </div>
                    )}
                    {event && event.activityConfirmationNumber && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.activityConfirmationNumber}
                      </div>
                    )}
                    {event && event.activityDuration && (
                      <div className='info-item activity-duration'>
                        <h4>Duration</h4>
                        {event.activityDuration}
                      </div>
                    )}
                  </div>
                )}
                {event && (event.accommodationBookedOn || event.accommodationConfirmationNumber) && (
                  <div className='event-info'>
                    {event && event.accommodationBookedOn && (
                      <div className='info-item activity-booked-on'>
                        <h4>Booked On</h4>
                        {event.accommodationBookedOn}
                      </div>
                    )}
                    {event && event.accommodationConfirmationNumber && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.accommodationConfirmationNumber}
                      </div>
                    )}
                  </div>
                )}
                {event && (event.transportationBookedOn || event.transportationConfirmationNumber || event.transportationDuration) && (
                  <div className='event-info'>
                    {event && event.transportationBookedOn && (
                      <div className='info-item activity-booked-on'>
                        <h4>Booked On</h4>
                        {event.transportationBookedOn}
                      </div>
                    )}
                    {event && event.transportationConfirmationNumber && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.transportationConfirmationNumber}
                      </div>
                    )}
                    {event && event.transportationDuration && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Duration</h4>
                        {event.transportationDuration}
                      </div>
                    )}
                  </div>
                )}
                {event && (event.tourDuration || event.tourBookedOn || event.tourConfirmationNumber) && (
                  <div className='event-info'>
                    {event && event.tourBookedOn && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Booked On</h4>
                        {event.tourBookedOn}
                      </div>
                    )}
                    {event && event.tourConfirmationNumber && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.tourConfirmationNumber}
                      </div>
                    )}
                    {event && event.tourDuration && (
                      <div className='info-item activity-booked-on'>
                        <h4>Duration</h4>
                        {event.tourDuration}
                      </div>
                    )}
                  </div>
                )}
                {event && (event.cruiseDuration || event.cruiseBookedOn || event.cruiseConfirmationNumber) && (
                  <div className='event-info'>
                    {event && event.cruiseBookedOn && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Booked On</h4>
                        {event.cruiseBookedOn}
                      </div>
                    )}
                    {event && event.cruiseConfirmationNumber && (
                      <div className='info-item activity-confirmation-number'>
                        <h4>Confirmation #</h4>
                        {event.cruiseConfirmationNumber}
                      </div>
                    )}
                    {event && event.cruiseDuration && (
                      <div className='info-item activity-booked-on'>
                        <h4>Duration</h4>
                        {event.cruiseDuration}
                      </div>
                    )}
                  </div>
                )}
                {event && event.price && (
                  <div className='event-cost'>
                    {event && event.price && (
                      <div className='info-item flight-price'>
                        <h4>Price</h4>
                        {toUsdPrice(event.price)}
                      </div>
                    )}
                    {event && event.currency && (
                      <div className='info-item flight-currency'>
                        <h4>Currency</h4>
                        {event.currency}
                      </div>
                    )}
                    {event && event.priceType && event.priceType !== 'none' && (
                      <div className='info-item flight-price-type'>
                        <h4>Price Type</h4>
                        {camelCaseToNormal(event.priceType)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className='no-events-added'>
          <span>Nothing here. Add new events to this day.</span>
        </div>
      )}
    </>
  );
}

CurrentDayContent.propTypes = {
  addEventToUpdatingDay: PropTypes.func,
  dayToDay: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CurrentDayContent;
