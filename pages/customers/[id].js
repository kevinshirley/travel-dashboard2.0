import { connect } from 'react-redux';
import CustomerProfilePage from 'src/components/customer-profile';
import storeConnector from 'src/store/selectors/customer-profile';
import * as actions from 'src/store/actions';

const actionCreators = {
  setCustomerOnInit: actions.customer.setCustomerOnInit,
};

export default connect(
  storeConnector,
  actionCreators,
)(CustomerProfilePage);
