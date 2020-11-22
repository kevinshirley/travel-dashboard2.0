import React, { useCallback } from 'react';
import cx from 'classnames';
import * as moment from 'moment';
import { Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import Radio from '@material-ui/core/Radio';
import RoundedButton from 'src/components/material-ui/rounded-button';
import Calendar from 'src/components/common/calendar';
import { SPACING, CLOSE_ICON } from 'src/components/material-ui/icons';
import UploadImage from 'src/components/common/upload-image';
import IconButton from '@material-ui/core/IconButton';
import ItineraryPriceType from 'src/components/common/price-type-radio-field';
import TextAreaField from 'src/components/common/text-area-field';

export default function TripOverview({
  uploadCoverImage,
  openStartDateCalendar,
  tripStartDate,
  isStartDateCalendarOpened,
  closeStartDateCalendar,
  setPriceType
}) {
  const calendarCloseIconClasses = cx({
    'not-visible': !isStartDateCalendarOpened,
  });

  const tripStartDateAction = useCallback(e => {
    e.preventDefault();
    openStartDateCalendar();
  });

  return (
    <Form className='flight-event'>
      <h2>Trip Overview</h2>
      <Field name='title' label='Trip Title' component={TextField} />
      <Field name='location' label='Location' component={TextField} />
      <Field name='country' label='Country' component={TextField} />
      <div className='itinerary-price-type'>
        <Field name='price' label='Price' component={TextField} />
        <div className='flight-direction-radio-group'>
          <Field name='priceType' type='radio' value='perPerson' as={Radio} />
          <span>Per Person</span>
          <Field name='priceType' type='radio' value='total' as={Radio} />
          <span>Total</span>
        </div>
      </div>
      <Field name='pathname' label='Itinerary Slug' component={TextField} />
      <Field name='overview' label='Description' component={TextAreaField} />
      {SPACING}
      {SPACING}
      <RoundedButton 
        className='add-trip-cta'
        text='Done'
        type='submit'
      />
    </Form>
  );
}
