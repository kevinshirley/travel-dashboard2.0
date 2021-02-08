import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import Spinner from 'src/components/common/spinner';

export default function TextButton({
  children,
  className,
  type,
  onClick,
  isLoading = false,
}) {
  const textButtonClasses = cx({
    [className]: className,
  });

  return (
    <Button 
      className={textButtonClasses} 
      id='text-button'
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <Spinner />
      ) : children}
    </Button>
  );
}
