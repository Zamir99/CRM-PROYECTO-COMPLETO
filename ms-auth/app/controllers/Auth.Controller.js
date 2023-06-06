const { Admin } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/admin');
const { response } = require ('express');
const { generarJWT } = require('../helpers/jwt');

module.exports = {
  async loginUsuario  (req, res = response) {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const dbUser = await Admin.findOne({ where: { email } });

        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email o password son incorrectos'
            });
        }
        // validar password
        const validPassword = bcrypt.compareSync( password, dbUser.password);

          if (!validPassword) {
              return res.status(400).json({
                ok: false,
                msg: 'El email o password son incorrectos'
            });
        }
        // Generar JWT
        const token = await generarJWT ( dbUser.id, dbUser.nombre);
          
        return res.json({
          ok: true,
          uid: dbUser.id,
          name: dbUser.nombre,
          lastname: dbUser.apellido,
          rol: dbUser.rol,
          token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
        
    },
async revalidarToken ( req, res = response){

    const { id } = req;

    // Leer la base de datos
    const dbUser = await Admin.findOne({ where: { id } });


    // Generar JWT
    const token = await generarJWT ( id, dbUser.nombre );

    return res.json({
        ok: true,
        id: id,
        name: dbUser.nombre,
        lastname: dbUser.apellido,
        email: dbUser.email,
        rol: dbUser.rol,
        token
    })
},

  
}