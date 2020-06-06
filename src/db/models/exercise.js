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
    },
    {},
  );
  Exercise.associate = function ({
    Exercise,
    Set,
    MuscleGroup,
    ExerciseMuscleGroup,
  }) {
    Exercise.belongsTo(Set, { foreignKey: 'setId' });
    Exercise.belongsToMany(MuscleGroup, { through: ExerciseMuscleGroup });
  };

  return Exercise;
};
