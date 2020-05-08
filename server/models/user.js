'use strict';
module.exports = (sequelize, DataTypes) => {
  const { generatePassword } = require('../helper/bcrypt')
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Email Column is Empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Password Column is Empty'
        }
      }
    },
    organization : {
      type : DataTypes.STRING
    }
  }, { sequelize });
  
  User.beforeCreate((instance, options) => {
    instance.organization = 'Hacktiv8'
    let hash = generatePassword(instance.password)
    instance.password = hash
  })
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};