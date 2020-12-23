import * as R from 'ramda';
import { createStructuredSelector } from 'reselect';

import { selectSignUpIsSubmitting, selectSignInIsSubmitting } from 'src/store/selectors/session';
import { MODALS, MODAL_SIZE } from 'src/store/constants/modals';
import saveNewItinerary from 'src/components/add-itinerary/save-new-itinerary-modal';
import DeleteDayConfirmationModal from 'src/components/add-itinerary/delete-day-confirmation-modal';
import saveUpdatedItinerary from 'src/components/manage-itinerary/save-updated-itinerary-modal';
import signIn from 'src/components/sign-in/sign-in-modal';
import signUp from 'src/components/sign-up/sign-up-modal';
import AddCustomerModal from 'src/components/customers/modals/add-customer.component';
import AddCustomerNotesModal from 'src/components/customers/modals/add-customer-notes.component';

export const selectStaticModals = createStructuredSelector({
  [MODALS.SAVE_NEW_ITINERARY]: createStructuredSelector({
    innerModal: R.always(saveNewItinerary),
    modalSize: R.always(MODAL_SIZE.LARGE),
    innerModalPadding: R.always(true),
  }),
  [MODALS.SAVE_UPDATED_ITINERARY]: createStructuredSelector({
    innerModal: R.always(saveUpdatedItinerary),
    modalSize: R.always(MODAL_SIZE.LARGE),
    innerModalPadding: R.always(true),
  }),
  [MODALS.SIGN_IN]: createStructuredSelector({
    innerModal: R.always(signIn),
    modalSize: R.always(MODAL_SIZE.MEDIUM),
    innerModalPadding: R.always(false),
    isSubmitting: selectSignInIsSubmitting,
  }),
  [MODALS.SIGN_UP]: createStructuredSelector({
    innerModal: R.always(signUp),
    modalSize: R.always(MODAL_SIZE.MEDIUM),
    innerModalPadding: R.always(false),
    isSubmitting: selectSignUpIsSubmitting,
  }),
  [MODALS.DELETE_ITINERARY_DAY_CONFIRMATION]: createStructuredSelector({
    innerModal: R.always(DeleteDayConfirmationModal),
    modalSize: R.always(MODAL_SIZE.SMALL),
    innerModalPadding: R.always(true),
    isSubmitting: selectSignUpIsSubmitting,
  }),
  [MODALS.ADD_CUSTOMER]: createStructuredSelector({
    innerModal: R.always(AddCustomerModal),
    modalSize: R.always(MODAL_SIZE.MEDIUM),
    innerModalPadding: R.always(false),
    isSubmitting: R.F,
  }),
  [MODALS.ADD_NOTES]: createStructuredSelector({
    innerModal: R.always(AddCustomerNotesModal),
    modalSize: R.always(MODAL_SIZE.MEDIUM),
    innerModalPadding: R.always(false),
    isSubmitting: R.F,
  }),
});
