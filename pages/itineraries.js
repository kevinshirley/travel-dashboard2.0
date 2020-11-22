import { connect } from 'react-redux';
import ItinerariesPage from 'src/components/itineraries';
import storeConnector from 'src/store/selectors/itineraries';
import * as actions from 'src/store/actions';

const actionsCreators = {
  setItineraries: actions.itinerary.setItineraries,
  deleteItinerary: actions.itinerary.deleteUserItinerary,
  resetItinerariesTable: actions.ui.resetItinerariesTable,
  resetSuccess: actions.forms.resetSuccess,
};

export default connect(
  storeConnector,
  actionsCreators,
)(ItinerariesPage);
