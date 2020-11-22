import { connect } from 'react-redux';
import HomePage from 'src/components/home';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(HomePage);
