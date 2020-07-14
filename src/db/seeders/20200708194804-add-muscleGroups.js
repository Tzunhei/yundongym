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
        name: 'biceps',
      },
      {
        name: 'triceps',
      },
      {
        name: 'forearms',
      },
      {
        name: 'abdominals',
      },
      {
        name: 'glutes',
      },
      {
        name: 'quadriceps',
      },
      {
        name: 'hamstrings',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MuscleGroups', {});
  },
};
