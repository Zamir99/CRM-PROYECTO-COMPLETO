const obtenerRolUsuario = () => {
  return async (req, res, next) => {
    try {
      const usuarioId = req.usuario.id; // Obtener el ID del usuario desde el token

      // Importar el modelo de Admin
      const { Admin } = require('../models');


      // Consultar el usuario en la base de datos
      const usuario = await Admin.findByPk(usuarioId);

      if (!usuario) {
        return res.status(401).json({ message: 'Usuario no encontrado.' });
      }

      req.usuario.rol = usuario.rol; // Asignar el rol del usuario obtenido de la base de datos a req.usuario.rol

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el rol del usuario.' });
    }
  };
};

module.exports = obtenerRolUsuario;
