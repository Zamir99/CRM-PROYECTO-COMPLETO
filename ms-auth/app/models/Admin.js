'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
    
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
     
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      require:true
     
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
      
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      require:true
    },
  }, {
      sequelize,
      modelName: 'Admin',
      tableName: "admins"
    });
   
  return Admin;
};