import { combineReducers } from 'redux';
import { FORMS } from 'src/store/actions';

const initialState = {
  isSubmitting: false,
  error: {},
  success: {},
};

function signIn(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'signIn') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'signIn') {
        return {
          ...state,
          isSubmitting,
        };
      }
    default:
      return state;
  }
}

function signUp(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'signUp') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.SET_SUCCESS:
      if (form === 'signUp') {
        return {
          ...state,
          success: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'signUp') {
        return {
          ...state,
          isSubmitting,
        };
      }
    default:
      return state;
  }
}

function itineraries(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'itineraries') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'itineraries') {
        return {
          ...state,
          isSubmitting,
        };
      }
    case FORMS.SET_SUCCESS:
      if (form === 'itineraries') {
        return {
          ...state,
          success: {
            message,
          },
        };
      }
    case FORMS.RESET_SUCCESS:
      if (form === 'itineraries') {
        return {
          ...state,
          success: {},
        };
      }
    default:
      return state;
  }
}

function addItinerary(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'addItinerary') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'addItinerary') {
        return {
          ...state,
          isSubmitting,
        };
      }
    case FORMS.SET_SUCCESS:
      if (form === 'addItinerary') {
        return {
          ...state,
          success: {
            message,
          },
        };
      }
    default:
      return state;
  }
}

function manageItinerary(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'manageItinerary') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'manageItinerary') {
        return {
          ...state,
          isSubmitting,
        };
      }
    case FORMS.SET_SUCCESS:
      if (form === 'manageItinerary') {
        return {
          ...state,
          success: {
            message,
          },
        };
      }
    default:
      return state;
  }
}

function addCustomer(state = initialState, { type, payload }) {
  const { form, message, isSubmitting } = payload || {};
  switch (type) {
    case FORMS.SET_ERROR:
      if (form === 'addCustomer') {
        return {
          ...state,
          error: {
            message,
          },
        };
      }
    case FORMS.IS_SUBMITTING:
      if (form === 'addCustomer') {
        return {
          ...state,
          isSubmitting,
        };
      }
    case FORMS.SET_SUCCESS:
      if (form === 'addCustomer') {
        return {
          ...state,
          success: {
            message,
          },
        };
      }
    case FORMS.RESET_SUCCESS:
      if (form === 'addCustomer') {
        return {
          ...state,
          success: {},
        };
      }
    default:
      return state;
  }
}

export default combineReducers({
  signIn,
  signUp,
  itineraries,
  addItinerary,
  manageItinerary,
  addCustomer,
});
