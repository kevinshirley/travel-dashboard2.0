import * as R from 'ramda';

const emptyObject = {};

export const selectsignInError = R.pathOr(emptyObject, [
  'forms',
  'signIn',
  'error',
]);

export const selectsignUpError = R.pathOr(emptyObject, [
  'forms',
  'signUp',
  'error',
]);

export const selectSignUpSuccess = R.pathOr(emptyObject, [
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

export const selectAddItinerarySuccess = R.pathOr(emptyObject, [
  'forms',
  'addItinerary',
  'success',
]);

export const selectAddItineraryError = R.pathOr(emptyObject, [
  'forms',
  'addItinerary',
  'error',
]);

export const selectAddItineraryIsSubmitting = R.pathOr(emptyObject, [
  'forms',
  'addItinerary',
  'isSubmitting',
]);

export const selectManageItinerarySuccess = R.pathOr(emptyObject, [
  'forms',
  'manageItinerary',
  'success',
]);

export const selectManageItineraryError = R.pathOr(emptyObject, [
  'forms',
  'manageItinerary',
  'error',
]);

export const selectManageItineraryIsSubmitting = R.pathOr(emptyObject, [
  'forms',
  'manageItinerary',
  'isSubmitting',
]);

export const selectItinerariesSuccess = R.pathOr(emptyObject, [
  'forms',
  'itineraries',
  'success',
]);

export const selectItinerariesIsSubmitting = R.pathOr(false, [
  'forms',
  'itineraries',
  'isSubmitting',
]);

export const selectAddCustomerSuccess = R.pathOr(emptyObject, [
  'forms',
  'addCustomer',
  'success',
]);

export const selectAddCustomerIsSubmitting = R.pathOr(false, [
  'forms',
  'addCustomer',
  'isSubmitting',
]);

export const selectAddCustomerError = R.pathOr(emptyObject, [
  'forms',
  'addCustomer',
  'error',
]);

export const selectAddCustomerNoteSuccess = R.pathOr(emptyObject, [
  'forms',
  'addCustomerNote',
  'success',
]);

export const selectAddCustomerNoteError = R.pathOr(emptyObject, [
  'forms',
  'addCustomerNote',
  'error',
]);

export const selectAddCustomerNoteIsSubmitting = R.pathOr(false, [
  'forms',
  'addCustomerNote',
  'isSubmitting',
]);

export const selectAddInvoiceIsSubmitting = R.pathOr(false, [
  'forms',
  'addInvoice',
  'isSubmitting',
]);

export const selectAddInvoiceSuccess = R.pathOr(emptyObject, [
  'forms',
  'addInvoice',
  'success',
]);

export const selectAddInvoiceError = R.pathOr(emptyObject, [
  'forms',
  'addInvoice',
  'error',
]);
