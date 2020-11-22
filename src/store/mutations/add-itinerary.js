import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';

const ADD_ITINERARY_MUTATION_QUERY = gql`
  mutation AddItinerary($itinerary_id: String!, $tripInformation: TripInformationInputType, $tripItinerary: [TripItineraryInputType]) {
    addItinerary(itinerary_id: $itinerary_id, tripInformation: $tripInformation, tripItinerary: $tripItinerary) {
      itinerary_id
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

export default function AddItinerary(props) {
  return (
    <Mutation mutation={ADD_ITINERARY_MUTATION_QUERY}>
      {props.children}
    </Mutation>
  );
};
