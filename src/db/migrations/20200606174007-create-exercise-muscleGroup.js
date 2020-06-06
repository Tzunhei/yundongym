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
          model: {
            tableName: 'Exercises',
            schema: 'schema',
          },
          key: 'id',
        },
      },
      muscleGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'MuscleGroups',
            schema: 'schema',
          },
          key: 'id',
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MuscleGroups');
  },
};
