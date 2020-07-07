'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exercise', [{}]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exercise', null, {});
  },
};
