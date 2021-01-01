import React from 'react';
import PropTypes from 'prop-types';

const BEM_BLOCK = 'c-new-invoice';

function InvoiceBreakdownLine({
  itemName,
  itemdescription,
  qty,
  total,
  unitCost,
}) {
  return (
    <div className={`${BEM_BLOCK}__row--line`}>
      <div className={`${BEM_BLOCK}__description--item`}>
        <span className={`${BEM_BLOCK}__item--title`}>{itemName ? itemName : 'Enter an item name'}</span>
        <span className={`${BEM_BLOCK}__item--sub-title`}>{itemdescription ? itemdescription : 'Enter an item description'}</span>
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
