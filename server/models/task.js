'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model{}
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Your task is empty'
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Your Category is empty'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty : {
          msg: 'Your appointed member is missing'
        }
      }
    }
  }, { sequelize });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};