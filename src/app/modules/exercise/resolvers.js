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

      return await Exercise.findOne({
        where: { id: exercise.id },
        include: { model: MuscleGroup, as: 'muscleGroups' },
      });
    },
    updateExercise: async (
      _,
      { id, input: { name, muscleGroups } },
      { models: { Exercise, MuscleGroup } },
    ) => {
      await Exercise.update({ name, muscleGroups }, { where: { id } });

      const exercise = await Exercise.findOne({ where: { id } });
      await exercise.setMuscleGroups(muscleGroups);

      return await Exercise.findOne({
        where: { id },
        include: { model: MuscleGroup, as: 'muscleGroups' },
      });
    },
    deleteExercise: async (_, { id }, { models: { Exercise } }) => {
      const deletedExercise = await Exercise.findOne({ where: { id } });
      await deletedExercise.destroy();

      return true;
    },
  },
};

export default resolvers;
