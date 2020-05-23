import { ApolloServer } from 'apollo-server';
import { verify } from 'jsonwebtoken';
import { schema } from './app/schema';
import { sequelize } from './db/models';

const { models } = sequelize;

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let loggedUser;
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const { id } = verify(token, process.env.JWT_SECRET);
      const { User } = models;
      loggedUser = await User.findOne({ where: { id } });
    }

    return {
      loggedUser,
      models,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
