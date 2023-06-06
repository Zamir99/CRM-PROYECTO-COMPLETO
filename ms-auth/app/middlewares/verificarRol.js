const { response } = require("express");

function verificarRol(rolPermitido) {
  return (req, res, next) => {
    const rolUsuario = req.usuario && req.usuario.rol; // Validar que existe el objeto usuario y su propiedad rol
    if (rolUsuario === rolPermitido) {
      next(); // si el rol del usuario es el requerido, permitir el acceso a la ruta o acción
    } else {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción' }); // si el rol del usuario no es el requerido, devolver un error 403 Forbidden
    }
  };
}

module.exports = verificarRol;
