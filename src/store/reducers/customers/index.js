import { CUSTOMERS } from 'src/store/actions';

const initialState = {
  organizationUsers: [],
  userCustomers: [],
};

const CustomersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CUSTOMERS.SET_USER:
      return {
        ...state,
        userCustomers: payload,
      };
    default:
      return state;
  }
}

export default CustomersReducer;
