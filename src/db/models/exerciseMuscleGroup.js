module.exports = (sequelize, DataTypes) => {
  const ExerciseMuscleGroup = sequelize.define(
    'ExerciseMuscleGroup',
    {
      MuscleGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'MuscleGroup',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ExerciseId: {
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
    {
      timestamps: false,
    },
  );

  return ExerciseMuscleGroup;
};
