import { ApolloServer } from 'apollo-server';
import { schema } from './modules/schema';
import { sequelize } from './db/models';

const { models } = sequelize;

const server = new ApolloServer({ schema, context: { models } });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
