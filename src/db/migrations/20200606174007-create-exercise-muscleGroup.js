'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MuscleGroups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      muscleGroupId: {
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
    return queryInterface.dropTable('MuscleGroups');
  },
};
