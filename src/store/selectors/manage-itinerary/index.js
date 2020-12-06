import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { 
  selectIsStartDateCalendarOpened, 
  selectDayToDayTab,
  selectIsNewEventListOpened,
  selectIsEventDrawerOpened,
  selectIsEditingTripStartDate,
} from 'src/store/selectors/common';

const emptyString = '';
const emptyObject = {};

export const selectTripStartDate = R.pathOr(emptyString, [
  'addItinerary',
  'tripStartDate',
]);

const selectPriceType = R.pathOr(emptyString, [
  'addItinerary',
  'priceType',
]);

export const selectDayToDayToManage = R.pathOr(emptyObject, [
  'manageItinerary',
  'itinerary',
]);

export const selectDayToDayIdToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'itinerary_id',
]);

export const selectDayToDayCreatedAtToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'createdAt',
]);

export const selectDayToDayUpdatedAtToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'updatedAt',
]);

export const selectDayToDayCreatedByToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'createdBy',
]);

export const selectDayToDayCountryToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'country',
]);

export const selectDayToDayTripInformationToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'tripInformation',
]);

export const selectDayToDayTripItineraryToManage = R.pathOr(emptyString, [
  'manageItinerary',
  'tripItinerary',
]);

export const selectDayToDayList = createSelector(
  selectDayToDayToManage,
  dayToDayList => dayToDayList,
);

export const selectOverviewCoverImage = createSelector(
  selectDayToDayToManage,
  dayToDayList => dayToDayList && dayToDayList[0] && dayToDayList[0].coverImage ? dayToDayList[0].coverImage : emptyObject,
);

export const selectOverviewTripStartDate = createSelector(
  selectDayToDayToManage,
  dayToDayList => {
    // return dayToDayList && dayToDayList[0] ? dayToDayList[0].tripStartDate : emptyString;
    return '';
  },
);

export const selectTripOverview = createSelector(
  selectDayToDayToManage,
  dayToDayList => dayToDayList && dayToDayList[0] ? dayToDayList[0] : emptyObject,
);

export default createStructuredSelector({
  tripStartDate: selectTripStartDate,
  isStartDateCalendarOpened: selectIsStartDateCalendarOpened,
  coverImage: selectOverviewCoverImage,
  priceType: selectPriceType,
  dayToDayTab: selectDayToDayTab,
  dayToDayList: selectDayToDayToManage,
  isNewEventListOpened: selectIsNewEventListOpened,
  isEventDrawerOpened: selectIsEventDrawerOpened,
  tripOverview: selectTripOverview,
  isEditingTripStartDate: selectIsEditingTripStartDate,
  overviewTripStartDate: selectOverviewTripStartDate,
  managedItineraryId: selectDayToDayIdToManage,
});
