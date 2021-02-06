import { pathOr, propOr } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';
import { selectAddInvoiceIsSubmitting, selectAddInvoiceSuccess, selectAddInvoiceError } from 'src/store/selectors/forms';

const emptyObject = {};
const emptyArray = [];

const selectAccounting = propOr(emptyObject, 'accounting');

export const selectNewInvoiceItems = createSelector(
  selectAccounting,
  pathOr(emptyArray, ['newInvoice', 'items']),
);

export const selectNewInvoice = createSelector(
  selectAccounting,
  propOr(emptyArray, 'newInvoice'),
);

export const selectInvoicesConnector = createStructuredSelector({
  addInvoiceIsSubmitting: selectAddInvoiceIsSubmitting,
  addInvoiceSuccess: selectAddInvoiceSuccess,
  addInvoiceError: selectAddInvoiceError,
});
