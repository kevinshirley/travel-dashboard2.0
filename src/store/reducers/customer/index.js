import { CUSTOMER } from 'src/store/actions';

const CustomerReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CUSTOMER.SET:
      return {
        ...payload,
      };
    case CUSTOMER.CLOSE_CUSTOMER_SIDE_MENU:
      return {};
    default:
      return state;
  }
}

export default CustomerReducer;
