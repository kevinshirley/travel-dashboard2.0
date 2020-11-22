import React from 'react';
import InputField from '@material-ui/core/TextField';
import cx from 'classnames';

function TextField({ field, containerClass, ...props }) {
  const textFieldClasses = cx('text-field', {
    [containerClass]: containerClass,
  });

  return (
    <div className={textFieldClasses}>
      <InputField
        id='text-input'
        className='text-input'
        type="text"
        variant="outlined"
        {...field}
        {...props}
      />
    </div>
  );
}

export default TextField;
