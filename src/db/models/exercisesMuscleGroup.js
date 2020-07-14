module.exports = (sequelize, DataTypes) => {
  const ExerciseMuscleGroup = sequelize.define(
    'ExerciseMuscleGroup',
    {
      muscleGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'MuscleGroups',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      exerciseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Exercise',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {},
  );

  return ExerciseMuscleGroup;
};
