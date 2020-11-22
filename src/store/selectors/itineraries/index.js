import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { selectItinerariesSuccess, selectItinerariesIsSubmitting } from 'src/store/selectors/forms';

export const selectItineraries = R.propOr([], 'itineraries');

export default createStructuredSelector({
  itineraries: selectItineraries,
  isSubmitting: selectItinerariesIsSubmitting,
  itinerariesSuccess: selectItinerariesSuccess,
});
