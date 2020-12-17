import { CUSTOMER } from 'src/store/actions';

const initialState = {
  organizationUsers: {},
  userCustomers: {},
};

const CustomersReducer = (state = initialState, { type, payload }) => {
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

export default CustomersReducer;
