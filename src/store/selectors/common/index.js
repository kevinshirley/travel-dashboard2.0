import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';

export const selectIsModalOpened = R.pathOr('', [
  'ui',
  'isModalOpened',
]);

const selectIsMenuOpened = R.pathOr('', [
  'ui',
  'isMenuOpened',
]);

export const selectIsStartDateCalendarOpened = R.pathOr('', [
  'ui',
  'isStartDateCalendarOpened',
]);

export const selectDayToDayTab = R.pathOr('', [
  'ui',
  'dayToDayTab',
]);

export const selectIsNewEventListOpened = R.pathOr('', [
  'ui',
  'isNewEventListOpened',
]);

export const selectIsEditEventPanelOpened = R.pathOr('', [
  'ui',
  'isEditEventPanelOpened',
]);

export const selectIsEventDrawerOpened = R.pathOr('', [
  'ui',
  'isEventDrawerOpened',
]);

export const selectIsEditingTripStartDate = R.pathOr('', [
  'ui',
  'isEditingTripStartDate',
]);

export const selectModalUi = R.pathOr('', [
  'ui',
  'modalUi',
]);

export const selectModalUiPayload = R.pathOr({}, [
  'ui',
  'modalUiPayload',
]);

export const selectShouldResetItinerariesTable = R.pathOr(false, [
  'ui',
  'shouldResetItinerariesTable',
]);

export const selectIsCustomerSideMenu = R.pathOr(false, [
  'ui',
  'isCustomerSideMenu',
]);

export const selectIsSideMenuMinimized = R.pathOr(false, [
  'ui',
  'isSideMenuMinimized',
]);

export default createStructuredSelector({
  isModalOpened: selectIsModalOpened,
  isMenuOpened: selectIsMenuOpened,
  isEditEventPanelOpened: selectIsEditEventPanelOpened,
});
