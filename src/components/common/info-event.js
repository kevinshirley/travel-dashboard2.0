import React from 'react';
import { Field, Form } from 'formik';
import TextField from 'src/components/common/text-field';
import RoundedButton from 'src/components/material-ui/rounded-button';
import DeleteButton from 'src/components/common/delete-button';

export default function InfoEvent({ day, deleteEvent, event }) {
  return (
    <Form className='c-itinerary-event-manager'>
      <h2>Manage info</h2>
      <Field name='title' label='Title' component={TextField} />
      <Field name='notes' label='Notes' component={TextField} />
      <Field name='infoTime' label='info Start Time' component={TextField} />
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
