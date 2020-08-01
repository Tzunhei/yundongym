const resolvers = {
  Query: {
    getExercises: async (_, args, { models }) => {
      const { Exercise, MuscleGroup } = models;

      return await Exercise.findAll({
        include: { model: MuscleGroup, as: 'muscleGroups' },
      });
    },
    getExerciseById: async (_, { id }, { models }) => {
      const { Exercise, MuscleGroup } = models;

      return await Exercise.findOne({
        where: { id },
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
      const exercise = await Exercise.update(
        { name, muscleGroups },
        { where: { id }, returning: true },
      );
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
