import { ITINERARY } from 'src/store/actions';

const ItinerariesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ITINERARY.SET_ITINERARIES:
      return payload.itineraries;
    default:
      return state;
  }
}

export default ItinerariesReducer;
