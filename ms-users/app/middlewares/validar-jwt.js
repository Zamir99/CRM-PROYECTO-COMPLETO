const jwt = require('jsonwebtoken');
const { response } = require('express');

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error en el token'
    });
  }

  try {
    const { id, nombre, apellido, rol } = jwt.verify(token, process.env.AUTH_SECRET);
    const usuario = { id, nombre, apellido, rol }; // Crear el objeto usuario con los datos obtenidos del token
    req.usuario = usuario; // Asignar el objeto usuario a req.usuario

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }
};

module.exports = validarJWT;