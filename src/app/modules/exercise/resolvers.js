const resolvers = {
  Query: {
    getExercises: async (_, { id }, { models }) => {
      const { Exercise } = models;
      if (id) return await Exercise.findOne({ where: { id } });

      return await Exercise.findAll({});
    },
  },
  Mutation: {
    createExercise: async (_, { input }, { models }) => {
      const { Exercise } = models;
      const { name, muscleGroup } = input;
      const exercise = await Exercise.create({
        name,
        muscleGroup,
      });

      return exercise;
    },
  },
};

export default resolvers;
