'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ Users, Tag, Comment }) {
        this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
        this.hasMany(Tag, { foreignKey: 'tagId', as: 'tag', onDelete: 'cascade', hooks: true });
        this.hasMany(Comment, { foreignKey: 'commentId', as: 'comment', onDelete: 'cascade', hooks: true });
    }
  };
  Post.init({
    header: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },

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
    modelName: 'Post',
  });
  return Post;
};