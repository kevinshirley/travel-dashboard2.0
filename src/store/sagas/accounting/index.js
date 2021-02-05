import { assoc } from 'ramda';
import { put, takeLatest, select } from 'redux-saga/effects';
import { INVOICES, invoices } from 'src/store/actions';
import { selectNewInvoiceItems } from 'src/store/selectors/accounting';

export function* watchAddInvoiceItem() {
  yield takeLatest(INVOICES.ADD_INVOICE_ITEM, addInvoiceItem);
}

export function* watchUpdateInvoiceItemName() {
  yield takeLatest(INVOICES.UPDATE_INVOICE_ITEM_NAME, updateInvoiceItemName);
}

function* addInvoiceItem({ payload }) {
  const invoiceItems = yield select(selectNewInvoiceItems);
  const newInvoiceItems = [
    ...invoiceItems,
    payload,
  ];
  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}

function* updateInvoiceItemName({ payload }) {
  const invoiceItems = yield select(selectNewInvoiceItems);
  const { id, name } = payload;

  const newInvoiceItems = invoiceItems.map(item => {
    if (item.id === id) {
      item.itemName = name;
    }
    return item;
  });

  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}
