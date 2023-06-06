'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class llamadasdia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  llamadasdia.init({
    llamadas: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fechafinal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'llamadasdia',
  });
  return llamadasdia;
};