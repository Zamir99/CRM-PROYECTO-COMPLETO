const jwt = require('jsonwebtoken');
const { response } = require ("express");

const validarJWT = ( req, res = response, next) =>{

  const token = req.header('x-token');

  if (!token){
    res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    });
  }
  
  try  {
    const { id, nombre, apellido, rol } = jwt.verify(token, process.env.AUTH_SECRET);
    req.id = id;
    req.nombre = nombre;
    req.apellido = apellido;
    req.rol = rol;

   /*  // Verificar si el usuario tiene el rol adecuado
    if (rol !== 'super-admin' && rol !== 'admin' && rol !== 'comercial') {
      return res.status(403).json({
        ok: false,
        msg: 'No tienes permiso para realizar esta acción'
      });
    } */
  } catch (error){
    return res.status(401).json({  
      ok: false,
      msg: 'Token no valido'
    });
  }
  
  next();
}



module.exports = validarJWT;
