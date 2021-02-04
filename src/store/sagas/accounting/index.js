import { put, takeLatest, select } from 'redux-saga/effects';
import { INVOICES, invoices } from 'src/store/actions';
import { selectNewInvoiceItems } from 'src/store/selectors/accounting';

export function* watchAddInvoiceItem() {
  yield takeLatest(INVOICES.ADD_INVOICE_ITEM, addInvoiceItem);
}

function* addInvoiceItem({ payload }) {
  const invoiceItems = yield select(selectNewInvoiceItems);
  const newInvoiceItems = [
    ...invoiceItems,
    payload,
  ];
  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}
