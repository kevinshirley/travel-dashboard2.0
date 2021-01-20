import { SESSION } from 'src/store/actions';

const initialState = {
  provisionalUser: {},
};

const SessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION.SET_IS_LOGGED_IN:
      return {
        ...payload,
      };
    case SESSION.SET_PROVISIONAL_USER:
      return {
        ...payload,
        provisionalUser: payload,
      };
    default:
      return state;
  }
}

export default SessionReducer;
