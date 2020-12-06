require('dotenv').config();
const { 
  SOFTELO_AWS_ACCESS_KEY_ID, 
  SOFTELO_AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = process.env;
const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLString, 
  GraphQLID, 
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType
} = require('graphql');
const fetchGet = require('../utils/fetch');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const aws_creds = {
  itineraries_table_name: 'itineraries',
  remote_config: {
    accessKeyId: SOFTELO_AWS_ACCESS_KEY_ID,
    secretAccessKey: SOFTELO_AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  }
};

// Object Type
const DestinationType = new GraphQLObjectType({
  name: 'Destination',
  fields: () => ({
    Africa: { type: DestinationContentType },
    Asia: { type: DestinationContentType },
  })
});

const DestinationContentType = new GraphQLObjectType({
  name: 'DestinationContent',
  fields: () => ({
    continent: { type: GraphQLString },
    pageSubTitle: { type: GraphQLString },
  })
});

const CoverImageType = new GraphQLObjectType({
  name: 'CoverImage',
  fields: () => ({
    image: { type: GraphQLString },
    location: { type: GraphQLString },
  })
});

const TripInformationType = new GraphQLObjectType({
  name: 'TripInformation',
  fields: () => ({
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    country: { type: GraphQLString },
    price: { type: GraphQLString },
    priceType: { type: GraphQLString },
    pathname: { type: GraphQLString },
    overview: { type: GraphQLString },
    tripStartDate: { type: GraphQLString },
    coverImage: { type: CoverImageType },
  })
});

const TripItineraryEventsType = new GraphQLObjectType({
  name: 'TripItineraryEventsType',
  fields: () => ({
    accommodationBookedOn: { type: GraphQLString },
    accommodationConfirmationNumber: { type: GraphQLString },
    accommodationStatus: { type: GraphQLString },
    activityBookedOn: { type: GraphQLString },
    activityConfirmationNumber: { type: GraphQLString },
    activityDuration: { type: GraphQLString },
    airline: { type: GraphQLString },
    checkInTime: { type: GraphQLString },
    checkOutTime: { type: GraphQLString },
    cruiseBookedOn: { type: GraphQLString },
    cruiseConfirmationNumber: { type: GraphQLString },
    cruiseDuration: { type: GraphQLString },
    cruiseTime: { type: GraphQLString },
    currency: { type: GraphQLString },
    flightConfirmationNumber: { type: GraphQLString },
    flightDirection: { type: GraphQLString },
    flightDuration: { type: GraphQLString },
    flightNumber: { type: GraphQLString },
    gate: { type: GraphQLString },
    id: { type: GraphQLInt },
    infoTime: { type: GraphQLString },
    name: { type: GraphQLString },
    notes: { type: GraphQLString },
    price: { type: GraphQLString },
    priceType: { type: GraphQLString },
    terminal: { type: GraphQLString },
    time: { type: GraphQLString },
    title: { type: GraphQLString },
    tourBookedOn: { type: GraphQLString },
    tourConfirmationNumber: { type: GraphQLString },
    tourDuration: { type: GraphQLString },
    tourTime: { type: GraphQLString },
    transportationArrivalTime: { type: GraphQLString },
    transportationBookedOn: { type: GraphQLString },
    transportationConfirmationNumber: { type: GraphQLString },
    transportationDepartureTime: { type: GraphQLString },
    transportationDirection: { type: GraphQLString },
    transportationDuration: { type: GraphQLString },
    type: { type: GraphQLString },
  })
});

const TripItineraryType = new GraphQLObjectType({
  name: 'TripItinerary',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    events: { type: GraphQLList(TripItineraryEventsType) },
  })
});

const ItineraryType = new GraphQLObjectType({
  name: 'Itinerary',
  fields: () => ({
    itinerary_id: { type: GraphQLString },
    tripInformation: { type: TripInformationType },
    tripItinerary: { type: GraphQLList(TripItineraryType) },
  })
});

const ItinerariesType = new GraphQLObjectType({
  name: 'Itineraries',
  fields: () => ({
    createdAt: { type: GraphQLString },
    itinerary_id: { type: GraphQLID },
    country: { type: GraphQLString },
    tripInformation: { type: TripInformationType },
    tripItinerary: { type: GraphQLList(TripItineraryType) },
  })
});

// Input Type
const TripInformationInputType = new GraphQLInputObjectType({
  name: 'TripInformationInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    type: { type: GraphQLString },
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    country: { type: GraphQLString },
    price: { type: GraphQLString },
    priceType: { type: GraphQLString },
    pathname: { type: GraphQLString },
    overview: { type: GraphQLString },
    tripStartDate: { type: GraphQLString },
    coverImage: { type: CoverImageInputType },
  })
});

const CoverImageInputType = new GraphQLInputObjectType({
  name: 'CoverImageInputType',
  fields: () => ({
    image: { type: GraphQLString },
    location: { type: GraphQLString },
  })
});

const TripItineraryEventsInputType = new GraphQLInputObjectType({
  name: 'TripItineraryEventsInputType',
  fields: () => ({
    accommodationBookedOn: { type: GraphQLString },
    accommodationConfirmationNumber: { type: GraphQLString },
    accommodationStatus: { type: GraphQLString },
    activityBookedOn: { type: GraphQLString },
    activityConfirmationNumber: { type: GraphQLString },
    activityDuration: { type: GraphQLString },
    airline: { type: GraphQLString },
    checkInTime: { type: GraphQLString },
    checkOutTime: { type: GraphQLString },
    cruiseBookedOn: { type: GraphQLString },
    cruiseConfirmationNumber: { type: GraphQLString },
    cruiseDuration: { type: GraphQLString },
    cruiseTime: { type: GraphQLString },
    currency: { type: GraphQLString },
    flightConfirmationNumber: { type: GraphQLString },
    flightDirection: { type: GraphQLString },
    flightDuration: { type: GraphQLString },
    flightNumber: { type: GraphQLString },
    gate: { type: GraphQLString },
    id: { type: GraphQLInt },
    infoTime: { type: GraphQLString },
    name: { type: GraphQLString },
    notes: { type: GraphQLString },
    price: { type: GraphQLString },
    priceType: { type: GraphQLString },
    terminal: { type: GraphQLString },
    time: { type: GraphQLString },
    title: { type: GraphQLString },
    tourBookedOn: { type: GraphQLString },
    tourConfirmationNumber: { type: GraphQLString },
    tourDuration: { type: GraphQLString },
    tourTime: { type: GraphQLString },
    transportationArrivalTime: { type: GraphQLString },
    transportationBookedOn: { type: GraphQLString },
    transportationConfirmationNumber: { type: GraphQLString },
    transportationDepartureTime: { type: GraphQLString },
    transportationDirection: { type: GraphQLString },
    transportationDuration: { type: GraphQLString },
    type: { type: GraphQLString },
  })
});

const TripItineraryInputType = new GraphQLInputObjectType({
  name: 'TripItineraryInputType',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    events: { type: GraphQLList(TripItineraryEventsInputType) },
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    destinations: {
      type: new GraphQLList(DestinationType),
      async resolve(parent, args) {
        const data = await fetchGet(`${process.env.APP_URL}/api/destinations`);
        console.log('RootQuery data', data);
        return data;
      }
    },
    itineraries: {
      type: GraphQLList(ItinerariesType),
      async resolve(parent, args) {
        const data = await fetchGet(`${process.env.APP_URL}/api/itineraries`);
        return data.itineraries;
      }
    },
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItinerary: {
      type: ItineraryType,
      args: {
        itinerary_id: { type: GraphQLString },
        tripInformation: { type: TripInformationInputType },
        tripItinerary: { type: GraphQLList(TripItineraryInputType) },
      },
      resolve(parent, args) {
        // return args;
        AWS.config.update(aws_creds.remote_config);
        const db = new AWS.DynamoDB.DocumentClient();

        const params = {
          TableName: aws_creds.itineraries_table_name,
          Item: {
            itinerary_id: args.itinerary_id,
            createdAt: moment().format(),
            country: args.tripInformation.country,
            tripInformation: args.tripInformation,
            tripItinerary: args.tripItinerary,
          }
        };

        console.log({ args });

        db.put(params, function(err, data) {
          if (err) {
            console.log('aws error', err);
            return err;
          }

          console.log('aws success');

          return params.Item;
        });

        return params.Item;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
