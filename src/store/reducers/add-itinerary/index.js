import { propOr } from 'ramda';
import { ITINERARY } from 'src/store/actions';

const initialState = {
  coverImage: {},
  tripStartDate: '',
  location: '',
  country: '',
  priceType: '',
  pageUrl: '',
  included: [],
  overview: '',
  dayToDay: {
    0: {
      id: 0,
      name: 'Overview',
      type: 'trip-information',
      tripStartDate: '',
    },
  },
};

export default function AddItineraryReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ITINERARY.SET_INCLUDED:
      return {
        ...state,
        included: payload,
      };
    case ITINERARY.SET_TRIP_START_DATE:
      return {
        ...state,
        tripStartDate: payload,
      };
    case ITINERARY.SET_COVER_IMAGE:
      return {
        ...state,
        coverImage: payload,
      };
    case ITINERARY.SET_OVERVIEW_COVER_IMAGE:
      const coverImage = propOr({}, 'coverImage', state);
      const dayToDay = propOr({}, 'dayToDay', state);

      return {
        ...state,
        dayToDay: {
          ...dayToDay,
          0: {
            ...dayToDay[0],
            coverImage,
          },
        },
      };
    case ITINERARY.SET_PRICE_TYPE:
      return {
        ...state,
        priceType: payload,
      };
    case ITINERARY.SET_DAY_TO_DAYS:
      return {
        ...state,
        dayToDay: payload,
      };
    default:
      return state;
  }
};
