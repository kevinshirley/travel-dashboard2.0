import { CUSTOMER } from 'src/store/actions';

const CustomerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CUSTOMER.SET:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export default CustomerReducer;
