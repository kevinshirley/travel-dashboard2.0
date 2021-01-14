import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Creates an action dispatcher.
 *
 * Uses like:
 * ```js
 * const action = useAction(actions.myAction);
 * // ...
 * <button onClick={action}>Call action</button>
 * ```
 */

export function useAction(action) {
  const dispatch = useDispatch();

  return useCallback(
    (...args) => {
      dispatch(action(...args));
    },
    [action, dispatch],
  );
};

export function useIsoEffect(effect, dependencies) {
  const effectHandler = process.env.CLIENT ? React.useEffect : f => f();

  effectHandler(effect, dependencies);
};
