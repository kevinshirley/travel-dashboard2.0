import Router from 'next/router';
import { isEmpty, isNil, dissoc, assocPath } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { axiosPostDocument, axiosGet, post } from 'src/utils/fetch';
import FormData from 'form-data';
import { selectDayToDayList, selectTripStartDate } from 'src/store/selectors/add-itinerary';
import { selectIsEditingTripStartDate } from 'src/store/selectors/common';
import { lastObjectValue } from 'src/utils/object';
import { localStore } from 'src/utils/storage';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';
import { ITINERARY, itinerary, ui, ROOT, forms } from 'src/store/actions';
import { indexedObjectToArray } from 'src/utils/object';
import { selectSessionProfile } from 'src/store/selectors/session';

export function* watchAddItinerary() {
  yield takeLatest(ITINERARY.ADD, addItinerary);
}

export function* watchUploadCoverImage() {
  yield takeLatest(ITINERARY.UPLOAD_COVER_IMAGE, uploadCoverImage);
}

export function* watchAddDayToDay() {
  yield takeLatest(ITINERARY.ADD_DAY_TO_DAY, addDayToDay);
}

export function* watchDeleteDayToDay() {
  yield takeLatest(ITINERARY.DELETE_DAY_TO_DAY, deleteDayToDay);
}

export function* watchAddEventToDay() {
  yield takeLatest(ITINERARY.ADD_EVENT_TO_DAY, addEventToDay);
}

export function* watchSetEventToDay() {
  yield takeLatest(ITINERARY.SET_EVENT_TO_DAY, setEventToDay);
}

export function* watchSetOverviewToDay() {
  yield takeLatest(ITINERARY.SET_OVERVIEW_TO_DAY, setOverviewToDay);
}

export function* watchPullCurrentItineraryFromStorage() {
  yield takeLatest(ROOT.INITIAL_LOAD, pullCurrentItineraryFromStorage);
}

export function* watchToggleEditStartDate() {
  yield takeLatest(ITINERARY.TOGGLE_EDIT_START_DATE, toggleEditStartDate);
}

export function* watchSetTripStartDate() {
  yield takeLatest(ITINERARY.SET_TRIP_START_DATE, setTripStartDate);
}

export function* watchDeleteEventToDay() {
  yield takeLatest(ITINERARY.DELETE_EVENT_TO_DAY, deleteEventToDay);
}

function* addItinerary({ payload }) {
  const { path } = payload;
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (path === ADD_ITINERARY) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'addItinerary' }));
  }

  if (path === MANAGE_ITINERARY) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'manageItinerary' }));
  }

  const result = yield call(post, '/api/itinerary', payload);

  if (result.success) {
    if (path === ADD_ITINERARY) {
      Router.push({ pathname: '/itineraries' });

      const userItineraries = yield call(axiosGet, `/api/itineraries/user?userId=${id}`);

      if (userItineraries.status === 200 && userItineraries.data.success) {
        yield put(itinerary.setItineraries(userItineraries.data));
      }

      localStore('currentItinerary').set({});

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addItinerary' }));

      yield put(forms.setSuccess({ message: 'You\'ve successfully created and published this itinerary!', form: 'addItinerary' }));
    } else if (path === MANAGE_ITINERARY) {
      Router.push({
        pathname: '/manage-itinerary',
        query: { ...dissoc('overlay', Router.router.query) },
      });

      const userItineraries = yield call(axiosGet, `/api/itineraries/user?userId=${id}`);

      if (userItineraries.status === 200 && userItineraries.data.success) {
        yield put(itinerary.setItineraries(userItineraries.data));
      }

      localStore('currentUpdatingItinerary').set({});

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'manageItinerary' }));

      yield put(forms.setSuccess({ message: 'You\'ve successfully updated and saved this itinerary!', form: 'manageItinerary' }));
    }
  } else {
    if (path === ADD_ITINERARY) {
      yield put(forms.setError({ message: result.error.message ? result.error.message : 'An error occured when saving your itinerary.', form: 'addItinerary' }));

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addItinerary' }));
    } else if (path === MANAGE_ITINERARY) {
      yield put(forms.setError({ message: result.error.message ? result.error.message : 'An error occured when saving your itinerary.', form: 'manageItinerary' }));

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'manageItinerary' }));
    }
  }
}

function* pullCurrentItineraryFromStorage() {
  const currentItinerary = localStore('currentItinerary').get();
  if (isEmpty(currentItinerary) || isNil(currentItinerary)) return;
  yield put(itinerary.setDayToDays(currentItinerary));
}

function* uploadCoverImage({ payload }) {
  const formData = new FormData();

  if ( payload && payload.name ) {
    formData.append('document', payload);

    const data = yield call(axiosPostDocument, '/api/upload/cover-image', formData);

    if (data.status === 200) {
      yield put(itinerary.setCoverImage(data.data));
      yield put(itinerary.setOverviewCoverImage(data.data));

      const dayToDayList = yield select(selectDayToDayList);
      localStore('currentItinerary').set(dayToDayList);
    }
  } else {
    console.log('error: Payload empty');
  }
}

function* addDayToDay() {
  const dayToDayList = yield select(selectDayToDayList);
  const last = lastObjectValue(dayToDayList);
  const nextDayId = last.id+1;

  const newDayToDayList = {
    ...dayToDayList,
    [nextDayId]: {
      id: nextDayId,
      type: 'new-event',
      name: `Day ${nextDayId}`,
      events: {},
    },
  };

  localStore('currentItinerary').set(newDayToDayList);

  yield put(itinerary.setDayToDays(newDayToDayList));
}

function* addEventToDay({ payload }) {
  const { event, day, name } = payload;
  const dayToDayList = yield select(selectDayToDayList);
  const currentDay = dayToDayList[day];
  const currentDayEvents = dayToDayList[day].events;
  const last = lastObjectValue(currentDayEvents);
  const nextEventId = last ? last.id+1 : 0;

  currentDay.events = {
    ...currentDayEvents,
    [nextEventId]: {
      id: nextEventId,
      type: event,
      name: name,
    },
  };

  dayToDayList[day] = currentDay;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  localStore('currentItinerary').set(dayToDayListUpdated);

  yield put(itinerary.setDayToDays(dayToDayListUpdated));
  yield put(ui.openEventDrawer());
}

function* setEventToDay({ payload }) {
  const { event, day, values } = payload;
  const dayToDayList = yield select(selectDayToDayList);
  const currentDay = dayToDayList[day];
  const currentDayEvents = dayToDayList[day].events;
  const targetEvent = currentDayEvents[event];

  const updatedTargetEvent = {
    ...targetEvent,
    ...values,
  };

  currentDay.events = {
    ...currentDayEvents,
    [event]: {
      ...updatedTargetEvent,
    },
  };

  dayToDayList[day] = currentDay;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  localStore('currentItinerary').set(dayToDayListUpdated);

  yield put(itinerary.setDayToDays(dayToDayListUpdated));
  yield put(ui.closeEventDrawer());
}

function* setOverviewToDay({ payload }) {
  const { day, values } = payload;
  const dayToDayList = yield select(selectDayToDayList);
  const currentOverview = dayToDayList[day];
  const currentOverviewUpdated = {
    ...currentOverview,
    ...values,
  };

  dayToDayList[day] = currentOverviewUpdated;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  localStore('currentItinerary').set(dayToDayListUpdated);

  yield put(itinerary.setDayToDays(dayToDayListUpdated));
}

function* toggleEditStartDate() {
  const isEditingTripStartDate = yield select(selectIsEditingTripStartDate);
  yield put(ui.isEditingTripStartDate(isEditingTripStartDate));
  yield put(ui.openStartDateCalendar());
}

function* setTripStartDate() {
  yield put(ui.closeStartDateCalendar());

  const tripStartDate = yield select(selectTripStartDate);
  const dayToDayList = yield select(selectDayToDayList);
  const currentOverview = dayToDayList[0];

  const currentOverviewUpdated = {
    ...currentOverview,
    tripStartDate,
  };

  dayToDayList[0] = currentOverviewUpdated;

  localStore('currentItinerary').set(dayToDayList);

  yield put(itinerary.setDayToDays(dayToDayList));
}

function* deleteEventToDay({ payload }) {
  const { event, day } = payload;
  const dayToDayList = yield select(selectDayToDayList);
  const currentDay = dayToDayList[day];
  const currentDayEvents = dayToDayList[day].events;

  const currentDayEventsUpdated = dissoc(event, currentDayEvents);

  const currentDayEventsList = indexedObjectToArray(currentDayEventsUpdated);

  const currentDayEventsUpdatedListUpdated = currentDayEventsList.map((event, index) => ({
    ...event,
    id: index,
  }));

  const currentDayEventsObjectUpdated = Object.assign({}, currentDayEventsUpdatedListUpdated);

  const updatedDayToDayList = assocPath(['events'], currentDayEventsObjectUpdated, currentDay);

  dayToDayList[day] = updatedDayToDayList;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  localStore('currentItinerary').set(dayToDayListUpdated);

  yield put(itinerary.setDayToDays(dayToDayListUpdated));
  yield put(ui.closeEventDrawer());
}

function* deleteDayToDay({ payload }) {
  const { day } = payload;
  const dayToDayList = yield select(selectDayToDayList);
  const dayToDayListWithRemovedDay = dissoc(day, dayToDayList);
  const dayToDayListWithRemovedDayList = indexedObjectToArray(dayToDayListWithRemovedDay);

  const dayToDayListWithRemovedDayUpdated = dayToDayListWithRemovedDayList.map((event, index) => {
    if (event.id === 0) {
      return event;
    } else {
      return {
        ...event,
        id: index,
        name: `Day ${index}`,
      };
    }
  });

  const dayToDayListWithRemovedDayObject = Object.assign({}, dayToDayListWithRemovedDayUpdated);

  localStore('currentItinerary').set(dayToDayListWithRemovedDayObject);
  localStore('lastDayToDayTabSelected').set(0);

  yield put(ui.setDayToDayTab(0));
  yield put(itinerary.setDayToDays(dayToDayListWithRemovedDayObject));
  yield put(ui.closeModal());
}
