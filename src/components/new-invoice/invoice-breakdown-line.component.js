import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatPrice } from 'src/utils/string';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

const BEM_BLOCK = 'c-new-invoice';

function InvoiceBreakdownLine({
  id,
  itemName,
  itemdescription,
  qty,
  unitCost,
  setTotalAmountDue,
}) {
  const updateInvoiceItem = useAction(actions.invoices.updateInvoiceItem);

  const itemNameState = {'item-name-state': 'display'};
  const editItemNameState = {'item-name-state': 'edit'};

  const itemDescriptionState = {'item-description-state': 'display'};
  const editItemDescriptionState = {'item-description-state': 'edit'};

  const itemQtyState = {'item-qty-state': 'display'};
  const editItemQtyState = {'item-qty-state': 'edit'};

  const totalAmountState = {'total-amount-state': 'display'};
  const editTotalAmountState = {'total-amount-state': 'edit'};

  const unitCostState = {'unit-cost-state': 'display'};
  const editUnitCostState = {'unit-cost-state': 'edit'};

  const [previousTotalAmountValue, setPreviousTotalAmountValue] = useState(0);

  const [shouldEditItemName, setShouldEditItemName] = useState(false);
  const [shouldEditItemDescription, setShouldEditItemDescription] = useState(false);
  const [shouldEditItemQty, setShouldEditItemQty] = useState(false);
  const [shouldEditTotalAmount, setShouldEditTotalAmount] = useState(false);
  const [shouldEditUnitCost, setShouldEditUnitCost] = useState(false);

  const [itemNameValue, setItemNameValue] = useState(itemName);
  const [itemDescriptionValue, setItemDescriptionValue] = useState(itemdescription);
  const [itemQtyValue, setItemQtyValue] = useState(qty);
  const [unitCostValue, setUnitCostValue] = useState(unitCost);
  const [taxValue, setTaxValue] = useState([]);
  const [totalAmountValue, setTotalAmountValue] = useState(unitCost);

  const editItemNameRef = useRef(null);

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
    } else if (targetState === 'edit') {
      setShouldEditItemDescription(false);
    }
  };

  const onToggleItemQtyState = e => {
    const targetState = e.target.getAttribute('item-qty-state');

    if (targetState === 'display') {
      setShouldEditItemQty(true);
    } else if (targetState === 'edit') {
      setShouldEditItemQty(false);
    }
  };

  const onToggleTotalAmountState = e => {
    const targetState = e.target.getAttribute('total-amount-state');

    if (targetState === 'display') {
      setShouldEditTotalAmount(true);
    } else if (targetState === 'edit') {
      setShouldEditTotalAmount(false);
    }
  };

  const onToggleUnitCostState = e => {
    const targetState = e.target.getAttribute('unit-cost-state');

    if (targetState === 'display') {
      setShouldEditUnitCost(true);
    } else if (targetState === 'edit') {
      setShouldEditUnitCost(false);
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

  const itemQtyClasses = cx(`${BEM_BLOCK}__qty-item--content`, {
    [`${BEM_BLOCK}__qty-item--content--hidden`]: shouldEditItemQty,
  });

  const editItemQtyClasses = cx(`${BEM_BLOCK}__edit-qty-item--content`, {
    [`${BEM_BLOCK}__edit-qty-item--content--hidden`]: !shouldEditItemQty,
  });

  const totalAmountClasses = cx(`${BEM_BLOCK}__total-amount--content`, {
    [`${BEM_BLOCK}__total-amount--content--hidden`]: shouldEditTotalAmount,
  });

  const editTotalAmountClasses = cx(`${BEM_BLOCK}__edit-total-amount--content`, {
    [`${BEM_BLOCK}__edit-total-amount--content--hidden`]: !shouldEditTotalAmount,
  });

  const unitCostClasses = cx(`${BEM_BLOCK}__item--price`, {
    [`${BEM_BLOCK}__item--price--hidden`]: shouldEditUnitCost,
  });

  const editUnitCostClasses = cx(`${BEM_BLOCK}__edit-item--price`, {
    [`${BEM_BLOCK}__edit-item--price--hidden`]: !shouldEditUnitCost,
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
          onBlur={e => {
            onToggleItemNameState(e);
            updateInvoiceItem({ id, name: e.target.value });
          }}
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
          onBlur={e => {
            onToggleItemDescriptionState(e);
            updateInvoiceItem({ id, description: e.target.value });
          }}
          onChange={e => setItemDescriptionValue(e.target.value)}
          {...editItemDescriptionState}
        />
      </div>
      <div className={`${BEM_BLOCK}__totals--items`}>
        <div className={`${BEM_BLOCK}__unit-cost-item--content`}>
          <span
            className={unitCostClasses}
            onClick={e => onToggleUnitCostState(e)}
            {...unitCostState}
          >
            {`$${formatPrice(Number(unitCostValue))}`}
          </span>
          <input
            className={editUnitCostClasses}
            type='text'
            name='unitCost'
            placeholder='Cost'
            onBlur={e => {
              onToggleUnitCostState(e);
              setTotalAmountDue({
                amountTotal: Number(e.target.value)*itemQtyValue,
                previousAmountTotal: previousTotalAmountValue,
              });
              setPreviousTotalAmountValue(Number(e.target.value)*itemQtyValue);
              console.log('update invoice item unit cost', id);
            }}
            onChange={e => {
              setUnitCostValue(e.target.value);
              setTotalAmountValue(Number(e.target.value)*itemQtyValue);
            }}
            value={unitCostValue}
            {...editUnitCostState}
          />
          <span className={`${BEM_BLOCK}__item--tax`}>
            +HST
          </span>
        </div>
        <span
          className={itemQtyClasses}
          onClick={e => onToggleItemQtyState(e)}
          {...itemQtyState}
        >
          {itemQtyValue}
        </span>
        <input
          className={editItemQtyClasses}
          type='text'
          name='itemQty'
          placeholder='Qty'
          onBlur={e => {
            onToggleItemQtyState(e);
            setTotalAmountDue({
              amountTotal: Number(totalAmountValue),
              previousAmountTotal: previousTotalAmountValue,
            });
            setPreviousTotalAmountValue(Number(totalAmountValue));
            console.log('update invoice item quantity', id);
          }}
          onChange={e => {
            const newQty = Number(e.target.value);
            setItemQtyValue(newQty);
            const newTotalAmount = newQty * unitCostValue;
            setTotalAmountValue(newTotalAmount);
          }}
          value={itemQtyValue}
          {...editItemQtyState}
        />
        <span
          className={totalAmountClasses}
          {...totalAmountState}
        >
          {`$${formatPrice(Number(totalAmountValue))}`}
        </span>
        <input
          className={editTotalAmountClasses}
          type='text'
          name='invoiceTotal'
          placeholder='Total amount'
          onBlur={e => onToggleTotalAmountState(e)}
          onChange={e => setTotalAmountValue(e.target.value)}
          value={totalAmountValue}
          {...editTotalAmountState}
        />
      </div>
    </div>
  );
}

InvoiceBreakdownLine.prototypes = {
  itemName: PropTypes.string,
  itemdescription: PropTypes.string,
  qty: PropTypes.number,
  unitCost: PropTypes.number,
  setTotalAmountDue: PropTypes.func,
};

export default InvoiceBreakdownLine;
