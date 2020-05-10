import { decode } from 'jsonwebtoken';

const resolvers = {
  Query: {
    me: (parent, args, { headers, models }) => {
      const token = headers.authorization.replace('Bearer ', '');
      const { id } = decode(token, process.env.JWT_SECRET);
      const { User } = models;

      return User.findOne({ where: { id } });
    },
    users: (parent, args, { models }) => {
      const { User } = models;

      return User.findAll({});
    },
  },
};

export default resolvers;
