'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Descarte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // un descarte tiene muchos estados descarte 
      Descarte.hasMany(models.EstadoDescarte,{ as: "EstadoDescarte", foreignKey: "idDescarte"});
    }
  }
  Descarte.init({
    seguimiento: DataTypes.STRING,
    titulo: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Descarte',
  });
  return Descarte;
};