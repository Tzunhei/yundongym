import { ApolloServer } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { schema } from './app/schema';
import { sequelize } from './db/models';

const { models } = sequelize;

const context = async ({ req: { headers } }) => {
  let loggedUser;
  if (headers.authorization) {
    try {
      const token = headers.authorization.replace('Bearer ', '');
      const { id } = await verify(token, process.env.JWT_SECRET);
      const { User } = models;
      loggedUser = await User.findOne({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {
    headers,
    loggedUser,
    models,
  };
};

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
