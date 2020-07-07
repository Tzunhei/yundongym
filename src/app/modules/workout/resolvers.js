const resolvers = {
  Query: {},
  Mutation: {
    createWorkout: async (_, { input }, { models, loggedUser }) => {
      const { Workout, Set } = models;
      const { id } = loggedUser;
      const { name, duration, date, sets } = input;

      const { id: workoutId } = await Workout.create({
        userId: id,
        name,
        duration,
        date,
      });
      await Promise.all(
        sets.map(async (set) => {
          const { exercise: exerciseId } = set;
          await Set.create({ workoutId, exerciseId, ...set });
        }),
      );

      return Workout.findOne({ where: { id: workoutId } });
    },
  },
};

export default resolvers;
