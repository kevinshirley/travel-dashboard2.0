import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

export const selectDestinations = R.pathOr('', [
  'destinations',
  'allDestinations',
]);

export const selectDestination = R.pathOr('', [
  'destinations',
  'destination',
]);

export default createStructuredSelector({
  destinations: selectDestinations,
  destination: selectDestination,
});
