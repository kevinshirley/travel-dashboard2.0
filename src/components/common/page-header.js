import React, { useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { EMPTY_BACKGROUND } from 'src/components/common/images';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Button from 'src/components/material-ui/text-button';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { CAMERA_ICON, SPACING } from 'src/components/material-ui/icons';
import { ITINERARY_EDITOR_PATHNAMES, ITINERARY } from 'src/store/constants/url';

function PageHeader({ coverImage = null, title }) {
  const router = useRouter();

  const [value, setValue] = useState('');

  const uploadCoverImageAction = useAction(actions.itinerary.uploadCoverImage);

  const handleChange = (e) => {
    setValue(e.target.files[0]);
  };

  const handleOnClick = () => {
    uploadCoverImageAction(value);
    setValue('');
  };

  const updateTripInfoClasses = cx({
    'update-trip-info': router.pathname !== ITINERARY,
    'update-trip-info__hidden': router.pathname === ITINERARY,
  });

  return (
    <div className='page-header'>
      {(coverImage && coverImage.location) || ITINERARY_EDITOR_PATHNAMES.includes(router.pathname) ? (
        <>
          <div className='cover' style={{
            backgroundImage: coverImage.location ? `url(${coverImage.location})` : `url(${EMPTY_BACKGROUND})`
          }}>
            <div className={updateTripInfoClasses}>
              <Button type='button'>
                <label htmlFor="icon-button-file">
                  {CAMERA_ICON}
                  {SPACING}
                  <span>{value ? value.name : 'Change Cover Image'}</span>
                </label>
              </Button>
              {value && (
                <div onClick={handleOnClick} type='button'>
                  <RoundedButton 
                    className='add-trip-cta'
                    text='Upload'
                  />
                </div>
              )}
              <input 
                accept="image/*"
                id="icon-button-file"
                onChange={handleChange}
                multiple
                type="file"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className='title'>
            <h1>{title}</h1>
          </div>
        </>
      ) : (
        <>
          <h1>{title}</h1>
        </>
      )}
    </div>
  );
}

export default PageHeader;
