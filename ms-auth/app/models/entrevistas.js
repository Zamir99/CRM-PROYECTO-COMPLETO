'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entrevistas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  entrevistas.init({
    fecha_entrevista: DataTypes.STRING,
    estado_entrevista: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'entrevistas',
  });
  return entrevistas;
};