import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { PENCIL_ICON } from 'src/components/material-ui/icons';
import EventCategories from 'src/components/common/event-categories';
import { Formik, Field } from 'formik';
import Avatar from 'src/components/material-ui/avatar';
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';
import { useRouter } from 'next/router';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';

function EventDrawer({ day, event, categoryTabIndex }) {
  const setEventToDay = useAction(actions.itinerary.setEventToDay);
  const setEventToUpdatingDay = useAction(actions.itinerary.setEventToUpdatingDay);
  const toggleEventDrawer = useAction(actions.ui.toggleEventDrawer);
  const router = useRouter();

  const [state, setState] = useState({
    right: false,
  });

  // useEffect(() => {
  //   console.log('state.right', state.right);
  //   toggleEventDrawer(state.right);
  // }, [state.right]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log('toggleDrawer', open);
    setState({ [anchor]: open });
  };

  // const openDrawer = (anchor, open) => {
  //   setState({ [anchor]: open });

  //   toggleEventDrawer(open);
  // };

  const getFlightDirection = event => {
    if (event && event.flightDirection && event.type === 'flight') {
      return event.flightDirection;
    }

    if (event && !event.flightDirection && event.type === 'flight') {
      return 'departure';
    }

    return '';
  };

  const getAccommodationStatus = event => {
    if (event && event.accommodationStatus && event.type === 'accommodation') {
      return event.accommodationStatus;
    }

    if (event && !event.accommodationStatus && event.type === 'accommodation') {
      return 'checkIn';
    }

    return '';
  };

  const getTransportationDirection = event => {
    if (event && event.transportationDirection && event.type === 'transportation') {
      return event.transportationDirection;
    }

    if (event && !event.transportationDirection && event.type === 'transportation') {
      return 'departure';
    }

    return '';
  };

  const list = () => (
    <Formik
      onSubmit={(values) => {
        if (router.pathname === ADD_ITINERARY) {
          setEventToDay({
            values,
            day,
            event: event.id,
          });
        }
        if (router.pathname === MANAGE_ITINERARY) {
          setEventToUpdatingDay({
            values,
            day,
            event: event.id,
          });
        }

        setState({ ...state, right: false });
      }}
      initialValues={{
        flightDirection: getFlightDirection(event),
        title: event && event.title ? event.title : '',
        time: event && event.time ? event.time : '',
        flightDuration: event && event.flightDuration ? event.flightDuration : '',
        airline: event && event.airline ? event.airline : '',
        flightNumber: event && event.flightNumber ? event.flightNumber : '',
        flightConfirmationNumber: event && event.flightConfirmationNumber ? event.flightConfirmationNumber : '',
        terminal: event && event.terminal ? event.terminal : '',
        gate: event && event.gate ? event.gate : '',
        price: event && event.price ? event.price : '',
        currency: event && event.currency ? event.currency : '',
        priceType: event && event.priceType ? event.priceType : 'perPerson',
        notes: event && event.notes ? event.notes : '',
        type: event.type,
        activityDuration: event && event.activityDuration ? event.activityDuration : '',
        activityBookedOn: event && event.activityBookedOn ? event.activityBookedOn : '',
        activityConfirmationNumber: event && event.activityConfirmationNumber ? event.activityConfirmationNumber : '',
        accommodationStatus: getAccommodationStatus(event),
        checkInTime: event && event.checkInTime ? event.checkInTime : '',
        checkOutTime: event && event.checkOutTime ? event.checkOutTime : '',
        accommodationBookedOn: event && event.accommodationBookedOn ? event.accommodationBookedOn : '',
        accommodationConfirmationNumber: event && event.accommodationConfirmationNumber ? event.accommodationConfirmationNumber : '',
        transportationDirection: getTransportationDirection(event),
        transportationDuration: event && event.transportationDuration ? event.transportationDuration : '',
        transportationBookedOn: event && event.transportationBookedOn ? event.transportationBookedOn : '',
        transportationConfirmationNumber: event && event.transportationConfirmationNumber ? event.transportationConfirmationNumber : '',
        transportationDepartureTime: event && event.transportationDepartureTime ? event.transportationDepartureTime : '',
        transportationArrivalTime: event && event.transportationArrivalTime ? event.transportationArrivalTime : '',
        tourTime: event && event.tourTime ? event.tourTime : '',
        tourDuration: event && event.tourDuration ? event.tourDuration : '',
        tourBookedOn: event && event.tourBookedOn ? event.tourBookedOn : '',
        tourConfirmationNumber: event && event.tourConfirmationNumber ? event.tourConfirmationNumber : '',
        cruiseTime: event && event.cruiseTime ? event.cruiseTime : '',
        cruiseDuration: event && event.cruiseDuration ? event.cruiseDuration : '',
        cruiseBookedOn: event && event.cruiseBookedOn ? event.cruiseBookedOn : '',
        cruiseConfirmationNumber: event && event.cruiseConfirmationNumber ? event.cruiseConfirmationNumber : '',
        infoTime: event && event.infoTime ? event.infoTime : '',
      }}
    >
      {() => (
        <EventCategories
          categoryTabIndex={categoryTabIndex}
          day={day}
          event={Number(event.id)}
        />
      )}
    </Formik>
  );

  return (
    <>
      <Avatar onClick={toggleDrawer('right', true)}>
        {PENCIL_ICON}
      </Avatar>
      <SwipeableDrawer 
        anchor='right'
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}

export default EventDrawer;
