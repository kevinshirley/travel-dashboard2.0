import { connect } from 'react-redux';
import NewInvoicePage from 'src/components/new-invoice';
import storeConnector from 'src/store/selectors/customers';
import * as actions from 'src/store/actions';

const actionCreators = {
  resetSuccess: actions.forms.resetSuccess,
  resetError: actions.forms.resetError,
};

export default connect(
  storeConnector,
  actionCreators,
)(NewInvoicePage);
