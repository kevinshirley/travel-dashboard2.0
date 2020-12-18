import { isEmpty, isNil } from 'ramda';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { CUSTOMER, ui, forms, SESSION, customers } from 'src/store/actions';
import { selectIsCustomerSideMenu } from 'src/store/selectors/common';
import { axiosPost } from 'src/utils/fetch';
import uuidv4 from 'src/utils/uuidv4';
import { selectSessionProfile } from 'src/store/selectors/session';

export function* watchSetCustomer() {
  yield takeLatest(CUSTOMER.SET, setCustomer);
}

export function* watchCloseCustomerSideMenu() {
  yield takeLatest(CUSTOMER.CLOSE_CUSTOMER_SIDE_MENU, closeCustomerSideMenu);
}

export function* watchFetchUserCustomers() {
  yield takeLatest(SESSION.SET_IS_LOGGED_IN, fetchUserCustomers);
}

export function* watchAddCustomer() {
  yield takeLatest(CUSTOMER.ADD, addCustomer);
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

  if (profile && profile.id) {
    const customerData = {
      ...payload,
      id: uuidv4(),
      createdBy: !isEmpty(profile) ? profile.id : '',
    };
    const result = yield call(axiosPost, '/api/customer/add', customerData);

    if (result.status === 200 && result.data.success) {
      // add customer
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
      yield put(forms.setSuccess({ message: 'You\'ve successfully added this customer!', form: 'addCustomer' }));
      yield put(ui.closeModal());

      // fetch user customers
      yield call(fetchUserCustomers);
    } else {
      yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
      yield put(forms.setError({ message: result.error.message ? result.error.message : 'An error occured when saving this customer.', form: 'addCustomer' }));
      yield put(ui.closeModal());
    }
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
      yield put(customers.setUser(userCustomers.data.customers));
    } else {
      console.log({ userCustomers });
    }
  }
}
