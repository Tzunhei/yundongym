'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExerciseMuscleGroups', {
      ExerciseId: {
        type: Sequelize.UUID,
        references: {
          model: 'Exercises',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      MuscleGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MuscleGroups',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExerciseMuscleGroups');
  },
};
