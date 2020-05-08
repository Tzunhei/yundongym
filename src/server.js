import { ApolloServer } from 'apollo-server';
import { schema } from './modules/schema';
import { sequelize } from './db';

const server = new ApolloServer({ schema });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
