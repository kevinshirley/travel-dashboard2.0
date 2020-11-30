import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

const emptyObject = {};

const selectDayToDayToManage = R.pathOr(emptyObject, [
  'displayItinerary',
  'itinerary',
]);

const selectOverviewCoverImage = createSelector(
  selectDayToDayToManage,
  dayToDayList => dayToDayList && dayToDayList[0] && dayToDayList[0].coverImage ? dayToDayList[0].coverImage : emptyObject,
);

export default createStructuredSelector({
  coverImage: selectOverviewCoverImage,
  dayToDayList: selectDayToDayToManage,
});
