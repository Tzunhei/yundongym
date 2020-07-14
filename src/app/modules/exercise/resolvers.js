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
      });
      await exercise.addMuscleGroups([muscleGroup]);

      return Exercise.findOne({ where: { id: exercise.id } });
    },
  },
};

export default resolvers;
