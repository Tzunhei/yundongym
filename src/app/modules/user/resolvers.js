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
  },
};

export default resolvers;
