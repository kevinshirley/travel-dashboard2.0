import { isEmpty } from 'ramda';
import { put, takeLatest, call, delay } from 'redux-saga/effects';
import { SESSION, session, forms } from 'src/store/actions';
import { axiosPost } from 'src/utils/fetch';
import { mapUserData } from 'src/lib/auth/mapUserData';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

export function* watchIsLoggedIn() {
  yield takeLatest(SESSION.IS_LOGGED_IN, isLoggedIn);
}

export function* watchLogout() {
  yield takeLatest(SESSION.LOGOUT, logout);
}

export function* watchSignIn() {
  yield takeLatest(SESSION.SIGN_IN, signIn);
}

export function* watchSignUp() {
  yield takeLatest(SESSION.SIGN_UP, signUp);
}

export function* watchSetUserToken() {
  yield takeLatest(SESSION.SET_USER_TOKEN, setUserToken);
}

function* isLoggedIn() {
  console.log('isLoggedIn session saga');
  // const result = yield call(axiosPost, '/api/users/session');
  // console.log({ result });
  // if (result.status === 200) {
  //   yield put(session.setIsLoggedIn(result.data));
  // } else {
  //   yield put(session.setIsLoggedIn({}));
  // }
}

function* logout() {
  const result = yield call(axiosPost, '/api/users/logout');

  if (result.status === 200 && result.data.success) {
    typeof window !== "undefined" ? window.location.href = '/' : null;
    yield call(delay, 1000);
    // typeof window !== "undefined" ? window.location.reload() : null;
  }
}

function* signIn({ payload }) {
  yield put(forms.isSubmitting({ isSubmitting: true, form: 'signIn' }));
  const result = yield call(axiosPost, '/api/users/signin', payload);

  if (result.status === 200 && result.data.success) {
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'signIn' }));
    typeof window !== "undefined" ? window.location.href = '/account' : null;
    yield call(delay, 1000);
    // typeof window !== "undefined" ? window.location.reload() : null;
  } else {
    yield put(forms.isSubmitting({ isSubmitting: false, form: 'signIn' }));
    yield put(forms.setError({ ...result.data, form: 'signIn' }));
  }
}

function* signUp({ payload }) {
  const db = firebaseClient.firestore();
  const user = firebaseClient.auth().currentUser;
  const userData = yield call(mapUserData, user);

  if (userData) {
    db.collection('userProfile').add({
      id: userData.id,
      createdAt: firebaseClient.firestore.FieldValue.serverTimestamp(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username,
      email: payload.email,
    });
  }

  yield put(forms.isSubmitting({ isSubmitting: false, form: 'signUp' }));
}

function* setUserToken({ payload }) {
  console.log('setUserToken payload', payload);
  const result = yield call(axiosPost, '/api/cookie/set', payload);
  console.log({ 'setUserToken saga result': result });
}
