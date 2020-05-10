import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    user: User! @auth
  }

  type User {
    username: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
