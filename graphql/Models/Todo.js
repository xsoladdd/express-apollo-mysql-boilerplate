import { gql } from "apollo-server-express";
import { GraphQLModule } from "@graphql-modules/core";
import Models from "../../Model";
// import {InsertGraphMethod} from 'objection'

const { Todo, Users } = Models;

// Schema
const typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
  }

  type Todo {
    name: String
    is_finish: Boolean
    user: User
  }

  input InputTodo {
    name: String!
    user_id: Int!
  }

  input InputTodoFilter {
    id: Int!
  }

  input InputTodosFilter {
    is_finish: Boolean
    user_id: Int
  }
  type Query {
    getTodo(input: InputTodoFilter): Todo
    getTodos(input: InputTodosFilter): [Todo]
  }
`;

const resolvers = {
  Todo: {
    user: async (parent) => {
      const { user_id } = parent;
      const UserFetchData = await Users.query().findOne("id", user_id);
      console.log(UserFetchData);
      return UserFetchData;
    },
  },
  Query: {
    getTodo: async (_, { input }) => {
      const { id } = input;
      const todoFetchData = await Todo.query().findOne("id", id);
      // console.log(todoFetchData);
      return todoFetchData;
    },
  },
  Mutation: {},
};

export default new GraphQLModule({ typeDefs, resolvers });
