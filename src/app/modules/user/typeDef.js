import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @hasRole(roles: [Role!]) on FIELD_DEFINITION

  type Query {
    me: User! @auth
    users: [User!] @auth @hasRole(roles: [USER])
  }

  type Mutation {
    updateUser(input: userInput!): User!
  }

  type User {
    role: Role!
    username: String!
    email: String!
    isConfirmed: Boolean!
  }

  input userInput {
    id: ID!
    role: Role
    username: String
    email: String!
    isConfirmed: Boolean
  }

  enum Role {
    ADMIN
    USER
  }
`;

export default typeDefs;
