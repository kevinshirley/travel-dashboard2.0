import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';

export default function TextButton({ children, className, type, onClick }) {
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
      {children}
    </Button>
  );
}
