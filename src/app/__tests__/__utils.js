import { sign } from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server';
import { schema } from 'app/schema';
import { sequelize } from 'db/models';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const { models } = sequelize;

const newApolloServer = (jwtToken) => {
  return new ApolloServer({
    schema,
    context: () => ({
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      loggedUser: { id: 1, email: 'test@email.com' },
      models,
    }),
  });
};

export const testServer = {
  visitor: () => {
    return new ApolloServer({
      schema,
      context: () => ({
        models,
      }),
    });
  },
  admin: () => {
    const jwtToken = sign(
      { id: 1, role: 'ADMIN', email: 'test@email.com' },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return newApolloServer(jwtToken);
  },
  user: () => {
    const jwtToken = sign(
      { id: 1, role: 'USER', email: 'test@email.com' },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return newApolloServer(jwtToken);
  },
};
