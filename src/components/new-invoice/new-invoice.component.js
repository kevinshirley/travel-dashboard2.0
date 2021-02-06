import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { SPACING } from 'src/components/material-ui/icons';
import { formatPrice } from 'src/utils/string';
import InvoiceBreakdownLine from 'src/components/new-invoice/invoice-breakdown-line.component';
import DatePicker from 'src/components/common/date-picker';
import uuidv4 from 'src/utils/uuidv4';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

const BEM_BLOCK = 'c-new-invoice';

function NewInvoice() {
  const invoiceId = uuidv4();

  const addInvoiceItem = useAction(actions.invoices.addInvoiceItem);
  const updateInvoice = useAction(actions.invoices.updateInvoice);

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
  const [companyStreetAddressValue, setCompanyStreetAddressValue] = useState('');
  const [companyCityValue, setCompanyCityValue] = useState('');
  const [companyStateValue, setCompanyStateValue] = useState('');
  const [companyZipCodeValue, setCompanyZipCodeValue] = useState('');
  const [companyCountryValue, setCompanyCountryValue] = useState('');
  const [clientFirstNameValue, setClientFirstNameValue] = useState('');
  const [clientLastNameValue, setClientLastNameValue] = useState('');
  const [clientStreetAddressValue, setClientStreetAddressValue] = useState('');
  const [clientCityValue, setClientCityValue] = useState('');
  const [clientStateValue, setClientStateValue] = useState('');
  const [clientZipCodeValue, setClientZipCodeValue] = useState('');
  const [clientCountryValue, setClientCountryValue] = useState('');
  const [invoiceMessageValue, setInvoiceMessageValue] = useState('Thanks for your business and please contact for more details.');
  const [termsContentValue, setTermsContentValue] = useState('Payment is required within 30 days. Thanks for your business.');

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
  const companyStreetAddressState = {'company-street-address-state': 'display'};
  const editCompanyStreetAddressState = {'company-street-address-state': 'edit'};
  const companyCityState = {'company-city-state': 'display'};
  const editCompanyCityState = {'company-city-state': 'edit'};
  const companyStateState = {'company-state-state': 'display'};
  const editCompanyStateState = {'company-state-state': 'edit'};
  const companyZipCodeState = {'company-zip-code-state': 'display'};
  const editCompanyZipCodeState = {'company-zip-code-state': 'edit'};
  const companyCountryState = {'company-country-state': 'display'};
  const editCompanyCountryState = {'company-country-state': 'edit'};
  const clientFirstNameState = {'client-first-name-state': 'display'};
  const editClientFirstNameState = {'client-first-name-state': 'edit'};
  const clientLastNameState = {'client-last-name-state': 'display'};
  const editClientLastNameState = {'client-last-name-state': 'edit'};
  const clientStreetAddressState = {'client-street-address-state': 'display'};
  const editClientStreetAddressState = {'client-street-address-state': 'edit'};
  const clientCityState = {'client-city-state': 'display'};
  const editClientCityState = {'client-city-state': 'edit'};
  const clientStateState = {'client-state-state': 'display'};
  const editClientStateState = {'client-state-state': 'edit'};
  const clientZipCodeState = {'client-zip-code-state': 'display'};
  const editClientZipCodeState = {'client-zip-code-state': 'edit'};
  const clientCountryState = {'client-country-state': 'display'};
  const editClientCountryState = {'client-country-state': 'edit'};
  const invoiceMessageState = {'invoice-message-state': 'display'};
  const editInvoiceMessageState = {'invoice-message-state': 'edit'};
  const termsContentState = {'terms-content-state': 'display'};
  const editTermsContentState = {'terms-content-state': 'edit'};

  const [shouldEditInvoiceNumber, setShouldEditInvoiceNumber] = useState(false);
  const [shouldEditReferenceNumber, setShouldEditReferenceNumber] = useState(false);
  const [shouldEditCompanyName, setShouldEditCompanyName] = useState(false);
  const [shouldEditRepFirstName, setShouldEditRepFirstName] = useState(false);
  const [shouldEditRepLastName, setShouldEditRepLastName] = useState(false);
  const [shouldEditRepPhoneNumber, setShouldEditRepPhoneNumber] = useState(false);
  const [shouldEditCompanyStreetAddress, setShouldEditCompanyStreetAddress] = useState(false);
  const [shouldEditCompanyCity, setShouldEditCompanyCity] = useState(false);
  const [shouldEditCompanyState, setShouldEditCompanyState] = useState(false);
  const [shouldEditCompanyZipCode, setShouldEditCompanyZipCode] = useState(false);
  const [shouldEditCompanyCountry, setShouldEditCompanyCountry] = useState(false);
  const [shouldEditClientFirstName, setShouldEditClientFirstName] = useState(false);
  const [shouldEditClientLastName, setShouldEditClientLastName] = useState(false);
  const [shouldEditClientStreetAddress, setShouldEditClientStreetAddress] = useState(false);
  const [shouldEditClientCity, setShouldEditClientCity] = useState(false);
  const [shouldEditClientState, setShouldEditClientState] = useState(false);
  const [shouldEditClientZipCode, setShouldEditClientZipCode] = useState(false);
  const [shouldEditClientCountry, setShouldEditClientCountry] = useState(false);
  const [shouldEditInvoiceMessage, setShouldEditInvoiceMessage] = useState(false);
  const [shouldEditTermsContent, setShouldEditTermsContent] = useState(false);

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

  const companyStreetAddressClasses = cx(`${BEM_BLOCK}__street-address`, {
    [`${BEM_BLOCK}__street-address--hidden`]: shouldEditCompanyStreetAddress,
  });

  const editCompanyStreetAddressClasses = cx(`${BEM_BLOCK}__edit-street-address`, {
    [`${BEM_BLOCK}__edit-street-address--hidden`]: !shouldEditCompanyStreetAddress,
  });

  const companyCityClasses = cx(`${BEM_BLOCK}__city`, {
    [`${BEM_BLOCK}__city--hidden`]: shouldEditCompanyCity,
  });

  const editCompanyCityClasses = cx(`${BEM_BLOCK}__edit-city`, {
    [`${BEM_BLOCK}__edit-city--hidden`]: !shouldEditCompanyCity,
  });

  const companyStateClasses = cx(`${BEM_BLOCK}__state`, {
    [`${BEM_BLOCK}__state--hidden`]: shouldEditCompanyState,
  });

  const editCompanyStateClasses = cx(`${BEM_BLOCK}__edit-state`, {
    [`${BEM_BLOCK}__edit-state--hidden`]: !shouldEditCompanyState,
  });

  const companyZipCodeClasses = cx(`${BEM_BLOCK}__zip-code`, {
    [`${BEM_BLOCK}__zip-code--hidden`]: shouldEditCompanyZipCode,
  });

  const editCompanyZipCodeClasses = cx(`${BEM_BLOCK}__edit-zip-code`, {
    [`${BEM_BLOCK}__edit-zip-code--hidden`]: !shouldEditCompanyZipCode,
  });

  const companyCountryClasses = cx(`${BEM_BLOCK}__country`, {
    [`${BEM_BLOCK}__country--hidden`]: shouldEditCompanyCountry,
  });

  const editCompanyCountryClasses = cx(`${BEM_BLOCK}__edit-country`, {
    [`${BEM_BLOCK}__edit-country--hidden`]: !shouldEditCompanyCountry,
  });

  const clientFirstNameClasses = cx(`${BEM_BLOCK}__client-first-name`, {
    [`${BEM_BLOCK}__client-first-name--hidden`]: shouldEditClientFirstName,
  });

  const editClientFirstNameClasses = cx(`${BEM_BLOCK}__edit-client-first-name`, {
    [`${BEM_BLOCK}__edit-client-first-name--hidden`]: !shouldEditClientFirstName,
  });

  const clientLastNameClasses = cx(`${BEM_BLOCK}__client-last-name`, {
    [`${BEM_BLOCK}__client-last-name--hidden`]: shouldEditClientLastName,
  });

  const editClientLastNameClasses = cx(`${BEM_BLOCK}__edit-client-last-name`, {
    [`${BEM_BLOCK}__edit-client-last-name--hidden`]: !shouldEditClientLastName,
  });

  const clientStreetAddressClasses = cx(`${BEM_BLOCK}__street-address`, {
    [`${BEM_BLOCK}__street-address--hidden`]: shouldEditClientStreetAddress,
  });

  const editClientStreetAddressClasses = cx(`${BEM_BLOCK}__edit-street-address`, {
    [`${BEM_BLOCK}__edit-street-address--hidden`]: !shouldEditClientStreetAddress,
  });

  const clientCityClasses = cx(`${BEM_BLOCK}__city`, {
    [`${BEM_BLOCK}__city--hidden`]: shouldEditClientCity,
  });

  const editClientCityClasses = cx(`${BEM_BLOCK}__edit-city`, {
    [`${BEM_BLOCK}__edit-city--hidden`]: !shouldEditClientCity,
  });

  const clientStateClasses = cx(`${BEM_BLOCK}__state`, {
    [`${BEM_BLOCK}__state--hidden`]: shouldEditClientState,
  });

  const editClientStateClasses = cx(`${BEM_BLOCK}__edit-state`, {
    [`${BEM_BLOCK}__edit-state--hidden`]: !shouldEditClientState,
  });

  const clientZipCodeClasses = cx(`${BEM_BLOCK}__zip-code`, {
    [`${BEM_BLOCK}__zip-code--hidden`]: shouldEditClientZipCode,
  });

  const editClientZipCodeClasses = cx(`${BEM_BLOCK}__edit-zip-code`, {
    [`${BEM_BLOCK}__edit-zip-code--hidden`]: !shouldEditClientZipCode,
  });

  const clientCountryClasses = cx(`${BEM_BLOCK}__country`, {
    [`${BEM_BLOCK}__country--hidden`]: shouldEditClientCountry,
  });

  const editClientCountryClasses = cx(`${BEM_BLOCK}__edit-country`, {
    [`${BEM_BLOCK}__edit-country--hidden`]: !shouldEditClientCountry,
  });

  const invoiceMessageClasses = cx(`${BEM_BLOCK}__message`, {
    [`${BEM_BLOCK}__message--hidden`]: shouldEditInvoiceMessage,
  });

  const editInvoiceMessageClasses = cx(`${BEM_BLOCK}__edit-message`, {
    [`${BEM_BLOCK}__edit-message--hidden`]: !shouldEditInvoiceMessage,
  });

  const termsContentClasses = cx(`${BEM_BLOCK}__terms-content`, {
    [`${BEM_BLOCK}__terms-content--hidden`]: shouldEditTermsContent,
  });

  const editTermsContentClasses = cx(`${BEM_BLOCK}__edit-terms-content`, {
    [`${BEM_BLOCK}__edit-terms-content--hidden`]: !shouldEditTermsContent,
  });

  const onAddNewBreakdownLine = () => {
    const newInvoiceItem = {
      id: uuidv4(),
      index: breakdownLines.length+1,
      unitCost: 0,
      qty: 1,
      total: 0,
      itemName: '',
      itemdescription: '',
    };

    addInvoiceItem(newInvoiceItem);

    setBreakdownLines([
      ...breakdownLines,
      newInvoiceItem,
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

  const onToggleCompanyStreetAddressState = e => {
    const targetState = e.target.getAttribute('company-street-address-state');

    if (targetState === 'display') {
      setShouldEditCompanyStreetAddress(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyStreetAddress(false);
    }
  };

  const onToggleCompanyCityState = e => {
    const targetState = e.target.getAttribute('company-city-state');

    if (targetState === 'display') {
      setShouldEditCompanyCity(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyCity(false);
    }
  };

  const onToggleCompanyStateState = e => {
    const targetState = e.target.getAttribute('company-state-state');

    if (targetState === 'display') {
      setShouldEditCompanyState(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyState(false);
    }
  };

  const onToggleCompanyZipCodeState = e => {
    const targetState = e.target.getAttribute('company-zip-code-state');

    if (targetState === 'display') {
      setShouldEditCompanyZipCode(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyZipCode(false);
    }
  };

  const onToggleCompanyCountryState = e => {
    const targetState = e.target.getAttribute('company-country-state');

    if (targetState === 'display') {
      setShouldEditCompanyCountry(true);
    } else if (targetState === 'edit') {
      setShouldEditCompanyCountry(false);
    }
  };

  const onToggleClientFirstNameState = e => {
    const targetState = e.target.getAttribute('client-first-name-state');

    if (targetState === 'display') {
      setShouldEditClientFirstName(true);
    } else if (targetState === 'edit') {
      setShouldEditClientFirstName(false);
    }
  };

  const onToggleClientLastNameState = e => {
    const targetState = e.target.getAttribute('client-last-name-state');

    if (targetState === 'display') {
      setShouldEditClientLastName(true);
    } else if (targetState === 'edit') {
      setShouldEditClientLastName(false);
    }
  };

  const onToggleClientStreetAddressState = e => {
    const targetState = e.target.getAttribute('client-street-address-state');

    if (targetState === 'display') {
      setShouldEditClientStreetAddress(true);
    } else if (targetState === 'edit') {
      setShouldEditClientStreetAddress(false);
    }
  };

  const onToggleClientCityState = e => {
    const targetState = e.target.getAttribute('client-city-state');

    if (targetState === 'display') {
      setShouldEditClientCity(true);
    } else if (targetState === 'edit') {
      setShouldEditClientCity(false);
    }
  };

  const onToggleClientStateState = e => {
    const targetState = e.target.getAttribute('client-state-state');

    if (targetState === 'display') {
      setShouldEditClientState(true);
    } else if (targetState === 'edit') {
      setShouldEditClientState(false);
    }
  };

  const onToggleClientZipCodeState = e => {
    const targetState = e.target.getAttribute('client-zip-code-state');

    if (targetState === 'display') {
      setShouldEditClientZipCode(true);
    } else if (targetState === 'edit') {
      setShouldEditClientZipCode(false);
    }
  };

  const onToggleClientCountryState = e => {
    const targetState = e.target.getAttribute('client-country-state');

    if (targetState === 'display') {
      setShouldEditClientCountry(true);
    } else if (targetState === 'edit') {
      setShouldEditClientCountry(false);
    }
  };

  const onToggleInvoiceMessageState = e => {
    const targetState = e.target.getAttribute('invoice-message-state');

    if (targetState === 'display') {
      setShouldEditInvoiceMessage(true);
    } else if (targetState === 'edit') {
      setShouldEditInvoiceMessage(false);
    }
  };

  const onToggleTermsContentState = e => {
    const targetState = e.target.getAttribute('terms-content-state');

    if (targetState === 'display') {
      setShouldEditTermsContent(true);
    } else if (targetState === 'edit') {
      setShouldEditTermsContent(false);
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
                  onBlur={e => {
                    onToggleCompanyNameState(e);
                    updateInvoice({ companyName: e.target.value });
                  }}
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
                    name='repFirstName'
                    placeholder='First Name'
                    onBlur={e => {
                      onToggleRepFirstNameState(e);
                      updateInvoice({ repFirstName: e.target.value });
                    }}
                    onChange={e => setRepFirstNameValue(e.target.value)}
                    value={repFirstNameValue}
                    {...editRepFirstNameState}
                  />
                  {SPACING}
                  <input
                    className={editRepLastNameClasses}
                    type='text'
                    name='repLastName'
                    placeholder='Last Name'
                    onBlur={e => {
                      onToggleRepLastNameState(e);
                      updateInvoice({ repLastName: e.target.value });
                    }}
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
              <div className={`${BEM_BLOCK}__street-address--wrapper`}>
                <span
                  className={companyStreetAddressClasses}
                  onClick={e => onToggleCompanyStreetAddressState(e)}
                  {...companyStreetAddressState}
                >
                  {companyStreetAddressValue ? companyStreetAddressValue : 'Street Address'}
                </span>
                <input
                  className={editCompanyStreetAddressClasses}
                  type='text'
                  name='streetAddress'
                  placeholder='Street Address'
                  onBlur={e => onToggleCompanyStreetAddressState(e)}
                  onChange={e => setCompanyStreetAddressValue(e.target.value)}
                  value={companyStreetAddressValue}
                  {...editCompanyStreetAddressState}
                />
              </div>
              <div className={`${BEM_BLOCK}__address-line-2--wrapper`}>
                <span className={`${BEM_BLOCK}__address-line-2`}></span>
              </div>
              <div className={`${BEM_BLOCK}__city-state--wrapper`}>
                <div className={`${BEM_BLOCK}__company-city-state`}>
                  <span
                    className={companyCityClasses}
                    onClick={e => onToggleCompanyCityState(e)}
                    {...companyCityState}
                  >
                    {companyCityValue ? `${companyCityValue},` : 'City,'}
                  </span>
                  <input
                    className={editCompanyCityClasses}
                    type='text'
                    name='city'
                    placeholder='City'
                    onBlur={e => onToggleCompanyCityState(e)}
                    onChange={e => setCompanyCityValue(e.target.value)}
                    value={companyCityValue}
                    {...editCompanyCityState}
                  />
                  <span
                    className={companyStateClasses}
                    onClick={e => onToggleCompanyStateState(e)}
                    {...companyStateState}
                  >
                    {SPACING}{companyStateValue ? `${companyStateValue}` : 'State'}
                  </span>
                  <input
                    className={editCompanyStateClasses}
                    type='text'
                    name='state'
                    placeholder='State'
                    onBlur={e => onToggleCompanyStateState(e)}
                    onChange={e => setCompanyStateValue(e.target.value)}
                    value={companyStateValue}
                    {...editCompanyStateState}
                  />
                </div>
              </div>
              <div className={`${BEM_BLOCK}__zip-code--wrapper`}>
                <span
                  className={companyZipCodeClasses}
                  onClick={e => onToggleCompanyZipCodeState(e)}
                  {...companyZipCodeState}
                >
                  {companyZipCodeValue ? companyZipCodeValue : 'Zip Code'}
                </span>
                <input
                  className={editCompanyZipCodeClasses}
                  type='text'
                  name='zipCode'
                  placeholder='Zip Code'
                  onBlur={e => onToggleCompanyZipCodeState(e)}
                  onChange={e => setCompanyZipCodeValue(e.target.value)}
                  value={companyZipCodeValue}
                  {...editCompanyZipCodeState}
                />
              </div>
              <div className={`${BEM_BLOCK}__country--wrapper`}>
                <span
                  className={companyCountryClasses}
                  onClick={e => onToggleCompanyCountryState(e)}
                  {...companyCountryState}
                >
                  {companyCountryValue ? companyCountryValue : 'Country'}
                </span>
                <input
                  className={editCompanyCountryClasses}
                  type='text'
                  name='country'
                  placeholder='Country'
                  onBlur={e => onToggleCompanyCountryState(e)}
                  onChange={e => setCompanyCountryValue(e.target.value)}
                  value={companyCountryValue}
                  {...editCompanyCountryState}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${BEM_BLOCK}__client-details`}>
          <div className={`${BEM_BLOCK}__billed-to`}>
            <span className={`${BEM_BLOCK}__billed-to-title`}>Billed To</span>
            <span className={`${BEM_BLOCK}__client-business-name`}></span>
            <div className={`${BEM_BLOCK}__client-name`}>
              <span
                className={clientFirstNameClasses}
                onClick={e => onToggleClientFirstNameState(e)}
                {...clientFirstNameState}
              >
                {clientFirstNameValue ? `${clientFirstNameValue}` : 'First Name'}{SPACING}
              </span>
              <input
                className={editClientFirstNameClasses}
                type='text'
                name='clientFirstName'
                placeholder='First Name'
                onBlur={e => onToggleClientFirstNameState(e)}
                onChange={e => setClientFirstNameValue(e.target.value)}
                value={clientFirstNameValue}
                {...editClientFirstNameState}
              />
              <span
                className={clientLastNameClasses}
                onClick={e => onToggleClientLastNameState(e)}
                {...clientLastNameState}
              >
                {clientLastNameValue ? `${clientLastNameValue}` : 'Last Name'}
              </span>
              <input
                className={editClientLastNameClasses}
                type='text'
                name='clientLastName'
                placeholder='Last Name'
                onBlur={e => onToggleClientLastNameState(e)}
                onChange={e => setClientLastNameValue(e.target.value)}
                value={clientLastNameValue}
                {...editClientLastNameState}
              />
            </div>
            <div className={`${BEM_BLOCK}__client-street-address`}>
              <span
                className={clientStreetAddressClasses}
                onClick={e => onToggleClientStreetAddressState(e)}
                {...clientStreetAddressState}
              >
                {clientStreetAddressValue ? clientStreetAddressValue : 'Street Address'}
              </span>
              <input
                className={editClientStreetAddressClasses}
                type='text'
                name='clientStreetAddress'
                placeholder='Street Address'
                onBlur={e => onToggleClientStreetAddressState(e)}
                onChange={e => setClientStreetAddressValue(e.target.value)}
                value={clientStreetAddressValue}
                {...editClientStreetAddressState}
              />
            </div>
            <span className={`${BEM_BLOCK}__address-line-2`}></span>
            <div className={`${BEM_BLOCK}__client-city-state`}>
              <span
                className={clientCityClasses}
                onClick={e => onToggleClientCityState(e)}
                {...clientCityState}
              >
                {clientCityValue ? `${clientCityValue},` : 'City,'}
              </span>
              <input
                className={editClientCityClasses}
                type='text'
                name='clientCity'
                placeholder='City'
                onBlur={e => onToggleClientCityState(e)}
                onChange={e => setClientCityValue(e.target.value)}
                value={clientCityValue}
                {...editClientCityState}
              />
              <span
                className={clientStateClasses}
                onClick={e => onToggleClientStateState(e)}
                {...clientStateState}
              >
                {SPACING}{clientStateValue ? clientStateValue : 'State'}
              </span>
              <input
                className={editClientStateClasses}
                type='text'
                name='clientState'
                placeholder='State'
                onBlur={e => onToggleClientStateState(e)}
                onChange={e => setClientStateValue(e.target.value)}
                value={clientStateValue}
                {...editClientStateState}
              />
            </div>
            <div className={`${BEM_BLOCK}__client-zip-code`}>
              <span
                className={clientZipCodeClasses}
                onClick={e => onToggleClientZipCodeState(e)}
                {...clientZipCodeState}
              >
                {clientZipCodeValue ? clientZipCodeValue : 'Zip Code'}
              </span>
              <input
                className={editClientZipCodeClasses}
                type='text'
                name='clientZipCode'
                placeholder='Zip Code'
                onBlur={e => onToggleClientZipCodeState(e)}
                onChange={e => setClientZipCodeValue(e.target.value)}
                value={clientZipCodeValue}
                {...editClientZipCodeState}
              />
            </div>
            <div className={`${BEM_BLOCK}__client-country`}>
              <span
                className={clientCountryClasses}
                onClick={e => onToggleClientCountryState(e)}
                {...clientCountryState}
              >
                {clientCountryValue ? clientCountryValue : 'Country'}
              </span>
              <input
                className={editClientCountryClasses}
                type='text'
                name='clientCountry'
                placeholder='Country'
                onBlur={e => onToggleClientCountryState(e)}
                onChange={e => setClientCountryValue(e.target.value)}
                value={clientCountryValue}
                {...editClientCountryState}
              />
            </div>
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
          <span
            className={invoiceMessageClasses}
            onClick={e => onToggleInvoiceMessageState(e)}
            {...invoiceMessageState}
          >
            {invoiceMessageValue ? invoiceMessageValue : 'Insert message here'}
          </span>
          <textarea
            className={editInvoiceMessageClasses}
            type='text'
            name='invoiceMessage'
            placeholder='Message'
            onBlur={e => onToggleInvoiceMessageState(e)}
            onChange={e => setInvoiceMessageValue(e.target.value)}
            value={invoiceMessageValue}
            {...editInvoiceMessageState}
          />
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
          <span
            className={termsContentClasses}
            onClick={e => onToggleTermsContentState(e)}
            {...termsContentState}
          >
            {termsContentValue ? termsContentValue : 'Insert terms and condition text here'}
          </span>
          <textarea
            className={editTermsContentClasses}
            type='text'
            name='termsContent'
            placeholder='Message'
            onBlur={e => onToggleTermsContentState(e)}
            onChange={e => setTermsContentValue(e.target.value)}
            value={termsContentValue}
            {...editTermsContentState}
          />
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
