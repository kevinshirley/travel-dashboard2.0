import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import DeleteButton from 'src/components/common/delete-button';

export default function TransformationEvent({ day, deleteEvent, event }) {
  return (
    <Form className='c-itinerary-event-manager'>
      <h2>Manage Tranportation</h2>
      <div className='flight-direction-radio-group'>
        <Field name='transportationDirection' type='radio' value='departure' as={Radio} />
        <span>Departure</span>
        <Field name='transportationDirection' type='radio' value='arrival' as={Radio} />
        <span>Arrival</span>
      </div>
      <Field name='title' label='Title' component={TextField} />
      <Field name='transportationDepartureTime' label='Departure Time' component={TextField} />
      <Field name='transportationArrivalTime' label='Arrival Time' component={TextField} />
      <Field name='transportationDuration' label='Duration' component={TextField} />
      <Field name='transportationBookedOn' label='Booked On' component={TextField} />
      <Field name='transportationConfirmationNumber' label='Confirmation #' component={TextField} />
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
