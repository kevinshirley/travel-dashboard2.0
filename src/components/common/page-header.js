import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { EMPTY_BACKGROUND } from 'src/components/common/images';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import Button from 'src/components/material-ui/text-button';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { CAMERA_ICON, SPACING, LINK_ICON } from 'src/components/material-ui/icons';
import { ITINERARY_EDITOR_PATHNAMES, URL } from 'src/store/constants/url';
import Link from 'src/components/common/link';
import { MODALS } from 'src/store/constants/modals';

function PageHeader({ coverImage = null, itineraryId = '', title }) {
  const router = useRouter();

  const [value, setValue] = useState('');

  const uploadCoverImageAction = useAction(actions.itinerary.uploadCoverImage);
  const openModal = useAction(actions.ui.openModal);

  const handleChange = (e) => {
    setValue(e.target.files[0]);
  };

  const handleOnClick = () => {
    uploadCoverImageAction(value);
    setValue('');
  };

  const updateTripInfoClasses = cx({
    'update-trip-info': router.pathname !== URL.ITINERARY,
    'update-trip-info__hidden': router.pathname === URL.ITINERARY,
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
            {router.pathname === URL.MANAGE_ITINERARY && (
              <Link href={`/itinerary/${itineraryId}`} newTab>
                <Button type='button'>
                  <span>{LINK_ICON}{SPACING}</span>
                  <small>Preview</small>
                </Button>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className='page-header__title'>
          <h1>{title}</h1>
          {router.pathname === URL.CUSTOMERS && (
            <div className='page-header__add-customer'>
              <Button
                onClick={() => openModal({
                  modal: MODALS.ADD_CUSTOMER,
                })}
                type='button'
              >
                + Add
              </Button>
            </div>
          )}
          {router.pathname === URL.INVOICES && (
            <div className='page-header__new-invoice'>
              <Link href='/invoices/new'>
                <Button type='button'>
                  + New
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

PageHeader.prototypes = {
  coverImage: PropTypes.object,
  itineraryId: PropTypes.string,
  title: PropTypes.string,
};

export default PageHeader;
