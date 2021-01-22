import { SESSION } from 'src/store/actions';

const SessionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SESSION.SET_IS_LOGGED_IN:
      return {
        ...state,
      };
    case SESSION.SET_PROFILE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default SessionReducer;
