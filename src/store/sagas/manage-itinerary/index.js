import * as R from 'ramda';
import { ITINERARY, itinerary, ui } from 'src/store/actions';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { selectItineraries } from '/src/store/selectors/itineraries';
import { axiosGet } from 'src/utils/fetch';
import {
  selectDayToDayToManage,
  selectDayToDayIdToManage,
  selectDayToDayCreatedAtToManage,
  selectDayToDayUpdatedAtToManage,
  selectDayToDayCreatedByToManage,
  selectDayToDayCountryToManage,
  selectDayToDayTripInformationToManage
} from 'src/store/selectors/manage-itinerary';
import { indexedObjectToArray, lastObjectValue } from 'src/utils/object';
import { localStore } from 'src/utils/storage';

export function* watchSetItineraryToManage() {
  yield takeLatest(ITINERARY.SET_ITINERARY_TO_MANAGE, setItineraryToManage);
}

export function* watchSetOverviewToUpdatingDay() {
  yield takeLatest(ITINERARY.SET_OVERVIEW_TO_UPDATING_DAY, setOverviewToUpdatingDay);
}

export function* watchSetEventToUpdatingDay() {
  yield takeLatest(ITINERARY.SET_EVENT_TO_UPDATING_DAY, setEventToUpdatingDay);
}

export function* watchaddEventToUpdatingDay() {
  yield takeLatest(ITINERARY.ADD_EVENT_TO_UPDATING_DAY, addEventToUpdatingDay);
}

export function* watchAddUpdatingDayToDay() {
  yield takeLatest(ITINERARY.ADD_UPDATING_DAY_TO_DAY, addUpdatingDayToDay);
}

export function* watchDeleteManagedDayToDay() {
  yield takeLatest(ITINERARY.DELETE_MANAGED_DAY_TO_DAY, deleteManagedDayToDay);
}

export function* watchDeleteManagedEventToDay() {
  yield takeLatest(ITINERARY.DELETE_MANAGED_EVENT_TO_DAY, deleteManagedEventToDay);
}

function* setItineraryToManage({ payload }) {
  const { query: id } = payload;
  const itineraryIdToManage = id.id;
  const itineraries = yield select(selectItineraries);
  const currentUpdatingItinerary = localStore('currentUpdatingItinerary').get();

  const fetchedItineraries = yield call(axiosGet, `/api/itinerary?itinerary_id=${itineraryIdToManage}`);

  const { data } = fetchedItineraries;

  if (!R.isEmpty(currentUpdatingItinerary) && !R.isNil(currentUpdatingItinerary) && currentUpdatingItinerary.itinerary_id === itineraryIdToManage) {
    yield put(itinerary.setManageDayToDays({
      itinerary_id: itineraryIdToManage,
      createdAt: currentUpdatingItinerary.createdAt,
      createdBy: currentUpdatingItinerary.createdBy,
      updatedAt: currentUpdatingItinerary.updatedAt,
      country: currentUpdatingItinerary.country,
      tripInformation: currentUpdatingItinerary.tripInformation,
      tripItinerary: currentUpdatingItinerary.tripItinerary,
      itinerary: currentUpdatingItinerary.itinerary,
    }));

    const userItineraries = yield call(axiosGet, `/api/itineraries/user?userId=${currentUpdatingItinerary.createdBy}`);

    if (userItineraries.status === 200 && userItineraries.data.success) {
      const item = userItineraries.data.itineraries.find(itineraryItem => itineraryItem.itinerary_id === itineraryIdToManage);

      const storedItinerary = R.dissoc('itinerary', currentUpdatingItinerary);

      const itinerariesEquals = R.equals(item, storedItinerary);

      console.log({ item, storedItinerary, itinerariesEquals });
    } else {
      console.log('Not able to load itineraries');
    }
  } else if (R.isEmpty(itineraries) && data.success) {
    const itineraryFiltered = data.itinerary;

    console.log({ itineraryFiltered });

    const { itinerary_id, tripInformation, tripItinerary, createdAt, createdBy, country, updatedAt } = itineraryFiltered;

    const tripInformationFiltered = [
      tripInformation,
    ];

    const itineraryDays = Object.assign({}, [
      ...tripInformationFiltered,
      ...tripItinerary,
    ]);

    yield put(itinerary.setManageDayToDays({
      itinerary_id,
      createdAt,
      createdBy,
      updatedAt,
      country,
      tripInformation,
      tripItinerary,
      itinerary: itineraryDays
    }));
  } else if (!R.isEmpty(itineraries)) {
    const itineraryToManage = itineraries.filter(itinerary => itinerary.itinerary_id === itineraryIdToManage);

    const itineraryFiltered = R.head(itineraryToManage);

    console.log({ itineraryFiltered });

    const { itinerary_id, tripInformation, tripItinerary, createdAt, createdBy, country, updatedAt } = itineraryFiltered;

    const tripInformationFiltered = [
      tripInformation,
    ];

    const itineraryDays = Object.assign({}, [
      ...tripInformationFiltered,
      ...tripItinerary,
    ]);

    yield put(itinerary.setManageDayToDays({
      itinerary_id,
      createdAt,
      createdBy,
      updatedAt,
      country,
      tripInformation,
      tripItinerary,
      itinerary: itineraryDays
    }));
  }
}

function* setOverviewToUpdatingDay({ payload }) {
  const { day, values } = payload;
  const dayToDay = yield select(selectDayToDayToManage);
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);
  const dayToDayList = indexedObjectToArray(dayToDay);

  const currentOverview = dayToDayList[day];

  const currentOverviewUpdated = {
    ...currentOverview,
    ...values,
  };

  dayToDayList[day] = currentOverviewUpdated;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(dayToDayListUpdated),
    itinerary: dayToDayListUpdated,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));
}

function* setEventToUpdatingDay({ payload }) {
  const { event, day, values } = payload;
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);
  const dayToDayList = yield select(selectDayToDayToManage);
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

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(dayToDayListUpdated),
    itinerary: dayToDayListUpdated,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));
}

function* addEventToUpdatingDay({ payload }) {
  const { event, day, name } = payload;
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);
  const dayToDayList = yield select(selectDayToDayToManage);
  const currentDay = dayToDayList[day];
  const currentDayEvents = dayToDayList[day].events;
  const last = lastObjectValue(currentDayEvents);

  const nextEventId = last ? Number(last.id)+1 : 0;

  currentDay.events = {
    ...currentDayEvents,
    [nextEventId]: {
      id: nextEventId,
      type: event,
      name: name,
    },
  };

  currentDay.events = indexedObjectToArray(currentDay.events);

  dayToDayList[day] = currentDay;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(dayToDayListUpdated),
    itinerary: dayToDayListUpdated,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));
}

function* addUpdatingDayToDay() {
  const dayToDayList = yield select(selectDayToDayToManage);
  const last = lastObjectValue(dayToDayList);
  const nextDayId = Number(last.id)+1;
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);

  const newDayToDayList = {
    ...dayToDayList,
    [nextDayId]: {
      id: nextDayId,
      type: 'new-event',
      name: `Day ${nextDayId}`,
      events: [],
    },
  };

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(newDayToDayList),
    itinerary: newDayToDayList,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));
}

function* deleteManagedDayToDay({ payload }) {
  const { day } = payload;
  const dayToDayList = yield select(selectDayToDayToManage);
  const dayToDayListWithRemovedDay = R.dissoc(day, dayToDayList);
  const dayToDayListWithRemovedDayList = indexedObjectToArray(dayToDayListWithRemovedDay);
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);

  const dayToDayListWithRemovedDayUpdated = dayToDayListWithRemovedDayList.map((event, index) => {
    if (Number(event.id) === 0) {
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

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(dayToDayListWithRemovedDayObject),
    itinerary: dayToDayListWithRemovedDayObject,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));

  localStore('lastDayToDayTabSelected').set(0);

  yield put(ui.setDayToDayTab(0));
  yield put(ui.closeModal());
}

function* deleteManagedEventToDay({ payload }) {
  const { event, day } = payload;
  const itinerary_id = yield select(selectDayToDayIdToManage);
  const createdAt = yield select(selectDayToDayCreatedAtToManage);
  const updatedAt = yield select(selectDayToDayUpdatedAtToManage);
  const createdBy = yield select(selectDayToDayCreatedByToManage);
  const country = yield select(selectDayToDayCountryToManage);
  const tripInformation = yield select(selectDayToDayTripInformationToManage);
  const dayToDayList = yield select(selectDayToDayToManage);
  const currentDay = dayToDayList[day];
  const currentDayEvents = dayToDayList[day].events;

  const currentDayEventsUpdated = R.dissoc(event, currentDayEvents);

  const currentDayEventsList = indexedObjectToArray(currentDayEventsUpdated);

  const currentDayEventsUpdatedListUpdated = currentDayEventsList.map((event, index) => ({
    ...event,
    id: index,
  }));

  const currentDayEventsObjectUpdated = Object.assign({}, currentDayEventsUpdatedListUpdated);

  const updatedDayToDayList = R.assocPath(['events'], currentDayEventsObjectUpdated, currentDay);

  dayToDayList[day] = updatedDayToDayList;

  const dayToDayListUpdated = Object.assign({}, dayToDayList);

  const itineraryUpdatedStored = {
    itinerary_id,
    createdAt,
    updatedAt,
    createdBy,
    country,
    tripInformation,
    tripItinerary: indexedObjectToArray(dayToDayListUpdated),
    itinerary: dayToDayListUpdated,
  };

  localStore('currentUpdatingItinerary').set(itineraryUpdatedStored);

  yield put(itinerary.setManageDayToDays(itineraryUpdatedStored));
  yield put(ui.closeEventDrawer());
}
