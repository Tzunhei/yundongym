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
  Workout.associate = function ({ Workout, User, Set }) {
    Workout.belongsTo(User, { foreignKey: 'UserId' });
    Workout.hasMany(Set, { foreignKey: 'WorkoutId' });
  };

  return Workout;
};
