import React, { useState, useEffect, useCallback } from 'react';
import { CLOSE_ICON, SPACING } from 'src/components/material-ui/icons';
import { Formik, Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import UploadImage from 'src/components/common/upload-image';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { useSelector } from 'react-redux';
import { selectTripStartDate } from 'src/store/selectors/add-itinerary';
import Calendar from 'src/components/common/calendar';
import { selectIsStartDateCalendarOpened } from 'src/store/selectors/common';
import IconButton from '@material-ui/core/IconButton';
import ItineraryPriceType from 'src/components/common/price-type-radio-field';
import TextAreaField from 'src/components/common/text-area-field';
import RoundedButton from 'src/components/material-ui/rounded-button';

const TripInfo = () => {
  const uploadCoverImageAction = useAction(actions.itinerary.uploadCoverImage);
  const openStartDateCalendarAction = useAction(actions.ui.openStartDateCalendar);
  const closeStartDateCalendarAction = useAction(actions.ui.closeStartDateCalendar);
  const tripStartDate = useSelector(selectTripStartDate);
  const isStartDateCalendarOpened = useSelector(selectIsStartDateCalendarOpened);

  return (
    <Form>
      {SPACING}
      {SPACING}
      <Field name='title' label='Trip Title' component={TextField} />
      <Field 
        name='coverImage'
        label='Cover Image'
        component={UploadImage}
        uploadCoverImage={uploadCoverImageAction}
      />
      <Field 
        name='tripStartDate'
        label='Trip Start Date'
        component={TextField}
        onClick={openStartDateCalendarAction}
        value={tripStartDate ? moment.utc(tripStartDate).format('LL') : ''}
      />
      <div className='calendar-wrapper'>
        <Calendar isVisible={isStartDateCalendarOpened} />
        <div className='close-start-date-calendar'>
          <IconButton 
            color="inherit" 
            id='icon-button' 
            onClick={closeStartDateCalendarAction}
            className={calendarCloseIconClasses}
          >
            {CLOSE_ICON}
          </IconButton>
        </div>
      </div>
      <Field name='location' label='Location' component={TextField} />
      <Field name='country' label='Country' component={TextField} />
      <div className='itinerary-price-type'>
        <Field name='price' label='Price' component={TextField} />
        <ItineraryPriceType setPriceType={setPriceType} />
      </div>
      <Field name='pathname' label='Itinerary Slug' component={TextField} />
      <Field name='overview' label='Description' component={TextAreaField} />
      <RoundedButton 
        className='add-trip-cta'
        text='Done'
        type='submit'
      />
    </Form>
  );
};

export default TripInfo;
