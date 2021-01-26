import { isEmpty, isNil } from 'ramda';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { CUSTOMER, ui, forms, SESSION, customers, customer } from 'src/store/actions';
import { selectIsCustomerSideMenu } from 'src/store/selectors/common';
import { axiosPost, post } from 'src/utils/fetch';
import uuidv4 from 'src/utils/uuidv4';
import { selectSessionProfile } from 'src/store/selectors/session';
import { selectUserCustomers } from 'src/store/selectors/customers';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

export function* watchSetCustomer() {
  yield takeLatest(CUSTOMER.SET, setCustomer);
}

export function* watchCloseCustomerSideMenu() {
  yield takeLatest(CUSTOMER.CLOSE_CUSTOMER_SIDE_MENU, closeCustomerSideMenu);
}

export function* watchFetchUserCustomers() {
  yield takeLatest(SESSION.SET_PROFILE, fetchUserCustomers);
}

export function* watchAddCustomer() {
  yield takeLatest(CUSTOMER.ADD, addCustomer);
}

export function* watchAddCustomerNote() {
  yield takeLatest(CUSTOMER.ADD_NOTE, addNote);
}

export function* watchSetCustomerOnInit() {
  yield takeLatest(CUSTOMER.SET_ON_INIT, setCustomerOnInit);
}

function* setCustomer() {
  const isCustomerSideMenuOpened = yield select(selectIsCustomerSideMenu);

  if (!isCustomerSideMenuOpened) {
    yield put(ui.isCustomerSideMenu(true));
  }
}

function* closeCustomerSideMenu() {
  yield put(ui.isCustomerSideMenu(false));
}

function* addCustomer({ payload }) {
  yield put(forms.isSubmitting({ isSubmitting: true, form: 'addCustomer' }));
  const profile = yield select(selectSessionProfile);
  const db = firebaseClient.firestore();

  if (profile && profile.id) {
    const customerData = {
      ...payload,
      id: uuidv4(),
      createdBy: !isEmpty(profile) ? profile.id : '',
      isOnline: false,
    };

    db.collection('userClients').add({
      ...customerData,
      createdAt: firebaseClient.firestore.FieldValue.serverTimestamp(),
    });

    yield put(ui.closeModal());

    // const result = yield call(axiosPost, '/api/customer/add', customerData);

    // if (result.status === 200 && result.data.success) {
    //   // customer added message
    //   yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    //   yield put(forms.setSuccess({ message: 'You\'ve successfully added this customer!', form: 'addCustomer' }));
    //   yield put(ui.closeModal());

    //   // fetch user customers
    //   yield call(fetchUserCustomers);
    // } else {
    //   yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    //   yield put(forms.setError({ message: result.error.message ? result.error.message : 'An error occured when saving this customer.', form: 'addCustomer' }));
    //   yield put(ui.closeModal());
    // }
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
  } else {
    yield put(forms.setError({ message: 'Please login to add a new customer.', form: 'addCustomer' }));
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    yield put(ui.closeModal());
  }
}

function* fetchUserCustomers() {
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (!isEmpty(id) && !isNil(id)) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'userCustomers' }));

    const userCustomers = yield call(axiosPost, '/api/customers/user', { id });

    if (userCustomers.status === 200 && userCustomers.data.success) {
      yield put(customers.setUser(userCustomers.data.clients));
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'userCustomers' }));
    } else {
      yield put(forms.setError({ message: userCustomers.data.error.message ? userCustomers.data.error.message : 'An error occured when pulling the clients list.', form: 'addCustomer' }));
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'userCustomers' }));
    }
  }
}

function* addNote({ payload }) {
  yield put(forms.isSubmitting({ isSubmitting: true, form: 'addCustomerNote' }));
  const result = yield call(post, '/api/customer/add/note', payload);

  if (result.success) {
    // note added
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomerNote' }));
    yield put(forms.setSuccess({ message: 'You\'ve successfully added a note for this customer', form: 'addCustomerNote' }));
    yield put(ui.closeModal());

    // fetch user customers
    yield call(fetchUserCustomers);
  } else {
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomerNote' }));
    yield put(forms.setError({ message: 'An error occured when adding a note for this customer', form: 'addCustomerNote' }));
    yield put(ui.closeModal());
    console.log({ result });
  }
}

function* setCustomerOnInit({ payload }) {
  const { query: id } = payload;
  const customerID = id.id;
  const userCustomers = yield select(selectUserCustomers);
  let cxData = {};

  userCustomers.map(cx => {
    if (cx.id === customerID) {
      cxData = cx;
    }
  });

  yield put(customer.set(cxData));
}
