import { INVOICES } from 'src/store/actions';

const initialState = {
  newInvoice: {
    invoiceNumberValue: '',
    referenceNumberValue: '',
    companyNameValue: '',
    repFirstNameValue: '',
    repLastNameValue: '',
    repPhoneNumberValue: '',
    companyStreetAddressValue: '',
    companyCityValue: '',
    companyStateValue: '',
    companyZipCodeValue: '',
    companyCountryValue: '',
    clientFirstNameValue: '',
    clientLastNameValue: '',
    clientStreetAddressValue: '',
    clientCityValue: '',
    clientStateValue: '',
    clientZipCodeValue: '',
    clientCountryValue: '',
    invoiceMessageValue: '',
    termsContentValue: '',
    items: [],
  },
  invoices: [],
  expenses: [],
};

const accounting = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVOICES.SET_NEW_INVOICE_ITEMS:
      return {
        ...state,
        newInvoice: {
          ...state.newInvoice,
          items: payload,
        },
      };
    default:
      return state;
  }
}

export default accounting;
