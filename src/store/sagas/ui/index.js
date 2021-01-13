import { isEmpty, isNil, dissoc } from 'ramda';
import Router from 'next/router';
import { put, takeLatest, select } from 'redux-saga/effects';
import { UI, ui, ROOT } from 'src/store/actions';
import { localStore } from 'src/utils/storage';
import { selectDayToDayTab } from 'src/store/selectors/common';

export function* watchOpenMenu() {
  yield takeLatest(UI.OPEN_MENU, openMenu);
}

export function* watchCloseMenu() {
  yield takeLatest(UI.CLOSE_MENU, closeMenu);
}

export function* watchOpenModal() {
  yield takeLatest(UI.OPEN_MODAL, openModal);
}

export function* watchCloseModal() {
  yield takeLatest(UI.CLOSE_MODAL, closeModal);
}

export function* watchCloseStartDateCalendar() {
  yield takeLatest(UI.CLOSE_START_DATE_CALENDAR, closeStartDateCalendar);
}

export function* watchOpenStartDateCalendar() {
  yield takeLatest(UI.OPEN_START_DATE_CALENDAR, openStartDateCalendar);
}

export function* watchSetDayToDayTab() {
  yield takeLatest(UI.SET_DAY_TO_DAY_TAB, setDayToDayTab);
}

export function* watchSetDayToDayTabFromStorage() {
  yield takeLatest(ROOT.INITIAL_LOAD, setDayToDayTabFromStorage);
}

export function* watchInitializeModal() {
  yield takeLatest(ROOT.INITIAL_LOAD, initializeModal);
}

function* openMenu() {
  console.log('open menu saga');
}

function* closeMenu() {
  console.log('close menu saga');
}

function removeOverlayQuery() {
  Router.push({
    pathname: Router.router.pathname,
    query: { ...dissoc('overlay', Router.router.query) },
  });
}

function* openModal({ payload }) {
  console.log({ payload });
  const { modal, modalPayload } = payload;
  yield put(ui.setModalUi(modal));

  if (modalPayload) {
    yield put(ui.setModalUiPayload(modalPayload));
  }

  console.log({ Router });
  // removeOverlayQuery();

  Router.push({
    pathname: Router.router.pathname,
    query: { ...Router.router.query, overlay: encodeURI(modal) },
  });
}

function* closeModal() {
  removeOverlayQuery();
}

function* closeStartDateCalendar() {
  yield put(ui.isEditingTripStartDate(true));
}

function* openStartDateCalendar() {
  yield put(ui.isEditingTripStartDate(false));
}

function* setDayToDayTab() {
  const dayToDayTab = yield select(selectDayToDayTab);
  localStore('lastDayToDayTabSelected').set(dayToDayTab);
}

function* setDayToDayTabFromStorage() {
  const dayToDayTab = localStore('lastDayToDayTabSelected').get();
  if (isEmpty(dayToDayTab) || isNil(dayToDayTab)) return;
  yield put(ui.setDayToDayTab(dayToDayTab));
}

function* initializeModal() {
  const { overlay } = Router.router.query;

  if (!isNil(overlay)) {
    yield put(ui.openModal({ modal: overlay }));
  }
}
