'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MuscleGroups', [
      {
        name: 'chest',
      },
      {
        name: 'shoulders',
      },
      {
        name: 'back',
      },
      {
        name: 'legs',
      },
      {
        name: 'calves',
      },
      {
        name: 'arms',
      },
      {
        name: 'abdominals',
      },
      {
        name: 'glutes',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MuscleGroups', {});
  },
};
