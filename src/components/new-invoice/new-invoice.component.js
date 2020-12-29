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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
