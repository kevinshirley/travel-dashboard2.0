import { createStructuredSelector, createSelector } from 'reselect';
import { pathOr, reverse, isEmpty } from 'ramda';
import { selectCustomerNotes } from 'src/store/selectors/customers';

const emptyObject = {};
const emptyArray = [];

export const selectCustomer = pathOr(emptyObject, ['customer']);

export const selectDescendantCustomerNotes = createSelector(
  selectCustomerNotes,
  customerNotes => {
    if (isEmpty(customerNotes)) return emptyArray;
    return reverse(customerNotes);
  },
);

export default createStructuredSelector({
  customer: selectCustomer,
  descendantCustomerNotes: selectDescendantCustomerNotes,
});