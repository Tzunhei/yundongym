import { makeExecutableSchema } from 'apollo-server';
import { merge } from 'lodash';
import { UserResolvers, UserTypeDef } from './user';

const typeDefs = [UserTypeDef];

const resolvers = merge(UserResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
