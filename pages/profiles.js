import { connect } from 'react-redux';
import ProfilesPage from 'src/components/profiles';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(ProfilesPage);
