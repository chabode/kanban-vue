'use strict';
const { generatePassword } = require('../helper/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        email: 'ning@mail.id',
        password: generatePassword('ning123'),
        organization: 'Hacktiv8',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin@mail.id',
        password: generatePassword('admin123'),
        organization: 'Hacktiv8',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Users', data, {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate:true, restartIdentity:true})
    
  }
};
