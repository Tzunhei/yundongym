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
        unique: true,
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
    Exercise.hasMany(Set, { foreignKey: 'ExerciseId' });
    Exercise.belongsToMany(MuscleGroup, { through: ExerciseMuscleGroup });
  };

  return Exercise;
};
