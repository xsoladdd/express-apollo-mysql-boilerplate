import { gql } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import { GraphQLScalarType } from "graphql";
import { encrypt, decrypt } from "../utils";

export const typeDefs = gql`
  scalar EncryptedString
  scalar DateTime
`;

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        GraphQLScalarType;
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  EncryptedString: new GraphQLScalarType({
    name: "EncryptedString",
    description: "Scalar for an encrypted string",
    parseValue: (value) => {
      return decrypt(value); // value sent from the client - automatically decrypt when reaching the endpoint
    },
    serialize: (value) => {
      return encrypt(value); // value sent to the client - automatically encrypt before sending to client
    },
    parseLiteral: (ast) => {
      return decrypt(ast.value); // value from the client
    },
  }),
};

export default new GraphQLModule({ typeDefs, resolvers });
