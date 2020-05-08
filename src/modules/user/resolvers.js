const resolvers = {
  Query: {
    user: () => {
      return {
        username: 'Pikachu',
        email: 'test@gmail.com',
        password: 'password',
      };
    },
  },
};

export default resolvers;
