const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");
const axios = require("axios");

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    details: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    id: { type: GraphQLString },
    rocket: { type: GraphQLString },
    rocketInfo: {
      type: RocketType,
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${parent.rocket}`)
          .then((res) => res.data);
      },
    },
  }),
});

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    stages: { type: GraphQLInt },
    cost_per_launch: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/launches")
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then((res) => res.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/rockets")
          .then((res) => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
