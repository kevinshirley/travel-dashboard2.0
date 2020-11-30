import * as R from 'ramda';
import { ITINERARY, itinerary } from 'src/store/actions';
import { takeLatest, select, put, call } from 'redux-saga/effects';
import { selectItineraries } from '/src/store/selectors/itineraries';
import { axiosGet } from 'src/utils/fetch';
import { localStore } from 'src/utils/storage';

export function* watchSetItineraryToDisplay() {
  yield takeLatest(ITINERARY.SET_ITINERARY_TO_DISPLAY, setItineraryToDisplay);
}

function* setItineraryToDisplay({ payload }) {
  const { query: id } = payload;
  const itineraryIdToManage = id.id;
  const itineraries = yield select(selectItineraries);
  const currentDisplayedItinerary = localStore('currentDisplayedItinerary').get();

  const fetchedItineraries = yield call(axiosGet, `/api/itinerary?itinerary_id=${itineraryIdToManage}`);

  const { data } = fetchedItineraries;

  if (!R.isEmpty(currentDisplayedItinerary) && !R.isNil(currentDisplayedItinerary) && currentDisplayedItinerary.itinerary_id === itineraryIdToManage) {
    yield put(itinerary.setDisplayedDayToDays({
      itinerary_id: itineraryIdToManage,
      createdAt: currentDisplayedItinerary.createdAt,
      createdBy: currentDisplayedItinerary.createdBy,
      updatedAt: currentDisplayedItinerary.updatedAt,
      country: currentDisplayedItinerary.country,
      tripInformation: currentDisplayedItinerary.tripInformation,
      tripItinerary: currentDisplayedItinerary.tripItinerary,
      itinerary: currentDisplayedItinerary.itinerary,
    }));
  } else if (R.isEmpty(itineraries) && data.success) {
    const itineraryFiltered = data.itinerary;

    const { itinerary_id, tripInformation, tripItinerary, createdAt, createdBy, country, updatedAt } = itineraryFiltered;

    const tripInformationFiltered = [
      tripInformation,
    ];

    const itineraryDays = Object.assign({}, [
      ...tripInformationFiltered,
      ...tripItinerary,
    ]);

    const itineraryDisplayed = {
      itinerary_id,
      createdAt,
      createdBy,
      updatedAt,
      country,
      tripInformation,
      tripItinerary,
      itinerary: itineraryDays
    };

    localStore('currentDisplayedItinerary').set(itineraryDisplayed);

    yield put(itinerary.setDisplayedDayToDays(itineraryDisplayed));
  } else if (!R.isEmpty(itineraries)) {
    const itineraryToManage = itineraries.filter(itinerary => itinerary.itinerary_id === itineraryIdToManage);

    const itineraryFiltered = R.head(itineraryToManage);

    const { itinerary_id, tripInformation, tripItinerary, createdAt, createdBy, country, updatedAt } = itineraryFiltered;

    const tripInformationFiltered = [
      tripInformation,
    ];

    const itineraryDays = Object.assign({}, [
      ...tripInformationFiltered,
      ...tripItinerary,
    ]);

    const itineraryDisplayed = {
      itinerary_id,
      createdAt,
      createdBy,
      updatedAt,
      country,
      tripInformation,
      tripItinerary,
      itinerary: itineraryDays
    };

    localStore('currentDisplayedItinerary').set(itineraryDisplayed);

    yield put(itinerary.setDisplayedDayToDays(itineraryDisplayed));
  }
}
