'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Users, Post }) {
        this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
        this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
    }
  };
  Comment.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};