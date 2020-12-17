import { isEmpty, isNil } from 'ramda';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { CUSTOMER, ui, forms, SESSION } from 'src/store/actions';
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
  console.log({ 'addCustomer saga': payload });
  yield put(forms.isSubmitting({ isSubmitting: true, form: 'addCustomer' }));
  const profile = yield select(selectSessionProfile);
  const customerData = {
    ...payload,
    id: uuidv4(),
    createdBy: !isEmpty(profile) ? profile.id : '',
  };
  const result = yield call(axiosPost, '/api/customer/add', customerData);

  if (result.status === 200 && result.data.success) {
    console.log({ result });
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    yield put(forms.setSuccess({ message: 'You\'ve successfully added this customer!', form: 'addCustomer' }));
    yield put(ui.closeModal());
  } else {
    console.log({ result });
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    yield put(forms.setError({ message: result.error.message ? result.error.message : 'An error occured when saving this customer.', form: 'addCustomer' }));
  }
}

function* fetchUserCustomers() {
  console.log('fetchUserCustomers');
  const profile = yield select(selectSessionProfile);
  const { id } = profile;

  if (!isEmpty(id) && !isNil(id)) {
    yield put(forms.isSubmitting({ isSubmitting: true, form: 'userCustomers' }));

    const userCustomers = yield call(axiosPost, '/api/customers/user', { id });

    if (userCustomers.status === 200 && userCustomers.data.success) {
      console.log({ userCustomers });
    } else {
      console.log({ userCustomers });
    }
  }
}
