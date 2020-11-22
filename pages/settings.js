import { connect } from 'react-redux';
import SettingsPage from 'src/components/settings';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(SettingsPage);
