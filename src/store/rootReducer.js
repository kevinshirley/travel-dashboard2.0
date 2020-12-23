import { combineReducers } from 'redux';

import ui from 'src/store/reducers/ui';
import destinations from 'src/store/reducers/destinations';
import blog from 'src/store/reducers/blog';
import addItinerary from 'src/store/reducers/add-itinerary';
import itineraries from 'src/store/reducers/itineraries';
import manageItinerary from 'src/store/reducers/manage-itinerary';
import session from 'src/store/reducers/session';
import forms from 'src/store/reducers/forms';
import displayItinerary from 'src/store/reducers/display-itinerary';
import customer from 'src/store/reducers/customer';
import customers from 'src/store/reducers/customers';

export default combineReducers({
  ui,
  itineraries,
  addItinerary,
  manageItinerary,
  displayItinerary,
  destinations,
  blog,
  session,
  forms,
  customer,
  customers,
});
