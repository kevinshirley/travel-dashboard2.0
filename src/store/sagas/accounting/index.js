import { isNil } from 'ramda';
import { put, takeLatest, select } from 'redux-saga/effects';
import { INVOICES, invoices } from 'src/store/actions';
import { selectNewInvoiceItems, selectNewInvoice } from 'src/store/selectors/accounting';

export function* watchAddInvoiceItem() {
  yield takeLatest(INVOICES.ADD_INVOICE_ITEM, addInvoiceItem);
}

export function* watchUpdateInvoiceItem() {
  yield takeLatest(INVOICES.UPDATE_INVOICE_ITEM, updateInvoiceItem);
}

export function* watchUpdateInvoice() {
  yield takeLatest(INVOICES.UPDATE_INVOICE, updateInvoice);
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
  const { id, name, description, unitCost, qty, total } = payload;

  const newInvoiceItems = invoiceItems.map(item => {
    if (item.id === id) {
      if (!isNil(name)) {
        item.itemName = name;
      } else if (!isNil(description)) {
        item.itemdescription = description;
      } else if (!isNil(unitCost)) {
        item.unitCost = unitCost;
        item.total = total;
      } else if (!isNil(qty)) {
        item.qty = qty;
        item.total = total;
      }
    }
    return item;
  });

  yield put(invoices.setNewInvoiceItems(newInvoiceItems));
}

function* updateInvoice({ payload }) {
  let newInvoice = {};
  const invoice = yield select(selectNewInvoice);
  const {
    companyName,
    repFirstName,
    repLastName,
  } = payload;

  if (!isNil(companyName)) {
    newInvoice = {
      ...invoice,
      companyName
    };
  }

  if (!isNil(repFirstName)) {
    newInvoice = {
      ...invoice,
      repFirstName,
    };
  }

  if (!isNil(repLastName)) {
    newInvoice = {
      ...invoice,
      repLastName,
    };
  }

  yield put(invoices.setNewInvoice(newInvoice));
}
