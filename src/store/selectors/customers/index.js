import * as R from 'ramda';
const emptyObject = {};

export const selectCustomer = R.pathOr(emptyObject, ['customer']);
