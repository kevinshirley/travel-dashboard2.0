import { ITINERARY } from 'src/store/actions';

const initialState = {
  itinerary_id: '',
  createdAt: '',
  updatedAt: '',
  createdBy: '',
  country: '',
  tripInformation: {},
  tripItinerary: [],
};

export default function DisplayedItineraryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ITINERARY.SET_DISPLAY_DAY_TO_DAYS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
