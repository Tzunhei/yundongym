const resolvers = {
  Query: {
    getExercises: async (_, { id }, { models }) => {
      const { Exercise, MuscleGroup } = models;
      if (id)
        return await Exercise.findOne({
          where: { id },
          include: { model: MuscleGroup, as: 'muscleGroups' },
        });

      return await Exercise.findAll({
        include: { model: MuscleGroup, as: 'muscleGroups' },
      });
    },
  },
  Mutation: {
    createExercise: async (_, { input }, { models }) => {
      const { Exercise, MuscleGroup } = models;
      const { name, muscleGroups } = input;
      const exercise = await Exercise.create({
        name,
      });
      await exercise.addMuscleGroups(muscleGroups);

      return Exercise.findOne({
        where: { id: exercise.id },
        include: { model: MuscleGroup, as: 'muscleGroups' },
      });
    },
    updateExercise: async (_, { input }, { models }) => {},
    deleteExercise: async (_, { id }, { models: { Exercise } }) => {
      const deletedExercise = await Exercise.findOne({ where: { id } });
      await deletedExercise.destroy();

      return true;
    },
  },
};

export default resolvers;
