module.exports = (sequelize, DataTypes) => {
  const Set = sequelize.define(
    'Set',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      numberOfSets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      repetitions: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      duration: {
        type: DataTypes.TIME,
      },
      weight: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {},
  );
  Set.associate = function ({ Set, Workout, Exercise }) {
    Set.belongsTo(Workout, { foreignKey: 'WorkoutId' });
    Set.belongsTo(Exercise, { foreignKey: 'ExerciseId' });
  };

  return Set;
};
