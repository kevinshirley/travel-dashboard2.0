import { connect } from 'react-redux';
import nookies from 'nookies';
import ManageItineraryPage from 'src/components/manage-itinerary';
import storeConnector from 'src/store/selectors/manage-itinerary';
import * as actions from 'src/store/actions';
import { firebaseAdmin } from '../firebaseAdmin';

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;
    console.log({ token });

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { email, uid },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log({ err });
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {},
    };
  }
};

const actionsCreators = {
  setIncluded: actions.itinerary.setIncluded,
  openStartDateCalendar: actions.ui.openStartDateCalendar,
  closeStartDateCalendar: actions.ui.closeStartDateCalendar,
  openNewEventList: actions.ui.openNewEventList,
  closeNewEventList: actions.ui.closeNewEventList,
  uploadCoverImage: actions.itinerary.uploadCoverImage,
  setPriceType: actions.itinerary.setPriceType,
  addEventToDay: actions.itinerary.addEventToDay,
  openEditEventPanel: actions.ui.openEditEventPanel,
  closeEditEventPanel: actions.ui.closeEditEventPanel,
  toggleEditStartDate: actions.itinerary.toggleEditStartDate,
  openModal: actions.ui.openModal,
  setItineraries: actions.itinerary.setItineraries,
  addEventToUpdatingDay: actions.itinerary.addEventToUpdatingDay,
};

export default connect(
  storeConnector,
  actionsCreators,
)(ManageItineraryPage);
