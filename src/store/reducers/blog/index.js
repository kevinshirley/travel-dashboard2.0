import { combineReducers } from 'redux';
import { BLOG } from 'src/store/actions';

function posts(state = null, { type, payload }) {
  switch (type) {
    case BLOG.SET_POSTS:
      return payload;
    default:
      return state;
  }
}

function post(state = null, { type, payload }) {
  switch (type) {
    case BLOG.SET_POST:
      return payload;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  post,
});
