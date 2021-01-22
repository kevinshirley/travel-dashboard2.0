import { SESSION } from 'src/store/actions';

const initialState = {
  profile: {},
};

const SessionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SESSION.SET_IS_LOGGED_IN:
      return {
        ...state,
      };
    case SESSION.SET_PROFILE:
      return {
        ...state,
        profile: {
          ...payload,
        },
      };
    default:
      return state;
  }
}

export default SessionReducer;
