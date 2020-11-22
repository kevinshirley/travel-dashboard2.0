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

export const selectDayToDay = R.pathOr(emptyString, [
  'addItinerary',
  'dayToDay',
]);

export const selectDayToDayList = createSelector(
  selectDayToDay,
  dayToDayList => dayToDayList,
);

export const selectOverviewCoverImage = createSelector(
  selectDayToDay,
  dayToDayList => dayToDayList && dayToDayList[0] && dayToDayList[0].coverImage ? dayToDayList[0].coverImage : emptyObject,
);

export const selectOverviewTripStartDate = createSelector(
  selectDayToDay,
  dayToDayList => {
    const test = R.pathOr(emptyString, [0, 'tripStartDate'], dayToDayList);
    // const test = R.pathOr(emptyString, [0], dayToDayList);
    // console.log({ overviewTripStartDate: dayToDayList[0].tripStartDate, dayToDayList: dayToDayList[0] });
    // return dayToDayList && dayToDayList[0] ? dayToDayList[0].tripStartDate : emptyString;
    return dayToDayList && dayToDayList[0].tripStartDate ? dayToDayList[0].tripStartDate : emptyString;
  },
);

export const selectTripOverview = createSelector(
  selectDayToDay,
  dayToDayList => dayToDayList && dayToDayList[0] ? dayToDayList[0] : emptyObject,
);

export default createStructuredSelector({
  tripStartDate: selectTripStartDate,
  isStartDateCalendarOpened: selectIsStartDateCalendarOpened,
  coverImage: selectOverviewCoverImage,
  priceType: selectPriceType,
  dayToDayTab: selectDayToDayTab,
  dayToDayList: selectDayToDay,
  isNewEventListOpened: selectIsNewEventListOpened,
  isEventDrawerOpened: selectIsEventDrawerOpened,
  tripOverview: selectTripOverview,
  isEditingTripStartDate: selectIsEditingTripStartDate,
  overviewTripStartDate: selectOverviewTripStartDate,
});
