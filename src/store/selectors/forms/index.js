import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';

export const selectsignInError = R.pathOr({}, [
  'forms',
  'signIn',
  'error',
]);

export const selectsignUpError = R.pathOr({}, [
  'forms',
  'signUp',
  'error',
]);

export const selectSignUpSuccess = R.pathOr({}, [
  'forms',
  'signUp',
  'success',
]);

export const selectSignUpIsSubmitting = R.pathOr(false, [
  'forms',
  'signUp',
  'isSubmitting',
]);

export const selectSignInIsSubmitting = R.pathOr(false, [
  'forms',
  'signIn',
  'isSubmitting',
]);

export const selectAddItinerarySuccess = R.pathOr({}, [
  'forms',
  'addItinerary',
  'success',
]);

export const selectAddItineraryError = R.pathOr({}, [
  'forms',
  'addItinerary',
  'error',
]);

export const selectAddItineraryIsSubmitting = R.pathOr({}, [
  'forms',
  'addItinerary',
  'isSubmitting',
]);

export const selectManageItinerarySuccess = R.pathOr({}, [
  'forms',
  'manageItinerary',
  'success',
]);

export const selectManageItineraryError = R.pathOr({}, [
  'forms',
  'manageItinerary',
  'error',
]);

export const selectManageItineraryIsSubmitting = R.pathOr({}, [
  'forms',
  'manageItinerary',
  'isSubmitting',
]);

export const selectItinerariesSuccess = R.pathOr({}, [
  'forms',
  'itineraries',
  'success',
]);

export const selectItinerariesIsSubmitting = R.pathOr(false, [
  'forms',
  'itineraries',
  'isSubmitting',
]);
