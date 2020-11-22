import { connect } from 'react-redux';
import SignUp from 'src/components/sign-up';
import storeConnector from 'src/store/selectors/session';
import * as actions from 'src/store/actions';

const actionsCreators = {
  signUp: actions.session.signUp,
};

export default connect(
  storeConnector,
  actionsCreators,
)(SignUp);
