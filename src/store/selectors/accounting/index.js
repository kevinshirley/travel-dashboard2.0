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
  propOr(emptyObject, 'newInvoice'),
);

export const selectInvoices = createSelector(
  selectAccounting,
  propOr(emptyArray, 'invoices'),
);

export const selectDisplayInvoice = createSelector(
  selectAccounting,
  propOr(emptyObject, 'displayInvoice'),
);

export const selectInvoicesConnector = createStructuredSelector({
  addInvoiceIsSubmitting: selectAddInvoiceIsSubmitting,
  addInvoiceSuccess: selectAddInvoiceSuccess,
  addInvoiceError: selectAddInvoiceError,
  invoices: selectInvoices,
});

export const selectDisplayInvoiceConnector = createStructuredSelector({
  invoice: selectDisplayInvoice,
});
