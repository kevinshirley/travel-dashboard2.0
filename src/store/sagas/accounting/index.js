import Router from 'next/router';
import { isNil, isEmpty } from 'ramda';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { INVOICES, invoices, forms, SESSION } from 'src/store/actions';
import { selectNewInvoiceItems, selectNewInvoice } from 'src/store/selectors/accounting';
import { selectSessionProfile } from 'src/store/selectors/session';
import { post, axiosPost } from 'src/utils/fetch';
import * as moment from 'moment';

export function* watchAddInvoiceItem() {
  yield takeLatest(INVOICES.ADD_INVOICE_ITEM, addInvoiceItem);
}

export function* watchUpdateInvoiceItem() {
  yield takeLatest(INVOICES.UPDATE_INVOICE_ITEM, updateInvoiceItem);
}

export function* watchUpdateInvoice() {
  yield takeLatest(INVOICES.UPDATE_INVOICE, updateInvoice);
}

export function* watchSaveInvoice() {
  yield takeLatest(INVOICES.SAVE, saveInvoice);
}

export function* watchFetchUserInvoices() {
  yield takeLatest(SESSION.SET_PROFILE, fetchUserInvoices);
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
    repPhoneNumber,
    companyStreetAddress,
    companyCity,
    companyState,
    companyZipCode,
    companyCountry,
    clientFirstName,
    clientLastName,
    clientStreetAddress,
    clientCity,
    clientState,
    clientZipCode,
    clientCountry,
    dueDate,
    dateIssued,
    invoiceMessage,
    termsContent,
    invoiceNumber,
    referenceNumber,
    invoiceId,
    totalAmountDue,
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

  if (!isNil(repPhoneNumber)) {
    newInvoice = {
      ...invoice,
      repPhoneNumber,
    };
  }

  if (!isNil(companyStreetAddress)) {
    newInvoice = {
      ...invoice,
      companyStreetAddress,
    };
  }

  if (!isNil(companyCity)) {
    newInvoice = {
      ...invoice,
      companyCity,
    };
  }

  if (!isNil(companyState)) {
    newInvoice = {
      ...invoice,
      companyState,
    };
  }

  if (!isNil(companyZipCode)) {
    newInvoice = {
      ...invoice,
      companyZipCode,
    };
  }

  if (!isNil(companyCountry)) {
    newInvoice = {
      ...invoice,
      companyCountry,
    };
  }

  if (!isNil(clientFirstName)) {
    newInvoice = {
      ...invoice,
      clientFirstName,
    };
  }

  if (!isNil(clientLastName)) {
    newInvoice = {
      ...invoice,
      clientLastName,
    };
  }

  if (!isNil(clientStreetAddress)) {
    newInvoice = {
      ...invoice,
      clientStreetAddress,
    };
  }

  if (!isNil(clientCity)) {
    newInvoice = {
      ...invoice,
      clientCity,
    };
  }

  if (!isNil(clientState)) {
    newInvoice = {
      ...invoice,
      clientState,
    };
  }

  if (!isNil(clientZipCode)) {
    newInvoice = {
      ...invoice,
      clientZipCode,
    };
  }

  if (!isNil(clientCountry)) {
    newInvoice = {
      ...invoice,
      clientCountry,
    };
  }

  if (!isNil(dueDate)) {
    newInvoice = {
      ...invoice,
      dueDate,
    };
  }

  if (!isNil(dateIssued)) {
    newInvoice = {
      ...invoice,
      dateIssued,
    };
  }

  if (!isNil(invoiceMessage)) {
    newInvoice = {
      ...invoice,
      invoiceMessage,
    };
  }

  if (!isNil(termsContent)) {
    newInvoice = {
      ...invoice,
      termsContent,
    };
  }

  if (!isNil(invoiceNumber)) {
    newInvoice = {
      ...invoice,
      invoiceNumber,
    };
  }

  if (!isNil(referenceNumber)) {
    newInvoice = {
      ...invoice,
      referenceNumber,
    };
  }

  if (!isNil(invoiceId)) {
    newInvoice = {
      ...invoice,
      invoiceId,
    };
  }

  if (!isNil(totalAmountDue)) {
    newInvoice = {
      ...invoice,
      totalAmountDue,
    };
  }

  yield put(invoices.setNewInvoice(newInvoice));
}

function* saveInvoice() {
  const invoice = yield select(selectNewInvoice);
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (!isEmpty(id) && !isNil(id)) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'addInvoice' }));

    const newInvoice = {
      ...invoice,
      createdBy: profile.id,
      createdAt: moment().format(),
    };

    const result = yield call(post, '/api/accounting/invoice/add', newInvoice);

    if (result.success) {
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addInvoice' }));

      Router.push({ pathname: '/invoices' });

      yield put(forms.setSuccess({ message: 'You\'ve successfully saved this invoice', form: 'addInvoice' }));

      yield call(fetchUserInvoices);
    } else {
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addInvoice' }));

      yield put(forms.setError({ message: 'An error occured when saving this invoice', form: 'addInvoice' }));
    }
  }
}

function* fetchUserInvoices() {
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (!isEmpty(id) && !isNil(id)) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'userInvoices' }));

    const userInvoices = yield call(axiosPost, '/api/accounting/invoices', { id });

    if (userInvoices.status === 200 && userInvoices.data.success) {
      yield put(invoices.setInvoices(userInvoices.data.invoices));
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'userInvoices' }));
    } else {
      yield put(forms.setError({ message: userInvoices.data.error.message ? userInvoices.data.error.message : 'An error occured when pulling your invoices list.', form: 'userInvoices' }));
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'userInvoices' }));
    }
  }
}
