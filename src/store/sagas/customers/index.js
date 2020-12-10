import { put, takeLatest, select } from 'redux-saga/effects';
import { CUSTOMER, ui } from 'src/store/actions';
import { selectIsCustomerSideMenu } from 'src/store/selectors/common';

export function* watchSetCustomer() {
  yield takeLatest(CUSTOMER.SET, setCustomer);
}

export function* watchCloseCustomerSideMenu() {
  yield takeLatest(CUSTOMER.CLOSE_CUSTOMER_SIDE_MENU, closeCustomerSideMenu);
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
