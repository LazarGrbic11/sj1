'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('Users', [{
      name:'admin',
      lastname:'admin',
      email:'admin@gmail.com',
      password:'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      admin: true,
      moderator: false
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', null,{});
  }
};