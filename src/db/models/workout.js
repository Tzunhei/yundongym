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
    },
    {},
  );
  Workout.associate = function ({ Workout, User }) {
    Workout.belongsTo(User, { foreignKey: 'userId' });
  };

  return Workout;
};
