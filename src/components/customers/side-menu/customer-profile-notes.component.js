import React from 'react';
import { useSelector } from 'react-redux';
import * as moment from 'moment';
import { ADD_CIRCLE_OUTLINE_ICON, SPACING } from 'src/components/material-ui/icons';
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
            <span>{moment(noteItem.createdAt).format('L')} {moment(noteItem.createdAt).format('LT')}</span>
            <span>{noteItem.note}</span>
          </div>
        ))}
      </div>
      <div className={`${BEM_BLOCK}__notes-btn-wrapper`}>
        <Button
          className={`${BEM_BLOCK}__notes-btn`}
          onClick={() => openModal({
            modal: MODALS.ADD_NOTES,
          })}
        >
          {ADD_CIRCLE_OUTLINE_ICON}{SPACING}Add notes
        </Button>
      </div>
    </div>
  );
}

export default CustomerSideMenuProfileNotes;
