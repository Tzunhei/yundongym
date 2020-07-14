const resolvers = {
  Query: {
    getExercises: async (_, { id }, { models }) => {
      const { Exercise, MuscleGroup } = models;
      if (id) return await Exercise.findOne({ where: { id } });

      const allExercises = await Exercise.findAll({
        include: { model: MuscleGroup, as: 'muscleGroup' },
      });

      return allExercises;
    },
  },
  Mutation: {
    createExercise: async (_, { input }, { models }) => {
      const { Exercise, MuscleGroup } = models;
      const { name, muscleGroup } = input;
      const exercise = await Exercise.create({
        name,
      });
      await exercise.addMuscleGroups([muscleGroup]);

      return Exercise.findOne({
        where: { id: exercise.id },
        include: MuscleGroup,
      });
    },
  },
};

export default resolvers;
