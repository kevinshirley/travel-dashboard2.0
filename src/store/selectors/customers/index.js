import { pathOr, isEmpty, takeLast, reverse } from 'ramda';
import { createStructuredSelector, createSelector } from 'reselect';
import {
  selectAddCustomerSuccess,
  selectAddCustomerIsSubmitting,
  selectAddCustomerError,
  selectAddCustomerNoteSuccess,
  selectAddCustomerNoteError,
  selectAddCustomerNoteIsSubmitting,
} from 'src/store/selectors/forms';

const emptyObject = {};
const emptyArray = [];
const limitedCustomerNotesAmount = 3;

export const selectCustomer = pathOr(emptyObject, ['customer']);
export const selectUserCustomers = pathOr(emptyArray, ['customers', 'userCustomers']);
export const selectCustomerId = pathOr(emptyObject, ['customer', 'id']);

export const selectCustomerNotes = createSelector(
  selectCustomer,
  customer => pathOr(emptyArray, ['notes'], customer),
);

export const selectLimitedCustomerNotes = createSelector(
  selectCustomerNotes,
  customerNotes => {
    if (isEmpty(customerNotes)) return emptyArray;
    return reverse(takeLast(limitedCustomerNotesAmount, customerNotes));
  },
);

export const selectIsCustomerNotesMoreThanLimited = createSelector(
  selectCustomerNotes,
  customerNotes => {
    if (isEmpty(customerNotes)) return false;
    return customerNotes.length > limitedCustomerNotesAmount;
  },
);

export default createStructuredSelector({
  addCustomerSuccess: selectAddCustomerSuccess,
  isSubmitting: selectAddCustomerIsSubmitting,
  addCustomerError: selectAddCustomerError,
  userCustomers: selectUserCustomers,
  addCustomerNoteSuccess: selectAddCustomerNoteSuccess,
  addCustomerNoteError: selectAddCustomerNoteError,
  addCustomerNoteIsSubmitting: selectAddCustomerNoteIsSubmitting,
});
