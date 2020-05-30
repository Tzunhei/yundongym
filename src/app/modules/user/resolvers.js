import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import {
  sendAccountActivatedEmail,
  sendResetPasswordEmail,
} from '@utils/email';

const saltRounds = 12;

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
    updatePassword: async (
      parent,
      { oldPassword, newPassword },
      { loggedUser, models },
    ) => {
      const { User } = models;
      const { id } = loggedUser;

      const { password } = await User.findOne({ where: { id } });
      const isMatch = await compare(oldPassword, password);

      if (!isMatch)
        throw new Error(
          'Votre entrée ne correspond pas à votre mot de passe actuel.',
        );

      const cryptedNewPassword = await hash(newPassword, saltRounds);

      await User.update({ password: cryptedNewPassword }, { where: { id } });

      return true;
    },
    triggerResetPassword: async (parent, { email }, { models }) => {
      const { User } = models;
      const { id } = await User.findOne({ where: { email } });

      const resetToken = sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      await sendResetPasswordEmail(email, resetToken);

      return true;
    },
    resetPassword: async (parent, { token, newPassword }, { models }) => {
      const { User } = models;

      const { id } = verify(token, process.env.JWT_SECRET);
      const cryptedNewPassword = await hash(newPassword, saltRounds);

      await User.update({ password: cryptedNewPassword }, { where: { id } });

      return true;
    },
  },
};

export default resolvers;
