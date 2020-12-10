require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import { graphQLModules } from "../../graphql";
import { permissions } from "../../graphql/middleware";
import { applyMiddleware } from "graphql-middleware";

// Create GraphqlModuleObject
const MyGraphQLModule = new GraphQLModule({
  imports: Object.values(graphQLModules),
});

export const applyGraphqlMiddleware = (expressApp) => {
  const { schema } = MyGraphQLModule;

  // Create Server
  const graphqlServer = new ApolloServer({
    // To enable jwt verification middleware
    schema: applyMiddleware(schema, permissions),

    // Submit Schema
    // schema: schema,

    context: async ({ req, connection }) => {
      return {
        req,
      };
    },
    formatError: (error) => {
      let err = {
        code: error.extensions.code,
        message: error.message,
        path: error.path,
      };

      if (process.env.NODE_ENV == "development") {
        err.extension = error.extensions;
      }

      return err;
    },
    // Client Introspection
    introspection: process.env.NODE_ENV == "production" ? false : true,
    // Production playground access
    playground: process.env.NODE_ENV == "production" ? false : true,
  });
  // Apply Graphql Middleware
  graphqlServer.applyMiddleware({ app: expressApp, path: "/graphql" });
};
