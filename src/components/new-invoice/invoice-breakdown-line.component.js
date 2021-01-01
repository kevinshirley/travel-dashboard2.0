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
  const [shouldEditItemName, setShouldEditItemName] = useState(false);
  const [itemNameValue, setItemNameValue] = useState(itemName);
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

  const itemNameClasses = cx(`${BEM_BLOCK}__item--title`, {
    [`${BEM_BLOCK}__item--title--hidden`]: shouldEditItemName,
  });

  const editItemNameClasses = cx(`${BEM_BLOCK}__item--edit-title`, {
    [`${BEM_BLOCK}__item--edit-title--hidden`]: !shouldEditItemName,
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
        <span className={`${BEM_BLOCK}__item--sub-title`}>
          {itemdescription ? itemdescription : 'Enter an item description'}
        </span>
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
