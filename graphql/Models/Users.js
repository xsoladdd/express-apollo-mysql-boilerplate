import { gql } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import Models from "../../Model";
// import {InsertGraphMethod} from 'objection'

const { Users, Todo } = Models;

// Schema
const typeDefs = gql`
  type Todo {
    name: String
    is_finish: Boolean
    user: User
  }

  type User {
    id: ID
    first_name: String
    last_name: String
    getFullName: String
    todo: [Todo]
  }

  input InputUserFilter {
    id: Int!
    first_name: String
    last_name: String
  }

  input InputNewUser {
    first_name: String!
    last_name: String!
  }

  input InputNewTodo {
    name: String!
    user_id: Int!
  }

  type Query {
    getUser(input: InputUserFilter): User
    getUsers: [User]
    getUsersProtected: [User]
  }

  type Mutation {
    newUser(input: InputNewUser): User
    newTodo(input: InputNewTodo): User
  }
`;

const resolvers = {
  User: {
    first_name: async (parent) => {
      return `${parent.first_name} Concat `;
    },
    getFullName: async (parent) => {
      return `${parent.first_name} ${parent.last_name}`;
    },
    todo: async (parent) => {
      const { id } = parent;
      const data = await Todo.query().where("user_id", id);
      return data;
    },
  },
  Query: {
    getUser: async (_, { input }) => {
      const { id } = input;
      const data = await Users.query().findOne("id", id);
      return data;
    },
    getUsers: async () => {
      const data = await Users.query();
      return data;
    },
    getUsersProtected: async () => {
      const data = await Users.query();
      return data;
    },
  },
  Mutation: {
    newUser: async (_, { input }) => {
      const data = await Users.query().insertGraph(input);
      return data;
    },
    newTodo: async (_, { input }) => {
      const { user_id, name: todoName } = input;

      const data = await Todo.query().insertGraph({
        name: todoName,
        user_id,
      });
      const userData = await Users.query().findOne("id", user_id);
      console.log(userData);
      return userData;
    },
  },
};

export default new GraphQLModule({
  // imports: [require("./Todo")],
  typeDefs,
  resolvers,
});
