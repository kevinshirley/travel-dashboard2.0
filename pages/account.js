import { connect } from 'react-redux';
import AccountPage from 'src/components/account';
import storeConnector from 'src/store/selectors/session';
import * as actions from 'src/store/actions';

const actionsCreators = {
  logout: actions.session.logout,
};

export default connect(
  storeConnector,
  actionsCreators,
)(AccountPage);
