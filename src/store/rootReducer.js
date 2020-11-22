import { combineReducers } from 'redux';

import ui from 'src/store/reducers/ui';
import destinations from 'src/store/reducers/destinations';
import blog from 'src/store/reducers/blog';
import addItinerary from 'src/store/reducers/add-itinerary';
import itineraries from 'src/store/reducers/itineraries';
import manageItinerary from 'src/store/reducers/manage-itinerary';
import session from 'src/store/reducers/session';
import forms from 'src/store/reducers/forms';

export default combineReducers({
  ui,
  itineraries,
  addItinerary,
  manageItinerary,
  destinations,
  blog,
  session,
  forms,
});
