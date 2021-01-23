import { connect } from 'react-redux';
import HomePage from 'src/components/home';
import storeConnector from 'src/store/selectors/common';

export default connect(
  storeConnector,
  {},
)(HomePage);
