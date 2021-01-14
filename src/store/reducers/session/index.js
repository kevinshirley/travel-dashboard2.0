import { SESSION } from 'src/store/actions';

const SessionReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SESSION.SET_IS_LOGGED_IN:
      return {
        isLoggedIn: payload.success,
        username: payload.username,
        id: payload.sub,
        ...payload,
      };
    default:
      return state;
  }
}

export default SessionReducer;
