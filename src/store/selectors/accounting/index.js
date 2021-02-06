import { pathOr, propOr } from 'ramda';
import { createSelector } from 'reselect';

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
