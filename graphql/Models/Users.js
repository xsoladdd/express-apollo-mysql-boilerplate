import { gql } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import Models from "../../Model";
import Common from "./Common";
import { checkPassword, hashPassword, generateToken } from "../../utils";
// import {InsertGraphMethod} from 'objection'

const { Users, Todo } = Models;

// Schema
const typeDefs = gql`
  type User {
    id: EncryptedString
    first_name: String
    last_name: String
    email: String
    date_created: DateTime
    date_updated: DateTime
  }
  type returnUser {
    status: Int
    user: User
    message: String
    token: String
  }
  type returnUsers {
    status: Int
    user: [User]
    message: String
  }

  input inputFilterUserQuery {
    id: EncryptedString
  }

  input inputRegister {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  input inputLogin {
    email: String!
    password: String!
  }

  type Mutation {
    register(input: inputRegister): returnUser
  }
  type Query {
    getUser(input: inputFilterUserQuery, token: String): returnUser
    getUsers: returnUsers
    getUsersProtected: returnUsers
    login(input: inputLogin): returnUser
  }
`;

const resolvers = {
  Query: {
    getUser: async (_, { input }) => {
      const { id } = input;
      const data = await Users.query().findById(id);
      // Check if no data in database
      if (!data) {
        return {
          status: 0,
          message: "No data found",
        };
      }
      return {
        status: 1,
        user: data,
      };
    },
    getUsers: async () => {
      const data = await Users.query();
      // Check if no data in database
      if (data.length <= 0) {
        return {
          status: 0,
          user: [],
          message: "No data found",
        };
      }

      return {
        status: 1,
        user: data,
      };
    },
    login: async (_, { input }) => {
      const { email, password } = input;
      const user = await Users.query().findOne("email", email);

      if (await checkPassword(password, user.password)) {
        const token = await generateToken(user);
        return {
          status: 1,
          user: user,
          message: "Login Success",
          token: token,
        };
      }
      return {
        status: 0,
        message: "Incorrect Username/Password",
      };
    },
  },
  Mutation: {
    register: async (_, { input }) => {
      const { first_name, last_name, email, password } = input;
      const hashedPassword = await hashPassword(password);
      const data = await Users.query().insertGraph({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      return {
        status: 1,
        user: data,
        message: "Succesfully Fetch",
      };
    },
  },
};

export default new GraphQLModule({
  // imports: [require("./Todo")],
  typeDefs,
  resolvers,
  imports: [Common],
});
