import React, { useRef, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import * as moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { SPACING } from 'src/components/material-ui/icons';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { selectAddCustomerIsSubmitting } from 'src/store/selectors/forms';
import TextAreaField from 'src/components/common/text-area-field';

const BEM_BLOCK = 'c-add-customer-notes';

function AddCustomerNotesModal() {
  const closeModal = useAction(actions.ui.closeModal);
  const addCustomer = useAction(actions.customer.add);
  const isSubmitting = useSelector(selectAddCustomerIsSubmitting);
  const closeBtnRef = useRef();
  const [date, setDate] = useState(new Date());
  const { addToast } = useToasts();

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
        <div className='header-content'>
          <h2 className='title'>Add Notes</h2>
        </div>
      </div>
      <Formik
        initialValues={{
          note: '',
        }}
        onSubmit={async values => {
          try {
            const { note } = values;

            if (!isEmpty(note)) {
              const customerNotes = { note, date };
              console.log({ customerNotes });
            } else {
              addToast('Please add a note before submitting', {
                appearance: 'warning',
                autoDismiss: false, 
              });
            }
          } catch (err) {
            addToast(err, {
              appearance: 'error',
              autoDismiss: false, 
            });
          }
        }}
      >
        <Form className={`c-generic-modal-form ${BEM_BLOCK}`}>
          <Field name='note' label='Note' type='text' component={TextAreaField} />
          {SPACING}
          <div className={`${BEM_BLOCK}__date`}>
            <span>Date:{SPACING}</span>
            {moment(date).format('LLL')}
          </div>
          {SPACING}
          <RoundedButton
            className='sign-in-cta'
            isLoading={isSubmitting}
            text='Add'
            type='submit'
          />
        </Form>
      </Formik>
    </>
  );
}

export default AddCustomerNotesModal;
