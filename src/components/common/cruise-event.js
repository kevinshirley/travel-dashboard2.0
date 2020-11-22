import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import DeleteButton from 'src/components/common/delete-button';

export default function CruiseEvent({ day, deleteEvent, event }) {
  return (
    <Form className='c-itinerary-event-manager'>
      <h2>Manage cruise</h2>
      <Field name='title' label='Title' component={TextField} />
      <Field name='cruiseTime' label='Cruise Start Time' component={TextField} />
      <Field name='cruiseDuration' label='Cruise Duration' component={TextField} />
      <Field name='cruiseBookedOn' label='Booked On' component={TextField} />
      <Field name='cruiseConfirmationNumber' label='Confirmation #' component={TextField} />
      <Field name='price' label='Price' component={TextField} />
      <Field name='currency' label='Currency' component={TextField} />
      <div className='flight-direction-radio-group'>
        <div>Price Type</div>
        <Field name='priceType' type='radio' value='perPerson' as={Radio} />
        <span>Per Person</span>
        <Field name='priceType' type='radio' value='total' as={Radio} />
        <span>Total</span>
      </div>
      <Field name='notes' label='Notes' component={TextField} />
      <div className='c-itinerary-event-manager__cta-group'>
        <RoundedButton
          className='add-trip-cta'
          text='Done'
          type='submit'
        />
        <div onClick={() => deleteEvent({ day, event })} type='button'>
          <DeleteButton background='#f50057' className='delete-event-cta' />
        </div>
      </div>
    </Form>
  );
}
