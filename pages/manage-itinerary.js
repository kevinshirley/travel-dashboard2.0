import { connect } from 'react-redux';
import ManageItineraryPage from 'src/components/manage-itinerary';
import storeConnector from 'src/store/selectors/manage-itinerary';
import * as actions from 'src/store/actions';

const actionsCreators = {
  setIncluded: actions.itinerary.setIncluded,
  openStartDateCalendar: actions.ui.openStartDateCalendar,
  closeStartDateCalendar: actions.ui.closeStartDateCalendar,
  openNewEventList: actions.ui.openNewEventList,
  closeNewEventList: actions.ui.closeNewEventList,
  uploadCoverImage: actions.itinerary.uploadCoverImage,
  setPriceType: actions.itinerary.setPriceType,
  addEventToDay: actions.itinerary.addEventToDay,
  openEditEventPanel: actions.ui.openEditEventPanel,
  closeEditEventPanel: actions.ui.closeEditEventPanel,
  toggleEditStartDate: actions.itinerary.toggleEditStartDate,
  openModal: actions.ui.openModal,
  setItineraries: actions.itinerary.setItineraries,
  addEventToUpdatingDay: actions.itinerary.addEventToUpdatingDay,
};

export default connect(
  storeConnector,
  actionsCreators,
)(ManageItineraryPage);
