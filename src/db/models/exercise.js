module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define(
    'Exercise',
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
      sets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
  Exercise.associate = function ({ Exercise, Workout }) {
    Exercise.belongsTo(Workout, { foreignKey: 'workoutId' });
  };

  return Exercise;
};
