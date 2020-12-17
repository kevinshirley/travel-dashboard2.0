import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { selectAddCustomerSuccess, selectAddCustomerIsSubmitting, selectAddCustomerError } from 'src/store/selectors/forms';

const emptyObject = {};

export const selectCustomer = R.pathOr(emptyObject, ['customer']);
export const selectUserCustomers = R.pathOr(emptyObject, ['customers', 'userCustomers']);

export default createStructuredSelector({
  addCustomerSuccess: selectAddCustomerSuccess,
  isSubmitting: selectAddCustomerIsSubmitting,
  addCustomerError: selectAddCustomerError,
  userCustomers: selectUserCustomers,
});
