import { ApolloServer } from 'apollo-server';
import { schema } from 'app/schema';
import { sequelize } from 'db/models';

const { models } = sequelize;

export const constructTestServer = ({ context }) => {
  const server = new ApolloServer({
    schema,
    context,
    models,
  });

  return server;
};
