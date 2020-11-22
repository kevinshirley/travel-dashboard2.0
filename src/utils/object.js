import * as R from 'ramda';

const getIndex = R.pipe(
  R.prop(0),
  Number,
);

export const indexedObjectToArray = R.ifElse(
  R.is(Array),
  R.identity,
  R.pipe(
    R.toPairs,
    R.sortBy(getIndex),
    R.map(R.prop(1)),
  ),
);

export const lastObjectValue = array => array[Object.keys(array)[Object.keys(array).length - 1]];
