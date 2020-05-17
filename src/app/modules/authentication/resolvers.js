import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { sendActivationEmail } from 'utils/email';

const saltRounds = 12;

const resolvers = {
  Mutation: {
    login: async (_, { input }, { models }) => {
      const { User } = models;
      const { email, password } = input;

      const user = await User.findOne({ where: { email } });

      const isAuthenticated = await compare(password, user.password);
      if (!isAuthenticated) throw new Error('Authentification failed');

      const jwtToken = sign(
        { id: user.id, role: user.role, email },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return { message: 'User successfully login', token: jwtToken };
    },
    register: async (_, { input }, { models }) => {
      const { User } = models;
      const { role, username, email, password } = input;
      const cryptedPassword = await hash(password, saltRounds);

      if (await User.findOne({ where: { username, email } }))
        throw new Error(
          `User with username '${username}' and email '${email}' already exists`,
        );

      await User.create({ role, username, email, password: cryptedPassword });

      const activationToken = sign({ email, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      await sendActivationEmail(email, activationToken);

      return true;
    },
  },
};

export default resolvers;
