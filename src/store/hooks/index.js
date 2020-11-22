import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

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
}
