import { isEmpty } from 'ramda';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import { CUSTOMER, ui, forms } from 'src/store/actions';
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
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    console.log({ result });
  } else {
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'addCustomer' }));
    yield put(forms.setError({ ...result.data, form: 'addCustomer' }));
    console.log({ result });
  }
}
