'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MuscleGroups', [{}]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MuscleGroups', {});
  },
};
