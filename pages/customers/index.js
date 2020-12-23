import { connect } from 'react-redux';
import CustomersPage from 'src/components/customers';
import storeConnector from 'src/store/selectors/customers';
import * as actions from 'src/store/actions';

const actionCreators = {
  resetSuccess: actions.forms.resetSuccess,
  resetError: actions.forms.resetError,
};

export default connect(
  storeConnector,
  actionCreators,
)(CustomersPage);
