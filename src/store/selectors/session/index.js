import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

export const selectIsLoggedIn = R.pathOr(false, [
  'session',
  'isLoggedIn',
]);

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

export const selectSessionProfile = R.pathOr({}, [
  'session',
  'profile',
]);

export default createStructuredSelector({
  signInError: selectsignInError,
  signUpError: selectsignUpError,
  signUpSuccess: selectSignUpSuccess,
  profile: selectSessionProfile,
});
