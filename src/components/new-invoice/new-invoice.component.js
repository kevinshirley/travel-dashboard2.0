// import 'date-fns';
import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { SPACING, CALENDAR_TODAY_ICON } from 'src/components/material-ui/icons';
import { formatPrice } from 'src/utils/string';
import InvoiceBreakdownLine from 'src/components/new-invoice/invoice-breakdown-line.component';
// import DatePicker from 'react-datepicker';
import DatePicker from 'src/components/common/date-picker';

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
  const [repFirstNameValue, setRepFirstNameValue] = useState('');
  const [repLastNameValue, setRepLastNameValue] = useState('');
  const [repPhoneNumberValue, setRepPhoneNumberValue] = useState('');

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
  const repPhoneNumberState = {'rep-phone-number-state': 'display'};
  const editRepPhoneNumberState = {'rep-phone-number-state': 'edit'};

  const [shouldEditInvoiceNumber, setShouldEditInvoiceNumber] = useState(false);
  const [shouldEditReferenceNumber, setShouldEditReferenceNumber] = useState(false);
  const [shouldEditCompanyName, setShouldEditCompanyName] = useState(false);
  const [shouldEditRepFirstName, setShouldEditRepFirstName] = useState(false);
  const [shouldEditRepLastName, setShouldEditRepLastName] = useState(false);
  const [shouldEditRepPhoneNumber, setShouldEditRepPhoneNumber] = useState(false);

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

  const repFirstNameClasses = cx(`${BEM_BLOCK}__rep-first-name`, {
    [`${BEM_BLOCK}__rep-first-name--hidden`]: shouldEditRepFirstName,
  });

  const editRepFirstNameClasses = cx(`${BEM_BLOCK}__edit-rep-first-name`, {
    [`${BEM_BLOCK}__edit-rep-first-name--hidden`]: !shouldEditRepFirstName,
  });

  const repLastNameClasses = cx(`${BEM_BLOCK}__rep-last-name`, {
    [`${BEM_BLOCK}__rep-last-name--hidden`]: shouldEditRepLastName,
  });

  const editRepLastNameClasses = cx(`${BEM_BLOCK}__edit-rep-last-name`, {
    [`${BEM_BLOCK}__edit-rep-last-name--hidden`]: !shouldEditRepLastName,
  });

  const repPhoneNumberClasses = cx(`${BEM_BLOCK}__rep-phone-number`, {
    [`${BEM_BLOCK}__rep-phone-number--hidden`]: shouldEditRepPhoneNumber,
  });

  const editRepPhoneNumberClasses = cx(`${BEM_BLOCK}__edit-rep-phone-number`, {
    [`${BEM_BLOCK}__edit-rep-phone-number--hidden`]: !shouldEditRepPhoneNumber,
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

  const onSetDueDate = value => {
    setDueDate(value);
  };

  const onSetDateIssued = value => {
    setDateIssued(value);
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

  const onToggleRepFirstNameState = e => {
    const targetState = e.target.getAttribute('rep-first-name-state');

    if (targetState === 'display') {
      setShouldEditRepFirstName(true);
    } else if (targetState === 'edit') {
      setShouldEditRepFirstName(false);
    }
  };

  const onToggleRepLastNameState = e => {
    const targetState = e.target.getAttribute('rep-last-name-state');

    if (targetState === 'display') {
      setShouldEditRepLastName(true);
    } else if (targetState === 'edit') {
      setShouldEditRepLastName(false);
    }
  };

  const onToggleRepPhoneNumberState = e => {
    const targetState = e.target.getAttribute('rep-phone-number-state');

    if (targetState === 'display') {
      setShouldEditRepPhoneNumber(true);
    } else if (targetState === 'edit') {
      setShouldEditRepPhoneNumber(false);
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
                    className={repFirstNameClasses}
                    onClick={e => onToggleRepFirstNameState(e)}
                    {...repFirstNameState}
                  >
                    {repFirstNameValue ? repFirstNameValue : 'First name'}
                  </span>
                  {SPACING}
                  <span
                    className={repLastNameClasses}
                    onClick={e => onToggleRepLastNameState(e)}
                    {...repLastNameState}
                  >
                    {repLastNameValue ? repLastNameValue : 'Last name'}
                  </span>
                </span>
                <span  className={`${BEM_BLOCK}__edit-company-rep-name--wrapper`}>
                  <input
                    className={editRepFirstNameClasses}
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    onBlur={e => onToggleRepFirstNameState(e)}
                    onChange={e => setRepFirstNameValue(e.target.value)}
                    value={repFirstNameValue}
                    {...editRepFirstNameState}
                  />
                  {SPACING}
                  <input
                    className={editRepLastNameClasses}
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    onBlur={e => onToggleRepLastNameState(e)}
                    onChange={e => setRepLastNameValue(e.target.value)}
                    value={repLastNameValue}
                    {...editRepLastNameState}
                  />
                </span>
              </div>
              <div className={`${BEM_BLOCK}__company-representative-number`}>
                <span
                  className={repPhoneNumberClasses}
                  onClick={e => onToggleRepPhoneNumberState(e)}
                  {...repPhoneNumberState}
                >
                  {repPhoneNumberValue ? repPhoneNumberValue : 'Phone Number'}
                </span>
                <input
                  className={editRepPhoneNumberClasses}
                  type='text'
                  name='phoneNumber'
                  placeholder='Phone Number'
                  onBlur={e => onToggleRepPhoneNumberState(e)}
                  onChange={e => setRepPhoneNumberValue(e.target.value)}
                  value={repPhoneNumberValue}
                  {...editRepPhoneNumberState}
                />
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
                // onClick={() => dateIssuedRef.current.setFocus()}
              >
                <DatePicker isVisible={true} onSetDate={onSetDateIssued} />
              </div>
            </div>
            <div className={`${BEM_BLOCK}__due-date`}>
              <span className={`${BEM_BLOCK}__due-date-title`}>Due Date</span>
              <div
                className={`${BEM_BLOCK}__date--wrapper`}
                // onClick={() => dueDateRef.current.setFocus()}
              >
                <DatePicker isVisible={true} onSetDate={onSetDueDate} />
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
