import * as R from 'ramda';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from 'src/utils/fetch';
import { indexedObjectToArray } from 'src/utils/object';
import { DESTINATIONS, destinations } from 'src/store/actions';
import { selectDestinations } from 'src/store/selectors/destinations';

export function* watchGetDestinations() {
  yield takeLatest(DESTINATIONS.GET_DESTINATIONS, getDestinations);
}

export function* watchGetDestination() {
  yield takeLatest(DESTINATIONS.GET_DESTINATION, getDestination);
}

function* getDestinations() {
  const data = yield call(get, '/api/destinations');
  yield put(destinations.setDestinations(data));
}

function* getDestination(data) {
  const { continent } = data.payload;
  const allDestinationsObject = yield select(selectDestinations);
  const allDestinations = indexedObjectToArray(allDestinationsObject);
  const destination = R.filter(item => item.continent === continent, allDestinations);
  yield put(destinations.setDestination(destination[0]));
}
