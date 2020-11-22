import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { CAMERA_ICON, SPACING, CHECK_CIRCLE_ICON } from 'src/components/material-ui/icons';
import RoundedButton from 'src/components/material-ui/rounded-button';

export default function UploadImage({ label, uploadCoverImage }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.files[0]);
  };

  const handleOnClick = () => {
    uploadCoverImage(value);
  };

  return (
    <div className='upload-image'>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          {CAMERA_ICON}
        </IconButton>
      </label>
      <input 
        accept="image/*"
        id="icon-button-file"
        onChange={handleChange}
        multiple
        type="file"
        style={{ display: 'none' }}
      />
      {SPACING}
      <span>{!value ? label : value.name}</span>
      {SPACING}
      {SPACING}
      <div onClick={handleOnClick} type='button'>
        <RoundedButton 
          className='add-trip-cta'
          text='Upload'
        />
      </div>
    </div>
  );
}
