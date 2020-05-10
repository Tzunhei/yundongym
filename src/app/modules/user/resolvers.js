const resolvers = {
  Query: {
    user: () => {
      return {
        role: 'ADMIN',
        username: 'Pikachu',
        email: 'test@gmail.com',
        password: 'password',
      };
    },
  },
};

export default resolvers;
