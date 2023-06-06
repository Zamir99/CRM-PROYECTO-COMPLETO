'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadoDescarte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EstadoDescarte.belongsTo(models.Descarte, { as: "Descarte", foreignKey: "idDescarte"});
    }
  }
  EstadoDescarte.init({
    estado: DataTypes.STRING,
    idDescarte: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EstadoDescarte',
  });
  return EstadoDescarte;
};