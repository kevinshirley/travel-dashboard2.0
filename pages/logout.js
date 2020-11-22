import { connect } from 'react-redux';
import LogoutPage from 'src/components/logout';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(LogoutPage);
