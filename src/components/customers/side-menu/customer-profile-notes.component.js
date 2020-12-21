import React from 'react';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { isEmpty } from 'ramda';
import { ADD_CIRCLE_OUTLINE_ICON, SPACING, KEYBOARD_ARROW_RIGHT_ICON } from 'src/components/material-ui/icons';
import Button from 'src/components/material-ui/text-button';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { MODALS } from 'src/store/constants/modals';
import { selectLimitedCustomerNotes, selectIsCustomerNotesMoreThanLimited } from 'src/store/selectors/customers';

const BEM_BLOCK = 'c-customers-side-menu-tabs';

function CustomerSideMenuProfileNotes() {
  const openModal = useAction(actions.ui.openModal);
  const limitedCustomerNotes = useSelector(selectLimitedCustomerNotes);
  const isCustomerNotesMoreThanLimited = useSelector(selectIsCustomerNotesMoreThanLimited);

  return (
    <div className={`${BEM_BLOCK}__notes-wrapper`}>
      {!isEmpty(limitedCustomerNotes) && (
        <div className={`${BEM_BLOCK}__notes`}>
          {limitedCustomerNotes && limitedCustomerNotes.map(noteItem => (
            <div className={`${BEM_BLOCK}__note`} key={noteItem.id}>
              <span className={`${BEM_BLOCK}__note-date`}>{moment(noteItem.createdAt).format('L')} {moment(noteItem.createdAt).format('LT')}</span>
              <span className={`${BEM_BLOCK}__note-text`}>{noteItem.note}</span>
            </div>
          ))}
          {isCustomerNotesMoreThanLimited && (
            <span className={`${BEM_BLOCK}__see-more-notes`}>See more notes{SPACING}{KEYBOARD_ARROW_RIGHT_ICON}</span>
          )}
        </div>
      )}
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
