import { combineReducers } from 'redux';
import { UI } from 'src/store/actions';

function isModalOpened(state = false, { type }) {
  switch (type) {
    case UI.OPEN_MODAL:
      return true;
    case UI.CLOSE_MODAL:
      return false;
    default:
      return state;
  }
}

function isMenuOpened(state = false, { type }) {
  switch (type) {
    case UI.OPEN_MENU:
      return true;
    case UI.CLOSE_MENU:
      return false;
    default:
      return state;
  }
}

function modalUi(state = '', { type, payload }) {
  switch (type) {
    case UI.SET_MODAL_UI:
      return payload;
    default:
      return state;
  }
}

function modalUiPayload(state = '', { type, payload }) {
  switch (type) {
    case UI.SET_MODAL_UI_PAYLOAD:
      return payload;
    default:
      return state;
  }
}

function isStartDateCalendarOpened(state = false, { type }) {
  switch (type) {
    case UI.OPEN_START_DATE_CALENDAR:
      return true;
    case UI.CLOSE_START_DATE_CALENDAR:
      return false;
    default:
      return state;
  }
}

function isNewEventListOpened(state = false, { type }) {
  switch (type) {
    case UI.OPEN_NEW_EVENT_LIST:
      return true;
    case UI.CLOSE_NEW_EVENT_LIST:
      return false;
    default:
      return state;
  }
}

function isEditEventPanelOpened(state = false, { type }) {
  switch (type) {
    case UI.OPEN_EDIT_EVENT_PANEL:
      return true;
    case UI.CLOSE_EDIT_EVENT_PANEL:
      return false;
    default:
      return state;
  }
}

function isEventDrawerOpened(state = false, { type, payload }) {
  switch (type) {
    case UI.OPEN_EVENT_DRAWER:
      return true;
    case UI.CLOSE_EVENT_DRAWER:
      return false;
    case UI.TOGGLE_EVENT_DRAWER:
      return payload;
    default:
      return state;
  }
}

function dayToDayTab(state = 0, { type, payload }) {
  switch (type) {
    case UI.SET_DAY_TO_DAY_TAB:
      return payload;
    default:
      return state;
  }
}

function isEditingTripStartDate(state = false, { type, payload }) {
  switch (type) {
    case UI.TOGGLE_IS_EDITING_TRIP_START_DATE:
      return !payload;
    default:
      return state;
  }
}

function shouldResetItinerariesTable(state = false, { type, payload }) {
  switch (type) {
    case UI.RESET_ITINERARIES_TABLE:
      return payload;
    default:
      return state;
  }
}

function isCustomerSideMenu(state = false, { type, payload }) {
  switch (type) {
    case UI.IS_CUSTOMER_SIDE_MENU:
      return payload;
    default:
      return state;
  }
}

function isSideMenuMinimized(state = true, { type }) {
  switch (type) {
    case UI.IS_SIDE_MENU_MINIMIZED:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  isModalOpened,
  isMenuOpened,
  isStartDateCalendarOpened,
  dayToDayTab,
  isNewEventListOpened,
  isEditEventPanelOpened,
  isEventDrawerOpened,
  isEditingTripStartDate,
  modalUi,
  modalUiPayload,
  shouldResetItinerariesTable,
  isCustomerSideMenu,
  isSideMenuMinimized,
});
