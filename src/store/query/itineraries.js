import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export const ADD_ITINERARY_QUERY = gql`
  {
    itineraries {
      createdAt
      itinerary_id
      country
      tripInformation {
        id
        type
        name
        title
        location
        country
        price
        priceType
        pathname
        overview
        tripStartDate
        coverImage {
          image
          location
        }
      }
      tripItinerary {
        id
        name
        type
        events {
          accommodationBookedOn
          accommodationConfirmationNumber
          accommodationStatus
          activityBookedOn
          activityConfirmationNumber
          activityDuration
          airline
          checkInTime
          checkOutTime
          cruiseBookedOn
          cruiseConfirmationNumber
          cruiseDuration
          cruiseTime
          currency
          flightConfirmationNumber
          flightDirection
          flightDuration
          flightNumber
          gate
          id
          infoTime
          name
          notes
          price
          priceType
          terminal
          time
          title
          tourBookedOn
          tourConfirmationNumber
          tourDuration
          tourTime
          transportationArrivalTime
          transportationBookedOn
          transportationConfirmationNumber
          transportationDepartureTime
          transportationDirection
          transportationDuration
          type
        }
      }
    }
  }
`;

export default function GetItineraries(props) {
  return (
    <Query query={ADD_ITINERARY_QUERY}>
      {props.children}
    </Query>
  );
};
