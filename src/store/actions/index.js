export function createTypes(base, types) {
  const res = {};
  types.forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const action = (type, payload = {}, meta = {}) => ({
  type,
  payload,
  meta,
});

export const actionWithoutStoreUpdate = (type, payload = {}, meta = {}) => ({
  type,
  payload,
  meta,
  shouldNotUpdateStore: true,
});

export const ROOT = createTypes('ROOT', [
  'INITIAL_LOAD',
]);

export const UI = createTypes('UI', [
  'OPEN_MODAL',
  'CLOSE_MODAL',
  'SET_MODAL_UI',
  'SET_MODAL_UI_PAYLOAD',
  'OPEN_MENU',
  'CLOSE_MENU',
  'OPEN_START_DATE_CALENDAR',
  'CLOSE_START_DATE_CALENDAR',
  'OPEN_DREAM_VACATION_FORM',
  'CLOSE_DREAM_VACATION_FORM',
  'OPEN_NEW_EVENT_LIST',
  'CLOSE_NEW_EVENT_LIST',
  'OPEN_EDIT_EVENT_PANEL',
  'CLOSE_EDIT_EVENT_PANEL',
  'IS_MODAL_OPENED',
  'IS_MODAL_CLOSED',
  'SELECT_PORTFOLIO',
  'SET_DAY_TO_DAY_TAB',
  'OPEN_EVENT_DRAWER',
  'CLOSE_EVENT_DRAWER',
  'TOGGLE_EVENT_DRAWER',
  'TOGGLE_IS_EDITING_TRIP_START_DATE',
  'RESET_ITINERARIES_TABLE',
  'IS_CUSTOMER_SIDE_MENU',
  'IS_SIDE_MENU_MINIMIZED',
  'IS_MAIN_MENU_MINIMIZED',
]);

export const DESTINATIONS = createTypes('DESTINATIONS', [
  'GET_DESTINATION',
  'GET_DESTINATIONS',
  'SET_DESTINATIONS',
  'SET_DESTINATION',
]);

export const BLOG = createTypes('BLOG', [
  'GET_POSTS',
  'GET_POST',
  'SET_POSTS',
  'SET_POST',
]);

export const ITINERARY = createTypes('ITINERARY', [
  'ADD',
  'EDIT',
  'SET_INCLUDED',
  'SET_TRIP_START_DATE',
  'UPLOAD_COVER_IMAGE',
  'SET_COVER_IMAGE',
  'SET_OVERVIEW_COVER_IMAGE',
  'SET_PRICE_TYPE',
  'ADD_DAY_TO_DAY',
  'DELETE_DAY_TO_DAY',
  'DELETE_MANAGED_DAY_TO_DAY',
  'ADD_UPDATING_DAY_TO_DAY',
  'SET_DAY_TO_DAYS',
  'ADD_EVENT_TO_DAY',
  'ADD_EVENT_TO_UPDATING_DAY',
  'DELETE_EVENT_TO_DAY',
  'DELETE_MANAGED_EVENT_TO_DAY',
  'SET_EVENT_TO_DAY',
  'SET_EVENT_TO_UPDATING_DAY',
  'SET_OVERVIEW_TO_DAY',
  'SET_OVERVIEW_TO_UPDATING_DAY',
  'TOGGLE_EDIT_START_DATE',
  'SET_ITINERARIES',
  'SET_ITINERARY_TO_MANAGE',
  'SET_MANAGE_DAY_TO_DAYS',
  'DELETE_USER_ITINERARY',
  'SET_ITINERARY_TO_DISPLAY',
  'SET_DISPLAY_DAY_TO_DAYS',
]);

export const SESSION = createTypes('SESSION', [
  'IS_LOGGED_IN',
  'SET_IS_LOGGED_IN',
  'LOGOUT',
  'SIGN_IN',
  'SIGN_UP',
  'SET_USER_TOKEN',
  'SET_PROFILE',
]);

export const FORMS = createTypes('FORMS', [
  'SET_ERROR',
  'SET_SUCCESS',
  'IS_SUBMITTING',
  'RESET_SUCCESS',
  'RESET_ERROR',
]);

export const CUSTOMER = createTypes('CUSTOMER', [
  'SET',
  'CLOSE_CUSTOMER_SIDE_MENU',
  'ADD',
  'ADD_NOTE',
  'SET_ON_INIT',
]);

export const CUSTOMERS = createTypes('CUSTOMERS', [
  'SET_USER',
  'SET_ORGANIZATION',
]);

export const INVOICES = createTypes('INVOICES', [
  'INVOICE_ITEM',
  'ADD_INVOICE_ITEM',
  'UPDATE_INVOICE_ITEM',
  'SET_NEW_INVOICE_ITEMS',
  'UPDATE_INVOICE_ITEM_NAME',
  'SET_INVOICE_ITEM_NAME',
]);

export const root = {
  initialLoad: params => actionWithoutStoreUpdate(ROOT.INITIAL_LOAD, { params }),
};

export const ui = {
  openModal: ui => action(UI.OPEN_MODAL, ui),
  closeModal: () => action(UI.CLOSE_MODAL),
  setModalUi: value => action(UI.SET_MODAL_UI, value),
  setModalUiPayload: value => action(UI.SET_MODAL_UI_PAYLOAD, value),
  openMenu: () => action(UI.OPEN_MENU),
  closeMenu: () => action(UI.CLOSE_MENU),
  openStartDateCalendar: () => action(UI.OPEN_START_DATE_CALENDAR),
  closeStartDateCalendar: () => action(UI.CLOSE_START_DATE_CALENDAR),
  openNewEventList: () => action(UI.OPEN_NEW_EVENT_LIST),
  closeNewEventList: () => action(UI.CLOSE_NEW_EVENT_LIST),
  openDreamVacationForm: () => action(UI.OPEN_DREAM_VACATION_FORM),
  closeDreamVacationForm: () => action(UI.CLOSE_DREAM_VACATION_FORM),
  setModalOpened: () => action(UI.IS_MODAL_OPENED),
  selectPortfolio: index => action(UI.SELECT_PORTFOLIO, index),
  setDayToDayTab: index => action(UI.SET_DAY_TO_DAY_TAB, index),
  openEditEventPanel: () => action(UI.OPEN_EDIT_EVENT_PANEL),
  closeEditEventPanel: () => action(UI.CLOSE_EDIT_EVENT_PANEL),
  openEventDrawer: () => action(UI.OPEN_EVENT_DRAWER),
  closeEventDrawer: () => action(UI.CLOSE_EVENT_DRAWER),
  toggleEventDrawer: value => action(UI.TOGGLE_EVENT_DRAWER, value),
  isEditingTripStartDate: value => action(UI.TOGGLE_IS_EDITING_TRIP_START_DATE, value),
  resetItinerariesTable: payload => action(UI.RESET_ITINERARIES_TABLE, payload),
  isCustomerSideMenu: payload => action(UI.IS_CUSTOMER_SIDE_MENU, payload),
  isSideMenuMinimized: () => action(UI.IS_SIDE_MENU_MINIMIZED),
  isMainMenuMinimized: () => action(UI.IS_MAIN_MENU_MINIMIZED),
};

export const destinations = {
  getDestination: continent => action(DESTINATIONS.GET_DESTINATION, { continent }),
  getDestinations: () => action(DESTINATIONS.GET_DESTINATIONS),
  setDestinations: destinations => action(DESTINATIONS.SET_DESTINATIONS, destinations),
  setDestination: destination => action(DESTINATIONS.SET_DESTINATION, destination),
};

export const blog = {
  getPosts: () => action(BLOG.GET_POSTS),
  getPost: post => action(BLOG.GET_POST, { post }),
  setPosts: posts => action(BLOG.SET_POSTS, posts),
  setPost: post => action(BLOG.SET_POST, post),
};

export const itinerary = {
  add: itinerary => action(ITINERARY.ADD, itinerary),
  setIncluded: included => action(ITINERARY.SET_INCLUDED, included),
  setTripStartDate: date => action(ITINERARY.SET_TRIP_START_DATE, date),
  uploadCoverImage: payload => action(ITINERARY.UPLOAD_COVER_IMAGE, payload),
  setCoverImage: payload => action(ITINERARY.SET_COVER_IMAGE, payload),
  setOverviewCoverImage: payload => action(ITINERARY.SET_OVERVIEW_COVER_IMAGE, payload),
  setPriceType: payload => action(ITINERARY.SET_PRICE_TYPE, payload),
  addDayToDay: () => action(ITINERARY.ADD_DAY_TO_DAY),
  deleteDayToDay: payload => action(ITINERARY.DELETE_DAY_TO_DAY, payload),
  deleteManagedDayToDay: payload => action(ITINERARY.DELETE_MANAGED_DAY_TO_DAY, payload),
  addUpdatingDayToDay: () => action(ITINERARY.ADD_UPDATING_DAY_TO_DAY),
  setDayToDays: payload => action(ITINERARY.SET_DAY_TO_DAYS, payload),
  addEventToDay: payload => action(ITINERARY.ADD_EVENT_TO_DAY, payload),
  addEventToUpdatingDay: payload => action(ITINERARY.ADD_EVENT_TO_UPDATING_DAY, payload),
  deleteEventToDay: payload => action(ITINERARY.DELETE_EVENT_TO_DAY, payload),
  deleteManagedEventToDay: payload => action(ITINERARY.DELETE_MANAGED_EVENT_TO_DAY, payload),
  setEventToDay: payload => action(ITINERARY.SET_EVENT_TO_DAY, payload),
  setEventToUpdatingDay: payload => action(ITINERARY.SET_EVENT_TO_UPDATING_DAY, payload),
  setOverviewToDay: payload => action(ITINERARY.SET_OVERVIEW_TO_DAY, payload),
  setOverviewToUpdatingDay: payload => action(ITINERARY.SET_OVERVIEW_TO_UPDATING_DAY, payload),
  toggleEditStartDate: () => action(ITINERARY.TOGGLE_EDIT_START_DATE),
  setItineraries: payload => action(ITINERARY.SET_ITINERARIES, payload),
  setItineraryToManage: payload => action(ITINERARY.SET_ITINERARY_TO_MANAGE, payload),
  setManageDayToDays: payload => action(ITINERARY.SET_MANAGE_DAY_TO_DAYS, payload),
  deleteUserItinerary: payload => action(ITINERARY.DELETE_USER_ITINERARY, payload),
  setItineraryToDisplay: payload => action(ITINERARY.SET_ITINERARY_TO_DISPLAY, payload),
  setDisplayedDayToDays: payload => action(ITINERARY.SET_DISPLAY_DAY_TO_DAYS, payload),
};

export const session = {
  isLoggedIn: () => action(SESSION.IS_LOGGED_IN),
  setIsLoggedIn: payload => action(SESSION.SET_IS_LOGGED_IN, payload),
  logout: () => action(SESSION.LOGOUT),
  signIn: payload => action(SESSION.SIGN_IN, payload),
  signUp: payload => action(SESSION.SIGN_UP, payload),
  setUserToken: payload => action(SESSION.SET_USER_TOKEN, payload),
  setProfile: payload => action(SESSION.SET_PROFILE, payload),
};

export const forms = {
  setError: payload => action(FORMS.SET_ERROR, payload),
  setSuccess: payload => action(FORMS.SET_SUCCESS, payload),
  isSubmitting: payload => action(FORMS.IS_SUBMITTING, payload),
  resetSuccess: payload => action(FORMS.RESET_SUCCESS, payload),
  resetError: payload => action(FORMS.RESET_ERROR, payload),
};

export const customer = {
  set: payload => action(CUSTOMER.SET, payload),
  closeCustomerSideMenu: () => action(CUSTOMER.CLOSE_CUSTOMER_SIDE_MENU),
  add: payload => action(CUSTOMER.ADD, payload),
  addNote: payload => action(CUSTOMER.ADD_NOTE, payload),
  setCustomerOnInit: payload => action(CUSTOMER.SET_ON_INIT, payload),
};

export const customers = {
  setUser: payload => action(CUSTOMERS.SET_USER, payload),
};

export const invoices = {
  invoiceItem: payload => action(INVOICES.INVOICE_ITEM, payload),
  addInvoiceItem: payload => action(INVOICES.ADD_INVOICE_ITEM, payload),
  updateInvoiceItem: payload => action(INVOICES.UPDATE_INVOICE_ITEM, payload),
  setNewInvoiceItems: payload => action(INVOICES.SET_NEW_INVOICE_ITEMS, payload),
  updateInvoiceItemName: payload => action(INVOICES.UPDATE_INVOICE_ITEM_NAME, payload),
  setInvoiceItemName: payload => action(INVOICES.SET_INVOICE_ITEM_NAME, payload),
};
