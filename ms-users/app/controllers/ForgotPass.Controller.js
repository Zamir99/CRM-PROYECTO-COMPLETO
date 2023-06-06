const { Admin } = require('../models/index');
const bcrypt = require('bcrypt');
const forgotpass = require('../../config/forgotpass');
const { response } = require ('express');
const { generarJWT } = require ('../helpers/jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const emailer = require('../helpers/emailer');

const generateLinkToken = (token) => {
  return `http://localhost:4200/change-password?token=${token}`;
}

module.exports = {

  async resetPassword(req, res = response) {
    const { email } = req.body;
  
    try {
      // Verificar email
      const usuario = await Admin.findOne({ where: { email } });
  
      if (!usuario) {
        return res.status(400).json({
          ok: false,
          msg: 'El email no está registrado en nuestra base de datos'
        });
      }
  
      // Crear token JWT con tiempo de expiración corto
      const token = await generarJWT(usuario.id, usuario.nombre);
  
      const linkToken = generateLinkToken(token);
  
      emailer.sendMail(usuario, linkToken);
  
      return res.json({
        ok: true,
        id: usuario.id,
        name: usuario.nombre,
        lastname: usuario.apellido,
        msg: linkToken,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      });
    }
  },

  async changePassword(req, res = response){
    const { id } = req;

    const { password, password2,   } = req.body;
  
    try {

      if (password != password2) {
        return res.status(400).json({
          ok: false,
          msg: 'Las contraseñas no son iguales'
        });
      } else {
        const usuario = await Admin.findOne({ where: { id }});
        const salt = bcrypt.genSaltSync();
        usuario.new_password = bcrypt.hashSync(password, salt);

        usuario.password = usuario.new_password;
        await usuario.save();
      }
      return res.status(200).json({
        ok: true,
        msg: 'Contraseña actualizada correctamente'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
    }
  },
  
  async revalidarToken(req, res = response){
    const { id } = req;
    const usuario = await Admin.findOne({ where: { id } });
    const token = await generarJWT(id, usuario.nombre);
    return res.json({
      ok: true,
      id: usuario.id,
      name: usuario.nombre,
      lastname: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
      token
    })
  },

  generateLinkToken, 
};
