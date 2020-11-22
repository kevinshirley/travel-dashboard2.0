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

export default function ManageItineraryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ITINERARY.SET_MANAGE_DAY_TO_DAYS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
