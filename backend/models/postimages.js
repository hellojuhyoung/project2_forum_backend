'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostImages.init({
    postImage: DataTypes.STRING,
    postid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostImages',
  });
  return PostImages;
};