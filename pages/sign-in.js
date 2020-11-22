import { connect } from 'react-redux';
import SignIn from 'src/components/sign-in';
import storeConnector from 'src/store/selectors/session';
import * as actions from 'src/store/actions';

const actionsCreators = {
  signIn: actions.session.signIn,
};

export default connect(
  storeConnector,
  actionsCreators,
)(SignIn);
