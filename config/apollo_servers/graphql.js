require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import { graphQLModules } from "../../graphql";

// Create GraphqlModuleObject
const MyGraphQLModule = new GraphQLModule({
  imports: Object.values(graphQLModules),
});

export const applyGraphqlMiddleware = (expressApp) => {
  // Create Server
  const graphqlServer = new ApolloServer({
    // Submit Schema
    schema: MyGraphQLModule.schema,
    // Client Introspection
    introspection: process.env.NODE_ENV == "production" ? false : true,
    // Production playground access
    playground: process.env.NODE_ENV == "production" ? false : true,
  });
  // Apply Graphql Middleware
  graphqlServer.applyMiddleware({ app: expressApp, path: "/graphql" });
};
