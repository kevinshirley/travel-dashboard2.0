import React from 'react';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { ADD_CIRCLE_OUTLINE_ICON, SPACING, KEYBOARD_ARROW_RIGHT_ICON } from 'src/components/material-ui/icons';
import Button from 'src/components/material-ui/text-button';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { MODALS } from 'src/store/constants/modals';
import { selectLimitedCustomerNotes } from 'src/store/selectors/customers';

const BEM_BLOCK = 'c-customers-side-menu-tabs';

function CustomerSideMenuProfileNotes() {
  const openModal = useAction(actions.ui.openModal);
  const limitedCustomerNotes = useSelector(selectLimitedCustomerNotes);

  return (
    <div className={`${BEM_BLOCK}__notes-wrapper`}>
      <div className={`${BEM_BLOCK}__notes`}>
        {limitedCustomerNotes && limitedCustomerNotes.map(noteItem => (
          <div className={`${BEM_BLOCK}__note`} key={noteItem.id}>
            <span className={`${BEM_BLOCK}__note-date`}>{moment(noteItem.createdAt).format('L')} {moment(noteItem.createdAt).format('LT')}</span>
            <span className={`${BEM_BLOCK}__note-text`}>{noteItem.note}</span>
          </div>
        ))}
        <span className={`${BEM_BLOCK}__see-more-notes`}>See more notes{SPACING}{KEYBOARD_ARROW_RIGHT_ICON}</span>
      </div>
      <div className={`${BEM_BLOCK}__notes-btn-wrapper`}>
        <Button
          className={`${BEM_BLOCK}__notes-btn`}
          onClick={() => openModal({
            modal: MODALS.ADD_NOTES,
          })}
        >
          {ADD_CIRCLE_OUTLINE_ICON}{SPACING}Add note
        </Button>
      </div>
    </div>
  );
}

export default CustomerSideMenuProfileNotes;
