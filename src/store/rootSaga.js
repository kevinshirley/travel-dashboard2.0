import { all } from 'redux-saga/effects';
import 'isomorphic-unfetch';
import { 
  watchOpenMenu,
  watchCloseMenu,
  watchOpenModal,
  watchCloseModal,
  watchCloseStartDateCalendar,
  watchOpenStartDateCalendar,
  watchSetDayToDayTab,
  watchSetDayToDayTabFromStorage,
  watchInitializeModal,
} from 'src/store/sagas/ui';
import { 
  watchGetDestinations,
  watchGetDestination,
} from 'src/store/sagas/destinations';
import { watchGetPosts } from 'src/store/sagas/blog';
import { 
  watchUploadCoverImage,
  watchAddDayToDay,
  watchAddEventToDay,
  watchSetEventToDay,
  watchSetOverviewToDay,
  watchPullCurrentItineraryFromStorage,
  watchToggleEditStartDate,
  watchSetTripStartDate,
  watchAddItinerary,
  watchDeleteEventToDay,
  watchDeleteDayToDay,
} from 'src/store/sagas/add-itinerary';
import { 
  watchSetItineraryToManage,
  watchSetOverviewToUpdatingDay,
  watchSetEventToUpdatingDay,
  watchaddEventToUpdatingDay,
  watchAddUpdatingDayToDay,
  watchDeleteManagedDayToDay,
  watchDeleteManagedEventToDay,
} from 'src/store/sagas/manage-itinerary';
import { 
  watchFetchItineraries,
  watchDeleteUserItinerary,
} from 'src/store/sagas/itineraries';
import { 
  watchIsLoggedIn,
  watchLogout,
  watchSignIn,
  watchSignUp,
} from 'src/store/sagas/session';
import { watchSetItineraryToDisplay } from 'src/store/sagas/display-itinerary';
import {
  watchSetCustomer,
  watchCloseCustomerSideMenu,
  watchAddCustomer
} from 'src/store/sagas/customers';

function* rootSaga() {
  yield all([
    watchOpenMenu(),
    watchCloseMenu(),
    watchOpenModal(),
    watchCloseModal(),
    watchCloseStartDateCalendar(),
    watchOpenStartDateCalendar(),
    watchGetDestinations(),
    watchGetDestination(),
    watchGetPosts(),
    watchUploadCoverImage(),
    watchAddDayToDay(),
    watchAddEventToDay(),
    watchSetEventToDay(),
    watchSetOverviewToDay(),
    watchPullCurrentItineraryFromStorage(),
    watchToggleEditStartDate(),
    watchSetTripStartDate(),
    watchSetDayToDayTab(),
    watchSetDayToDayTabFromStorage(),
    watchSetItineraryToManage(),
    watchFetchItineraries(),
    watchSetOverviewToUpdatingDay(),
    watchIsLoggedIn(),
    watchLogout(),
    watchSignIn(),
    watchSignUp(),
    watchInitializeModal(),
    watchAddItinerary(),
    watchSetEventToUpdatingDay(),
    watchaddEventToUpdatingDay(),
    watchAddUpdatingDayToDay(),
    watchDeleteEventToDay(),
    watchDeleteDayToDay(),
    watchDeleteManagedDayToDay(),
    watchDeleteManagedEventToDay(),
    watchDeleteUserItinerary(),
    watchSetItineraryToDisplay(),
    watchSetCustomer(),
    watchCloseCustomerSideMenu(),
    watchAddCustomer()
  ]);
}

export default rootSaga;
