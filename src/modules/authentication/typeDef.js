import { gql } from 'apollo-server';

const typeDefs = gql`
  type Mutation {
    login(input: loginInput!): loginResponse!
    register(input: registerInput!): Boolean!
  }

  input loginInput {
    email: String!
    password: String!
  }

  input registerInput {
    username: String!
    email: String!
    password: String!
  }

  type loginResponse {
    message: String!
    token: String!
  }
`;

export default typeDefs;
