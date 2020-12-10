const {
  rule,
  shield,
  not,
  allow,
  deny,
  inputRule,
  and,
  or,
  chain,
  race,
} = require("graphql-shield");
import { UserInputError } from "apollo-server-express";
import { compareSync } from "bcrypt";
import { verifyToken } from "../../utils";
const { ApolloError } = require("apollo-server");

// check user if authorized
const isAuthenticated = rule()(async (parent, args, ctx) => {
  if (
    ctx.req.headers.authorization === null ||
    ctx.req.headers.authorization === ""
  ) {
    compareSync.log(false);
    return false;
  }
  // console.log(ctx.req.headers.authorization);
  const decodedToken = await verifyToken(ctx.req.headers.authorization);
  // console.log(decodedToken);
  return decodedToken ? true : false;
});

const permissions = shield(
  {
    Query: {
      login: allow,
      getUsers: allow,
      "*": isAuthenticated,
    },
    Mutation: {
      register: allow,
      "*": isAuthenticated,
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing;
      } else if (thrownThing instanceof UserInputError) {
        // unexpected errors
        return new UserInputError("Invalid user inputs!");
      } else {
        return new ApolloError("Not authorised.", 401);
      }
    },
  }
);

module.exports = permissions;
