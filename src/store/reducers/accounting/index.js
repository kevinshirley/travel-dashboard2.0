import { INVOICES } from 'src/store/actions';

const initialState = {
  newInvoice: {
    invoiceId: '',
    invoiceNumber: '',
    referenceNumber: '',
    companyName: '',
    repFirstName: '',
    repLastName: '',
    repEmail: '',
    repPhoneNumber: '',
    companyStreetAddress: '',
    companyCity: '',
    companyState: '',
    companyZipCode: '',
    companyCountry: '',
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientStreetAddress: '',
    clientCity: '',
    clientState: '',
    clientZipCode: '',
    clientCountry: '',
    dateIssued: '',
    dueDate: '',
    invoiceMessage: '',
    termsContent: '',
    status: 'pending',
    totalAmountDue: 0,
    items: [],
  },
  invoices: [],
  expenses: [],
  displayInvoice: {},
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
    case INVOICES.SET:
      return {
        ...state,
        invoices: payload,
      };
    case INVOICES.DISPLAY_INVOICE:
      return {
        ...state,
        displayInvoice: payload,
      };
    default:
      return state;
  }
}

export default accounting;
