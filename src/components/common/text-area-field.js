import React from 'react';
import TextField from '@material-ui/core/TextField';

function TextAreaField({ label, placeholder, field, ...props }) {
  return (
    <div className='text-area-field'>
      <TextField
        id="text-area-input"
        label={label}
        multiline
        rows="8"
        variant="outlined"
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
}

export default TextAreaField;
