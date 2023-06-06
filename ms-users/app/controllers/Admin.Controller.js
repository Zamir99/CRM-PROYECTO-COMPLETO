const { Admin } = require('../models/index');
const bcrypt = require('bcrypt');
const adminConfig = require('../../config/admin');
const { response } = require ('express');
const { generarJWT } = require ('../helpers/jwt');



module.exports = {

async crearUsuario  (req, res = response) {

    const {nombre, apellido, email, password, telefono, rol} = req.body;

    try {

        
        // Verificar email
        const usuario = await Admin.findOne({ where: { email } });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe en nuestra base de datos'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Admin( req.body );

        // Encripta la contraseña
        const salt = bcrypt.genSaltSync();

        dbUser.password = bcrypt.hashSync( password, salt );

        // Crear token JWT
        const token = await generarJWT(dbUser.id, dbUser.nombre);

        // Crear en la DB
        await dbUser.save();

        return res.status(201).json({
            ok: true,
            id: dbUser.id,
            nombre, 
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
        
    }
}
