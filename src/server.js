import { ApolloServer } from 'apollo-server';
import { schema } from './app/schema';
import { sequelize } from './db/models';

const { models } = sequelize;

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      headers: req.headers,
      models,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
