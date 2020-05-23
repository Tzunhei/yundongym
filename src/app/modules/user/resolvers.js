const resolvers = {
  Query: {
    me: (parent, args, { loggedUser }) => loggedUser,
    users: (parent, args, { models }) => {
      const { User } = models;

      return User.findAll({});
    },
  },
  Mutation: {
    updateUser: (parent, { input }, { models }) => {},
  },
};

export default resolvers;
