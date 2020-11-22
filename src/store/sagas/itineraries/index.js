import * as R from 'ramda';
import { takeLatest, select, call, put } from 'redux-saga/effects';
import { itinerary, SESSION, forms, ITINERARY } from 'src/store/actions';
import { axiosGet, axiosPost } from 'src/utils/fetch';
import { selectSessionProfile } from 'src/store/selectors/session';
import { selectItineraries } from 'src/store/selectors/itineraries';

export function* watchFetchItineraries() {
  yield takeLatest(SESSION.SET_IS_LOGGED_IN, fetchItineraries);
}

export function* watchDeleteUserItinerary() {
  yield takeLatest(ITINERARY.DELETE_USER_ITINERARY, deleteUserItinerary);
}

function* fetchItineraries() {
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (!R.isEmpty(id) && !R.isNil(id)) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'itineraries' }));

    const userItineraries = yield call(axiosGet, `/api/itineraries/user?userId=${id}`);

    if (userItineraries.status === 200 && userItineraries.data.success) {
      yield put(itinerary.setItineraries(userItineraries.data));

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'itineraries' }));
    } else {
      yield put(itinerary.setItineraries([]));

      yield put(forms.isSubmitting({ isSubmitting: false, form: 'itineraries' }));
    }
  } else {
    console.log('Please sign in to fetch your itineraries');

    yield put(forms.isSubmitting({ isSubmitting: false, form: 'itineraries' }));
  }
}

function* deleteUserItinerary({ payload }) {
  const itineraryID = R.head(payload);
  const profile = yield select(selectSessionProfile);
  const itineraries = yield select(selectItineraries);
  const { id } = profile;

  const currentItinerary = itineraries.find(i => i.itinerary_id === itineraryID);

  const data = {
    createdBy: id,
    itinerary_id: itineraryID,
    country: currentItinerary.country,
  };

  yield put(forms.isSubmitting({ isSubmitting: true, form: 'itineraries' }));

  const result = yield call(axiosPost, '/api/itineraries/user/delete', data);

  const success = R.pathOr({}, ['data', 'success'], result);

  if (success) {
    const userItineraries = yield call(axiosGet, `/api/itineraries/user?userId=${id}`);

    if (userItineraries.status === 200 && userItineraries.data.success) {
      yield put(itinerary.setItineraries(userItineraries.data));
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'itineraries' }));
      yield put(forms.setSuccess({ message: 'You\'ve successfully removed this itinerary', form: 'itineraries' }));
    }
  } else {
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'itineraries' }));
  }
}
