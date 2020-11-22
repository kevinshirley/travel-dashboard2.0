import { connect } from 'react-redux';
import ReportsPage from 'src/components/reports';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(ReportsPage);
