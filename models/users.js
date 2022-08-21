'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Post, Comment, Tag }) {
      this.hasMany(Post, { foreignKey: 'userId', as: 'post', onDelete: 'cascade', hooks: true });
      this.hasMany(Tag, { foreignKey: 'tagId', as: 'tag', onDelete: 'cascade', hooks: true });
      this.hasMany(Comment, { foreignKey: 'commentId', as: 'comment', onDelete: 'cascade', hooks: true });
    }
  };
  
  Users.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }, 
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije validan email"
        }
      }
    },
    moderator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true
      }
    },
  }, {
    sequelize,
    validate:{
      adminOrModerator() {
        if (this.admin === true && this.moderator === true) {
          throw new Error('Admin ne može biti istovremeno i moderator, i obrnuto.');
        }
      },
    },
    defaultScope: {
      attributes: { exlude: ['email'] }
    },
    modelName: 'Users',
  });
  return Users;
};