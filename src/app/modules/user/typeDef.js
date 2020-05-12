import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @hasRole(roles: [Role!]) on FIELD_DEFINITION

  type Query {
    me: User! @auth
    users: [User!] @auth @hasRole(roles: [ADMIN])
  }

  type User {
    role: Role!
    username: String!
    email: String!
  }

  enum Role {
    ADMIN
    USER
  }
`;

export default typeDefs;
