import { verify } from 'jsonwebtoken';
import { sendAccountActivatedEmail } from '@utils/email';

const resolvers = {
  Query: {
    me: (parent, args, { loggedUser }) => loggedUser,
    users: async (parent, args, { models }) => {
      const { User } = models;

      return await User.findAll({});
    },
  },
  Mutation: {
    updateUser: async (parent, { input }, { loggedUser, models }) => {
      const { User } = models;
      const { id } = loggedUser;

      await User.update({ ...input }, { where: { id } });

      return await User.findOne({ where: { id } });
    },
    confirmUser: async (parent, { token }, { models }) => {
      const { User } = models;
      const { email } = verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email } });
      if (user.isConfirmed)
        throw new Error('Your account is already activated');

      await User.update({ isConfirmed: true }, { where: { id: user.id } });

      await sendAccountActivatedEmail(email);

      return true;
    },
  },
};

export default resolvers;
