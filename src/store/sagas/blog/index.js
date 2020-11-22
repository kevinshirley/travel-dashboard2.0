import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'src/utils/fetch';
import { BLOG, blog } from 'src/store/actions';

export function* watchGetPosts() {
  yield takeLatest(BLOG.GET_POSTS, getPosts);
}

function* getPosts() {
  const data = yield call(get, '/api/blog');
  yield put(blog.setPosts(data));
}
