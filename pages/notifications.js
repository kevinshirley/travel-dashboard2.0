import { connect } from 'react-redux';
import NotificationsPage from 'src/components/notifications';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(NotificationsPage);
