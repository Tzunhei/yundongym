import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    user: User!
  }

  type User {
    username: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;
