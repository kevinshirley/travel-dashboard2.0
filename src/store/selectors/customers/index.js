import { pathOr, isEmpty, takeLast, reverse } from 'ramda';
import { createStructuredSelector, createSelector } from 'reselect';
import { selectAddCustomerSuccess, selectAddCustomerIsSubmitting, selectAddCustomerError } from 'src/store/selectors/forms';

const emptyObject = {};
const emptyArray = [];

export const selectCustomer = pathOr(emptyObject, ['customer']);
export const selectUserCustomers = pathOr(emptyObject, ['customers', 'userCustomers']);
export const selectCustomerId = pathOr(emptyObject, ['customer', 'id']);

export const selectCustomerNotes = createSelector(
  selectCustomer,
  customer => pathOr(emptyArray, ['notes'], customer),
);

export const selectLimitedCustomerNotes = createSelector(
  selectCustomerNotes,
  customerNotes => {
    if (isEmpty(customerNotes)) return emptyArray;
    return reverse(takeLast(3, customerNotes));
  },
);

export default createStructuredSelector({
  addCustomerSuccess: selectAddCustomerSuccess,
  isSubmitting: selectAddCustomerIsSubmitting,
  addCustomerError: selectAddCustomerError,
  userCustomers: selectUserCustomers,
});
