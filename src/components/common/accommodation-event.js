import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import DeleteButton from 'src/components/common/delete-button';

export default function AccommodationEvent({ day, deleteEvent, event }) {
  return (
    <Form className='c-itinerary-event-manager'>
      <h2>Manage Accommodation</h2>
      <div className='flight-direction-radio-group'>
        <Field name='accommodationStatus' type='radio' value='checkIn' as={Radio} />
        <span>Check in</span>
        <Field name='accommodationStatus' type='radio' value='checkOut' as={Radio} />
        <span>Check out</span>
      </div>
      <Field name='title' label='Title' component={TextField} />
      <Field name='checkInTime' label={'Check in time'} component={TextField} />
      <Field name='checkOutTime' label={'Check out time'} component={TextField} />
      <Field name='accommodationBookedOn' label='Booked On' component={TextField} />
      <Field name='accommodationConfirmationNumber' label='Confirmation #' component={TextField} />
      <Field name='price' label='Price' component={TextField} />
      <Field name='currency' label='Currency' component={TextField} />
      <div className='flight-direction-radio-group'>
        <div>Price Type</div>
        <Field name='priceType' type='radio' value='perPerson' as={Radio} />
        <span>Per Person</span>
        <Field name='priceType' type='radio' value='total' as={Radio} />
        <span>Total</span>
        <Field name='priceType' type='radio' value='none' as={Radio} />
        <span>None</span>
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
