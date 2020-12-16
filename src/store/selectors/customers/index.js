import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';
import { selectAddCustomerSuccess, selectAddCustomerIsSubmitting } from 'src/store/selectors/forms';

const emptyObject = {};

export const selectCustomer = R.pathOr(emptyObject, ['customer']);

export default createStructuredSelector({
  addCustomerSuccess: selectAddCustomerSuccess,
  isSubmitting: selectAddCustomerIsSubmitting,
});
