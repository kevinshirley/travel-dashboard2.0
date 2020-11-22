import { combineReducers } from 'redux';
import { DESTINATIONS } from 'src/store/actions';

function allDestinations(state = null, { type, payload }) {
  switch (type) {
    case DESTINATIONS.SET_DESTINATIONS:
      return payload;
    default:
      return state;
  }
}

function destination(state = null, { type, payload }) {
  switch (type) {
    case DESTINATIONS.SET_DESTINATION:
      return payload;
    default:
      return state;
  }
}

export default combineReducers({
  allDestinations,
  destination,
});
