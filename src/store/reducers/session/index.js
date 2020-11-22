import { SESSION } from 'src/store/actions';

const SessionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SESSION.SET_IS_LOGGED_IN:
      return {
        isLoggedIn: payload.success,
        username: payload.data.username,
        ...payload,
      };
    default:
      return state;
  }
}

export default SessionReducer;
