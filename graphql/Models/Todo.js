import { gql } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import Models from "../../Model";
// import {InsertGraphMethod} from 'objection'

const { Todo, Users } = Models;

// Schema
const typeDefs = gql``;

const resolvers = {
  Query: {},
  Mutation: {},
};

export default new GraphQLModule({ typeDefs, resolvers });
