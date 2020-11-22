import { connect } from 'react-redux';
import SearchHistoryPage from 'src/components/search-history';
import storeConnector from 'src/store/selectors/common';
import * as actions from 'src/store/actions';

export default connect(
  storeConnector,
  {},
)(SearchHistoryPage);
