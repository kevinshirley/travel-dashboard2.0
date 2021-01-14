import React, { useRef, useEffect } from 'react';
import * as R from 'ramda';
import { head, drop } from 'ramda';
import * as actions from 'src/store/actions';
import * as moment from 'moment';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { indexedObjectToArray } from 'src/utils/object';
import { useSelector } from 'react-redux';
import { selectDayToDayList } from 'src/store/selectors/add-itinerary';
import { camelCaseToNormal } from 'src/utils/string';
import uuidv4 from 'src/utils/uuidv4';
import CurrentDayContent from 'src/components/add-itinerary/current-day-content';
import { useAction } from 'src/store/hooks';
import { selectIsNewEventListOpened } from 'src/store/selectors/common';
import selectItineraryEvents from 'src/store/constants/new-events';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { useToasts } from 'react-toast-notifications';
import { selectIsLoggedIn, selectSession } from 'src/store/selectors/session';
import { selectAddItinerarySuccess, selectAddItineraryError, selectAddItineraryIsSubmitting } from 'src/store/selectors/forms';
import { MODALS } from 'src/store/constants/modals';
import Router from 'next/router';
import { ADD_ITINERARY } from 'src/store/constants/url';

function SaveNewItineraryModal() {
  const isNewEventListOpened = useSelector(selectIsNewEventListOpened);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const profile = useSelector(selectSession);
  const dayToDay = useSelector(selectDayToDayList);
  const dayToDayList = indexedObjectToArray(dayToDay);
  const tripOverview = dayToDayList[0];
  const addItinerarySuccess = useSelector(selectAddItinerarySuccess);
  const addItineraryError = useSelector(selectAddItineraryError);
  const addItineraryIsSubmitting = useSelector(selectAddItineraryIsSubmitting);

  const addItinerary = useAction(actions.itinerary.add);
  const addEventToDay = useAction(actions.itinerary.addEventToDay);
  const closeNewEventList = useAction(actions.ui.closeNewEventList);
  const openNewEventList = useAction(actions.ui.openNewEventList);
  const closeModal = useAction(actions.ui.closeModal);
  const openModal = useAction(actions.ui.openModal);

  const itineraryEvents = selectItineraryEvents();
  const { addToast } = useToasts();

  const tripInformationData = [
    head(dayToDayList),
  ];

  const tripItineraryData = drop(1, dayToDayList);

  const tripItineraryDataMapped = tripItineraryData && tripItineraryData.map(day => ({
    ...day,
    events: indexedObjectToArray(day.events),
  }));

  const closeBtnRef = useRef();

  const itinerary_id = uuidv4();

  const submitNewItinerary = e => {
    e.preventDefault();

    if (isLoggedIn) {
      const { coverImage, title, location, country, overview, price } = tripInformationData[0];

      if (R.isNil(coverImage) || R.isEmpty(coverImage)) {
        addToast('Please add a cover image before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else if (R.isNil(title) || R.isEmpty(title)) {
        addToast('Please add a title before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else if (R.isNil(location) || R.isEmpty(location)) {
        addToast('Please add a location before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else if (R.isNil(country) || R.isEmpty(country)) {
        addToast('Please add a country before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else if (R.isNil(overview) || R.isEmpty(overview)) {
        addToast('Please add an description before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else if (R.isNil(price) || R.isEmpty(price)) {
        addToast('Please add a price before publishing an itinerary.', {
          appearance: 'warning',
          autoDismiss: false,
        });
      } else {
        addItinerary({
          path: ADD_ITINERARY,
          itinerary_id,
          createdBy: profile.id,
          country: tripInformationData[0].country,
          tripInformation: tripInformationData[0],
          tripItinerary: tripItineraryDataMapped,
        });
      }
    } else {
      addToast('Please sign in to add a new itinerary to your profile', {
        appearance: 'warning',
        autoDismiss: false,
      });
      openModal({
        modal: MODALS.SIGN_IN,
      });
    }
  };

  useEffect(() => {
    if (!R.isEmpty(addItinerarySuccess)) {
      closeBtnRef.current.click();
      addToast(addItinerarySuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      });
    }

    if (!R.isEmpty(addItineraryError)) {
      addToast(addItineraryError.message, {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  }, [addItinerarySuccess, addItineraryError]);

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
      </div>
      <form className='c-add-itinerary' onSubmit={submitNewItinerary}>
        <div className='inner'>
          <>
            <h1>{R.propOr('', 'title', tripOverview)}</h1>
            <div className='trip-information'>
              <h4>Trip Information</h4>
              <div className='trip-information__content'>
                <p><span>Trip Start Date: </span>{tripOverview.tripStartDate ? moment.utc(tripOverview.tripStartDate).format('LL') : ''}</p>
                <p><span>Destination: </span>{`${tripOverview.location ? tripOverview.location : ''}, ${tripOverview.country ? tripOverview.country : ''}`}</p>
                <p><span>Price: </span>{`$${tripOverview.price ? tripOverview.price : ''} ${camelCaseToNormal(tripOverview.priceType)}`}</p>
                <p><span>Overview: </span>{tripOverview.overview ? tripOverview.overview : ''}</p>
              </div>
            </div>
          </>
          <>
            {dayToDayList.map(day =>
              day.id !== 0 && (
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
        <RoundedButton
          className='add-trip-cta'
          isLoading={addItineraryIsSubmitting}
          text='Publish'
          type='submit'
        />
      </form>
    </>
  );
}

export default SaveNewItineraryModal;
