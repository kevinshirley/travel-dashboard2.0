import React from 'react';
import cx from 'classnames';
import Fab from '@material-ui/core/Fab';
import { KEYBOARD_ARROW_RIGHT_ICON } from 'src/components/material-ui/icons';
import Spinner from 'src/components/common/spinner';

export default function RoundedButton({
  background,
  text = '',
  className,
  type,
  isLoading = false,
  children
}) {
  const roundedButtonClasses = cx({
    [className]: className,
  });

  return (
    <Fab
      className={roundedButtonClasses}
      variant="extended"
      color="primary"
      aria-label="add"
      id="rounded-button"
      style={{
        background,
      }}
      type={type}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {text}
          {children ? children : KEYBOARD_ARROW_RIGHT_ICON}
        </>
      )}
    </Fab>
  );
}