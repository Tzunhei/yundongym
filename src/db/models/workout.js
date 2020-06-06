module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define(
    'Workout',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.TIME,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {},
  );
  Workout.associate = function ({ Workout, User, Exercise }) {
    Workout.belongsTo(User, { foreignKey: 'userId' });
    Workout.hasMany(Exercise, { foreignKey: 'workoutId' });
  };

  return Workout;
};
