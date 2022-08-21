const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
      static associate({ Post }) {
          this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
      }
    };
    Tag.init({
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
      modelName: 'Tag',
    });
    return Tag;
  };