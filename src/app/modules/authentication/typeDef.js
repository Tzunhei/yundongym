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
    role: Role
    username: String!
    email: String!
    password: String!
  }

  type loginResponse {
    message: String!
    token: String!
  }

  enum Role {
    ADMIN
    USER
  }
`;

export default typeDefs;
