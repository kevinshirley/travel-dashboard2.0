import React from 'react';
import PropTypes from 'prop-types';

const BEM_BLOCK = 'c-new-invoice';

function NewInvoice() {
  return (
    <div  className={`${BEM_BLOCK}`}>
      <div className={`${BEM_BLOCK}__invoice`}>
        <div className={`${BEM_BLOCK}__company-details`}>
          <div className={`${BEM_BLOCK}__company-logo`}>
            <div className={`${BEM_BLOCK}__company-logo-text`}>
              Drag your logo here,
              <br />
              or <a href='/'>select a file</a>
            </div>
          </div>
          <div className={`${BEM_BLOCK}__company-info`}>
            <div className={`${BEM_BLOCK}__company-representative-contact`}>
              <div className={`${BEM_BLOCK}__company-name`}>
                <span>Trip Imagine</span>
              </div>
              <div className={`${BEM_BLOCK}__company-representative-name`}>
                <span>David Delcy-Dubourg</span>
              </div>
              <div className={`${BEM_BLOCK}__company-representative-number`}>
                <span>514-922-1846</span>
              </div>
            </div>
            <div className={`${BEM_BLOCK}__company-address`}>
              <span className={`${BEM_BLOCK}__address-line-1`}>1898 RUE JOLIETTE</span>
              <span className={`${BEM_BLOCK}__address-line-2`}></span>
              <span className={`${BEM_BLOCK}__city-state`}>Montreal, Quebec</span>
              <span className={`${BEM_BLOCK}__zip-code`}>H1W3G4</span>
              <span className={`${BEM_BLOCK}__country`}>Canada</span>
            </div>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__client-details`}>
          <div className={`${BEM_BLOCK}__billed-to`}>
            <span className={`${BEM_BLOCK}__billed-to-title`}>Billed To</span>
            <span className={`${BEM_BLOCK}__client-name`}>Chrishelle Moss</span>
            <span className={`${BEM_BLOCK}__address-line-1`}>123 Main street</span>
            <span className={`${BEM_BLOCK}__address-line-2`}></span>
            <span className={`${BEM_BLOCK}__city-state`}>Atlanta, Georgia</span>
            <span className={`${BEM_BLOCK}__zip-code`}>22394</span>
            <span className={`${BEM_BLOCK}__country`}>United States</span>
          </div>
          <div className={`${BEM_BLOCK}__billed-to-date`}>
            <div className={`${BEM_BLOCK}__date-issued`}>
              <span className={`${BEM_BLOCK}__date-issued-title`}>Date Issued</span>
              <span className={`${BEM_BLOCK}__date`}>12/28/2020</span>
            </div>
            <div className={`${BEM_BLOCK}__due-date`}>
              <span className={`${BEM_BLOCK}__due-date-title`}>Due Date</span>
              <span className={`${BEM_BLOCK}__date`}>01/12/2021</span>
            </div>
          </div>
          <div className={`${BEM_BLOCK}__invoice-id`}>
            <div className={`${BEM_BLOCK}__invoice-number`}>
              <span className={`${BEM_BLOCK}__invoice-number-title`}>Invoice Number</span>
              <span className={`${BEM_BLOCK}__number`}>1000011111222000</span>
            </div>
            <div className={`${BEM_BLOCK}__reference-number`}>
              <span className={`${BEM_BLOCK}__reference-number-title`}>Reference</span>
              <span className={`${BEM_BLOCK}__number`}>363528</span>
            </div>
          </div>
          <div className={`${BEM_BLOCK}__amount-due`}>
            <span className={`${BEM_BLOCK}__amount-due-title`}>Amount Due (USD)</span>
            <span className={`${BEM_BLOCK}__amount`}>$2232.99</span>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__invoice-message`}>
          <span className={`${BEM_BLOCK}__message`}>
            This is for your trip itinerary to Venezuela. Thanks for your business and please contact for more details.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
