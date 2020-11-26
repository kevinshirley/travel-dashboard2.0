import React, { useRef, useEffect } from 'react';
import { head, drop, propOr, isEmpty, dissoc } from 'ramda';
import * as moment from 'moment';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import * as actions from 'src/store/actions';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { indexedObjectToArray } from 'src/utils/object';
import { selectDayToDayToManage, selectDayToDayIdToManage, selectDayToDayCreatedAtToManage } from 'src/store/selectors/manage-itinerary';
import { camelCaseToNormal } from 'src/utils/string';
import CurrentDayContent from 'src/components/add-itinerary/current-day-content';
import { useAction } from 'src/store/hooks';
import { selectIsNewEventListOpened } from 'src/store/selectors/common';
import selectItineraryEvents from 'src/store/constants/new-events';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { MANAGE_ITINERARY } from 'src/store/constants/url';
import { selectIsLoggedIn, selectSessionProfile } from 'src/store/selectors/session';
import { selectManageItinerarySuccess, selectManageItineraryError } from 'src/store/selectors/forms';

function SaveUpdatedItineraryModal() {
  const dayToDay = useSelector(selectDayToDayToManage);
  const dayToDayID = useSelector(selectDayToDayIdToManage);
  const isNewEventListOpened = useSelector(selectIsNewEventListOpened);
  const dayToDayList = indexedObjectToArray(dayToDay);
  const tripOverview = head(dayToDayList);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const profile = useSelector(selectSessionProfile);
  const createdAt = useSelector(selectDayToDayCreatedAtToManage);
  const manageItinerarySuccess = useSelector(selectManageItinerarySuccess);
  const manageItineraryError = useSelector(selectManageItineraryError);

  const addEventToDay = useAction(actions.itinerary.addEventToDay);
  const closeNewEventList = useAction(actions.ui.closeNewEventList);
  const openNewEventList = useAction(actions.ui.openNewEventList);
  const closeModal = useAction(actions.ui.closeModal);
  const openModal = useAction(actions.ui.openModal);
  const addItinerary = useAction(actions.itinerary.add);

  const itineraryEvents = selectItineraryEvents();
  const { addToast } = useToasts();

  const tripInformationData = [
    head(dayToDayList),
  ];

  const tripItineraryData = drop(1, dayToDayList);

  const tripItineraryDataMapped = tripItineraryData.map(day => ({
    ...day,
    events: indexedObjectToArray(day.events),
  }));

  const closeBtnRef = useRef();

  const submitUpdatedItinerary = e => {
    e.preventDefault();

    if (isLoggedIn) {
      addItinerary({
        path: MANAGE_ITINERARY,
        itinerary_id: dayToDayID,
        createdBy: profile.id,
        createdAt,
        updatedAt: moment().format(),
        country: tripInformationData[0].country,
        tripInformation: tripInformationData[0],
        tripItinerary: tripItineraryDataMapped,
      });
    } else {
      addToast('Please sign in to update this itinerary in your profile', {
        appearance: 'warning',
        autoDismiss: false,
      });
      openModal({
        modal: MODALS.SIGN_IN,
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(manageItinerarySuccess)) {
      closeBtnRef.current.click();
      addToast(manageItinerarySuccess.message, {
        appearance: 'success',
        autoDismiss: false,
      });
    }

    if (!isEmpty(manageItineraryError)) {
      addToast(manageItineraryError.message, {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  }, [manageItinerarySuccess, manageItineraryError]);

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
      </div>
      <form className='c-add-itinerary' onSubmit={submitUpdatedItinerary}>
        <div className='inner'>
          <>
            <h1>{propOr('', 'title', tripOverview)}</h1>
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
            {dayToDayList.map(day =>
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
        <RoundedButton
          className='add-trip-cta'
          text='Publish'
          type='submit'
        />
      </form>
    </>
  );
}

export default SaveUpdatedItineraryModal;
