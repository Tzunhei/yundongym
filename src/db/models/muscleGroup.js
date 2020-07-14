module.exports = (sequelize, DataTypes) => {
  const MuscleGroup = sequelize.define(
    'MuscleGroup',
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
    {
      timestamps: false,
    },
  );
  MuscleGroup.associate = function ({
    MuscleGroup,
    Exercise,
    ExerciseMuscleGroup,
  }) {
    MuscleGroup.belongsToMany(Exercise, {
      through: ExerciseMuscleGroup,
    });
  };

  return MuscleGroup;
};
