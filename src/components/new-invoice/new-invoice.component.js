import 'date-fns';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { SPACING, CALENDAR_TODAY_ICON } from 'src/components/material-ui/icons';
import { formatPrice } from 'src/utils/string';
import InvoiceBreakdownLine from 'src/components/new-invoice/invoice-breakdown-line.component';
import DatePicker from 'react-datepicker';

const BEM_BLOCK = 'c-new-invoice';

function NewInvoice() {
  const [breakdownLines, setBreakdownLines] = useState([]);
  const [totalAmountDue, setTotalAmountDue] = useState(0);

  const [dueDate, setDueDate] = useState(new Date());
  const [dateIssued, setDateIssued] = useState(new Date());

  const dueDateRef = useRef(null);
  const dateIssuedRef = useRef(null);

  const [invoiceNumberValue, setInvoiceNumberValue] = useState('0000000001');
  const [referenceNumberValue, setReferenceNumberValue] = useState('');
  const [companyNameValue, setCompanyNameValue] = useState('');

  const invoiceNumberState = {'invoice-number-state': 'display'};
  const editInvoiceNumberState = {'invoice-number-state': 'edit'};
  const referenceNumberState = {'reference-number-state': 'display'};
  const editReferenceNumberState = {'reference-number-state': 'edit'};
  const companyNameState = {'company-name-state': 'display'};
  const editCompanyNameState = {'company-name-state': 'edit'};
  const repFirstNameState = {'rep-first-name-state': 'display'};
  const editRepFirstNameState = {'rep-first-name-state': 'edit'};
  const repLastNameState = {'rep-last-name-state': 'display'};
  const editRepLastNameState = {'rep-last-name-state': 'edit'};

  const [shouldEditInvoiceNumber, setShouldEditInvoiceNumber] = useState(false);
  const [shouldEditReferenceNumber, setShouldEditReferenceNumber] = useState(false);
  const [shouldEditCompanyName, setShouldEditCompanyName] = useState(false);

  const invoiceNumberClasses = cx(`${BEM_BLOCK}__number`, {
    [`${BEM_BLOCK}__number--hidden`]: shouldEditInvoiceNumber,
  });

  const editInvoiceNumberClasses = cx(`${BEM_BLOCK}__edit-number`, {
    [`${BEM_BLOCK}__edit-number--hidden`]: !shouldEditInvoiceNumber,
  });

  const referenceNumberClasses = cx(`${BEM_BLOCK}__number`, {
    [`${BEM_BLOCK}__number--hidden`]: shouldEditReferenceNumber,
  });

  const editReferenceNumberClasses = cx(`${BEM_BLOCK}__edit-number`, {
    [`${BEM_BLOCK}__edit-number--hidden`]: !shouldEditReferenceNumber,
  });

  const companyNameClasses = cx(`${BEM_BLOCK}__company-name-value`, {
    [`${BEM_BLOCK}__company-name-value--hidden`]: shouldEditCompanyName,
  });

  const editCompanyNameClasses = cx(`${BEM_BLOCK}__edit-company-name-value`, {
    [`${BEM_BLOCK}__edit-company-name-value--hidden`]: !shouldEditCompanyName,
  });

  const onAddNewBreakdownLine = () => {
    setBreakdownLines([
      ...breakdownLines,
      {
        index: breakdownLines.length+1,
        unitCost: 0,
        qty: 1,
        total: 0,
        itemName: '',
        itemdescription: '',
      },
    ]);
  };

  const onSetTotalAmountDue = data => {
    if (data.previousAmountTotal > 0) {
      const newTotal = totalAmountDue-data.previousAmountTotal;
      setTotalAmountDue(newTotal+data.amountTotal);
    } else {
      setTotalAmountDue(totalAmountDue+data.amountTotal);
    }
  };

  const onToggleInvoiceNumberState = e => {
    const targetState = e.target.getAttribute('invoice-number-state');

    if (targetState === 'display') {
      setShouldEditInvoiceNumber(true);
    } else if (targetState === 'edit') {
      setShouldEditInvoiceNumber(false);
    }
  };

  const onToggleReferenceNumberState = e => {
    const targetState = e.target.getAttribute('reference-number-state');

    if (targetState === 'display') {
      setShouldEditReferenceNumber(true);
    } else if (targetState === 'edit') {
      setShouldEditReferenceNumber(false);
    }
  };

  const onToggleCompanyNameState = e => {
    const targetState = e.target.getAttribute('company-name-state');

    if (targetState === 'display') {
      setShouldEditCompanyName(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyName(false);
    }
  };

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
                <span
                  className={companyNameClasses}
                  onClick={e => onToggleCompanyNameState(e)}
                  {...companyNameState}
                >
                  {companyNameValue ? companyNameValue : 'Company Name'}
                </span>
                <input
                  className={editCompanyNameClasses}
                  type='text'
                  name='companyName'
                  placeholder='Company Name'
                  onBlur={e => onToggleCompanyNameState(e)}
                  onChange={e => setCompanyNameValue(e.target.value)}
                  value={companyNameValue}
                  {...editCompanyNameState}
                />
              </div>
              <div className={`${BEM_BLOCK}__company-representative-name`}>
                <span  className={`${BEM_BLOCK}__company-rep-name--wrapper`}>
                  <span
                    {...repFirstNameState}
                  >
                    David
                  </span>
                  {SPACING}
                  <span
                    {...repLastNameState}
                  >
                    Delcy-Dubourg
                  </span>
                </span>
                <span  className={`${BEM_BLOCK}__edit-company-rep-name--wrapper`}>
                  <input
                    className={editCompanyNameClasses}
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onBlur={e => onToggleCompanyNameState(e)}
                    onChange={e => setCompanyNameValue(e.target.value)}
                    value={companyNameValue}
                    {...editRepFirstNameState}
                  />
                  <input
                    className={editCompanyNameClasses}
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    onBlur={e => onToggleCompanyNameState(e)}
                    onChange={e => setCompanyNameValue(e.target.value)}
                    value={companyNameValue}
                    {...editRepLastNameState}
                  />
                </span>
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
            <span className={`${BEM_BLOCK}__client-business-name`}></span>
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
              <div
                className={`${BEM_BLOCK}__date--wrapper`}
                onClick={() => dateIssuedRef.current.setFocus()}
              >
                <DatePicker
                  className={`${BEM_BLOCK}__date`}
                  selected={dateIssued}
                  onChange={date => setDateIssued(date)}
                  ref={dateIssuedRef}
                />
                {CALENDAR_TODAY_ICON}
              </div>
            </div>
            <div className={`${BEM_BLOCK}__due-date`}>
              <span className={`${BEM_BLOCK}__due-date-title`}>Due Date</span>
              <div
                className={`${BEM_BLOCK}__date--wrapper`}
                onClick={() => dueDateRef.current.setFocus()}
              >
                <DatePicker
                  className={`${BEM_BLOCK}__date`}
                  selected={dueDate}
                  onChange={date => setDueDate(date)}
                  ref={dueDateRef}
                />
                {CALENDAR_TODAY_ICON}
              </div>
            </div>
          </div>
          <div className={`${BEM_BLOCK}__invoice-id`}>
            <div className={`${BEM_BLOCK}__invoice-number`}>
              <span className={`${BEM_BLOCK}__invoice-number-title`}>
                Invoice Number
              </span>
              <span
                className={invoiceNumberClasses}
                onClick={e => onToggleInvoiceNumberState(e)}
                {...invoiceNumberState}
              >
                {invoiceNumberValue ? invoiceNumberValue : 'Enter invoice number'}
              </span>
              <input
                className={editInvoiceNumberClasses}
                type='text'
                name='invoiceNumber'
                placeholder='Enter invoice number'
                onBlur={e => onToggleInvoiceNumberState(e)}
                onChange={e => setInvoiceNumberValue(e.target.value)}
                value={invoiceNumberValue}
                {...editInvoiceNumberState}
              />
            </div>
            <div className={`${BEM_BLOCK}__reference-number`}>
              <span className={`${BEM_BLOCK}__reference-number-title`}>Reference</span>
              <span
                className={referenceNumberClasses}
                onClick={e => onToggleReferenceNumberState(e)}
                {...referenceNumberState}
              >
                {referenceNumberValue ? referenceNumberValue : 'Enter reference number'}
              </span>
              <input
                className={editReferenceNumberClasses}
                type='text'
                name='referenceNumber'
                placeholder='Enter reference number'
                onBlur={e => onToggleReferenceNumberState(e)}
                onChange={e => setReferenceNumberValue(e.target.value)}
                value={referenceNumberValue}
                {...editReferenceNumberState}
              />
            </div>
          </div>
          <div className={`${BEM_BLOCK}__amount-due`}>
            <span className={`${BEM_BLOCK}__amount-due-title`}>Amount Due (USD)</span>
            <span className={`${BEM_BLOCK}__amount`}>${formatPrice(totalAmountDue)}</span>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__invoice-message`}>
          <span className={`${BEM_BLOCK}__message`}>
            This is for your trip itinerary to Venezuela. Thanks for your business and please contact for more details.
          </span>
        </div>
        <div className={`${BEM_BLOCK}__invoice-breakdown`}>
          <div className={`${BEM_BLOCK}__row--titles`}>
            <div className={`${BEM_BLOCK}__description--title`}>
              <span className={`${BEM_BLOCK}__title`}>Description</span>
            </div>
            <div className={`${BEM_BLOCK}__totals`}>
              <span className={`${BEM_BLOCK}__unit-cost--title`}>Unit Cost</span>
              <span className={`${BEM_BLOCK}__qty--title`}>Qty</span>
              <span className={`${BEM_BLOCK}__amount--title`}>Amount</span>
            </div>
          </div>
          {breakdownLines.map(line => {
            return (
              <InvoiceBreakdownLine
                key={line.index}
                setTotalAmountDue={onSetTotalAmountDue}
                {...line}
              />
            );
          })}
          <div className={`${BEM_BLOCK}__row--add-line`} onClick={() => onAddNewBreakdownLine()}>
            <div className={`${BEM_BLOCK}__row--add-line--text`}>
              <span>+</span>{SPACING}{SPACING}Add a Line
            </div>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__invoice-summary`}>
          <div className={`${BEM_BLOCK}__invoice-summary-inner`}>
            <div className={`${BEM_BLOCK}__subtotal`}>
              <div className={`${BEM_BLOCK}__title`}>
                <span>Subtotal</span>
              </div>
              <div className={`${BEM_BLOCK}__amount`}>
                <span>${formatPrice(totalAmountDue)}</span>
              </div>
            </div>
            <div className={`${BEM_BLOCK}__tax`}>
              <div className={`${BEM_BLOCK}__title`}>
                <span>Tax</span>
              </div>
              <div className={`${BEM_BLOCK}__amount`}>
                <span>${formatPrice(0)}</span>
              </div>
            </div>
            <div className={`${BEM_BLOCK}__total`}>
              <div className={`${BEM_BLOCK}__title`}>
                <span>Total</span>
              </div>
              <div className={`${BEM_BLOCK}__amount`}>
                <span>${formatPrice(totalAmountDue)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__terms`}>
          <span className={`${BEM_BLOCK}__terms--title`}>Terms</span>
          <span className={`${BEM_BLOCK}__terms--content`}>Payment is required within 30 days. Thanks for your business.</span>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
