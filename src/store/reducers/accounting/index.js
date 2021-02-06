import { INVOICES } from 'src/store/actions';

const initialState = {
  newInvoice: {
    invoiceNumber: '',
    referenceNumber: '',
    companyName: '',
    repFirstName: '',
    repLastName: '',
    repPhoneNumber: '',
    companyStreetAddress: '',
    companyCity: '',
    companyState: '',
    companyZipCode: '',
    companyCountry: '',
    clientFirstName: '',
    clientLastName: '',
    clientStreetAddress: '',
    clientCity: '',
    clientState: '',
    clientZipCode: '',
    clientCountry: '',
    invoiceMessage: '',
    termsContent: '',
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
    case INVOICES.SET_NEW_INVOICE:
      return {
        ...state,
        newInvoice: payload,
      };
    default:
      return state;
  }
}

export default accounting;
