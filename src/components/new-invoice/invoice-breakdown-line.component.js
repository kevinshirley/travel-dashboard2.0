import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const BEM_BLOCK = 'c-new-invoice';

function InvoiceBreakdownLine({
  itemName,
  itemdescription,
  qty,
  total,
  unitCost,
}) {
  const itemNameState = {'item-name-state': 'display'};
  const editItemNameState = {'item-name-state': 'edit'};

  const itemDescriptionState = {'item-description-state': 'display'};
  const editItemDescriptionState = {'item-description-state': 'edit'};

  const [shouldEditItemName, setShouldEditItemName] = useState(false);
  const [shouldEditItemDescription, setShouldEditItemDescription] = useState(false);
  const [itemNameValue, setItemNameValue] = useState(itemName);
  const [itemDescriptionValue, setItemDescriptionValue] = useState(itemdescription);

  const editItemNameRef = useRef();

  const onToggleItemNameState = e => {
    const targetState = e.target.getAttribute('item-name-state');

    if (targetState === 'display') {
      setShouldEditItemName(true);
      editItemNameRef.current.focus();
    } else if (targetState === 'edit') {
      setShouldEditItemName(false);
    }
  };

  const onToggleItemDescriptionState = e => {
    const targetState = e.target.getAttribute('item-description-state');

    if (targetState === 'display') {
      setShouldEditItemDescription(true);
      editItemNameRef.current.focus();
    } else if (targetState === 'edit') {
      setShouldEditItemDescription(false);
    }
  };

  const itemNameClasses = cx(`${BEM_BLOCK}__item--item-name`, {
    [`${BEM_BLOCK}__item--item-name--hidden`]: shouldEditItemName,
  });

  const editItemNameClasses = cx(`${BEM_BLOCK}__item--edit-item-name`, {
    [`${BEM_BLOCK}__item--edit-item-name--hidden`]: !shouldEditItemName,
  });

  const itemDescriptionClasses = cx(`${BEM_BLOCK}__item--item-desc`, {
    [`${BEM_BLOCK}__item--item-desc--hidden`]: shouldEditItemDescription,
  });

  const editItemDescriptionClasses = cx(`${BEM_BLOCK}__item--edit-item-desc`, {
    [`${BEM_BLOCK}__item--edit-item-desc--hidden`]: !shouldEditItemDescription,
  });

  return (
    <div className={`${BEM_BLOCK}__row--line`}>
      <div className={`${BEM_BLOCK}__description--item`}>
        <span
          className={itemNameClasses}
          onClick={e => onToggleItemNameState(e)}
          {...itemNameState}
        >
          {itemNameValue ? itemNameValue : 'Enter an item name'}
        </span>
        <input
          className={editItemNameClasses}
          type='text'
          name='itemName'
          placeholder='Enter an item name'
          onBlur={e => onToggleItemNameState(e)}
          onChange={e => setItemNameValue(e.target.value)}
          ref={editItemNameRef}
          {...editItemNameState}
        />
        <span
          className={itemDescriptionClasses}
          onClick={e => onToggleItemDescriptionState(e)}
          {...itemDescriptionState}
        >
          {itemDescriptionValue ? itemDescriptionValue : 'Enter an item description'}
        </span>
        <input
          className={editItemDescriptionClasses}
          type='text'
          name='itemDescription'
          placeholder='Enter an item description'
          onBlur={e => onToggleItemDescriptionState(e)}
          onChange={e => setItemDescriptionValue(e.target.value)}
          {...editItemDescriptionState}
        />
      </div>
      <div className={`${BEM_BLOCK}__totals--items`}>
        <div className={`${BEM_BLOCK}__unit-cost-item--content`}>
          <span className={`${BEM_BLOCK}__item--price`}>
            {`$${unitCost}`}
          </span>
          <span className={`${BEM_BLOCK}__item--tax`}>
            +HST
          </span>
        </div>
        <span className={`${BEM_BLOCK}__qty-item--content`}>{qty}</span>
        <span className={`${BEM_BLOCK}__amount-item--content`}>{`$${total}`}</span>
      </div>
    </div>
  );
}

InvoiceBreakdownLine.prototypes = {
  itemName: PropTypes.string,
  itemdescription: PropTypes.string,
  qty: PropTypes.number,
  total: PropTypes.number,
  unitCost: PropTypes.number,
};

export default InvoiceBreakdownLine;
