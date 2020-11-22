import { connect } from 'react-redux';
import AddItineraryPage from 'src/components/add-itinerary';
import storeConnector from 'src/store/selectors/add-itinerary';
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
};

export default connect(
  storeConnector,
  actionsCreators,
)(AddItineraryPage);
