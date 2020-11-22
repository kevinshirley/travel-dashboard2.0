import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import * as actions from 'src/store/actions';
import { CLOSE_ICON } from 'src/components/material-ui/icons';
import { useAction } from 'src/store/hooks';
import DeleteButton from 'src/components/common/delete-button';
import { useRouter } from 'next/router';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';

function DeleteDayConfirmationModal({ modalUiPayload }) {
  const closeModal = useAction(actions.ui.closeModal);
  const deleteDayToDay = useAction(actions.itinerary.deleteDayToDay);
  const deleteManagedDayToDay = useAction(actions.itinerary.deleteManagedDayToDay);
  const closeBtnRef = useRef();
  const router = useRouter();

  const { day } = modalUiPayload;

  const deleteDay = () => {
    if (router.pathname === ADD_ITINERARY) {
      deleteDayToDay({ day });
    }
    if (router.pathname === MANAGE_ITINERARY) {
      deleteManagedDayToDay({ day });
    }
  }

  return (
    <>
      <div className='header'>
        <div className='close'>
          <button onClick={closeModal} ref={closeBtnRef}>{CLOSE_ICON}</button>
        </div>
      </div>
      <div className='c-delete-modal'>
        <div className='inner'>
          <h1>Do you want to delete day {day}?</h1>
        </div>
        <div onClick={() => deleteDay()} type='button'>
          <DeleteButton
            background='#f50057'
            className='delete-event-cta'
            text='Delete'
          />
        </div>
      </div>
    </>
  );
}

DeleteDayConfirmationModal.prototypes = {
  modalUiPayload: PropTypes.object,
};

export default DeleteDayConfirmationModal;
