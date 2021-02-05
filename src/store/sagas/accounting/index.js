import { isNil } from 'ramda';
import { put, takeLatest, select } from 'redux-saga/effects';
import { INVOICES, invoices } from 'src/store/actions';
import { selectNewInvoiceItems } from 'src/store/selectors/accounting';

export function* watchAddInvoiceItem() {
  yield takeLatest(INVOICES.ADD_INVOICE_ITEM, addInvoiceItem);
}

export function* watchUpdateInvoiceItem() {
  yield takeLatest(INVOICES.UPDATE_INVOICE_ITEM, updateInvoiceItem);
}

function* addInvoiceItem({ payload }) {
  const invoiceItems = yield select(selectNewInvoiceItems);
  const newInvoiceItems = [
    ...invoiceItems,
    payload,
  ];
  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}

function* updateInvoiceItem({ payload }) {
  const invoiceItems = yield select(selectNewInvoiceItems);
  const { id, name, description } = payload;

  const newInvoiceItems = invoiceItems.map(item => {
    if (item.id === id) {
      if (!isNil(name)) {
        item.itemName = name;
      }

      if (!isNil(description)) {
        item.itemdescription = description;
      }
    }
    return item;
  });

  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}
