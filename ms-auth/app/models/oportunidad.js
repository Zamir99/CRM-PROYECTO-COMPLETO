'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oportunidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oportunidad.init({
    descripcion: DataTypes.STRING,
    archivos: DataTypes.STRING,
    comentarios: DataTypes.STRING,
    etiquetas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'oportunidad',
  });
  return oportunidad;
};