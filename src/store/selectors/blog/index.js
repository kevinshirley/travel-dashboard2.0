import * as R from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

export const selectPosts = R.pathOr('', [
  'blog',
  'posts',
]);

export const selectPost = R.pathOr('', [
  'blog',
  'post',
]);

export default createStructuredSelector({
  posts: selectPosts,
  post: selectPost,
});
