import { connect } from 'react-redux';
import CustomersPage from 'src/components/customers';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(CustomersPage);
