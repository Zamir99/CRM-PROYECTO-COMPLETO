const { response } = require('express');

const verificarRol = (rolesPermitidos) => {
  return (req, res = response, next) => {
    const rolUsuario = req.usuario && req.usuario.rol;

    if (!rolUsuario) {
      return res.status(401).json({ message: 'Acceso no autorizado. Debe iniciar sesión primero.' });
    }

    if (rolesPermitidos.includes(rolUsuario)) {
      next(); // Llama a next() solo cuando el rol del usuario está incluido en los roles permitidos
    } else {
      res.status(403).json({ message: `Permiso denegado. No tienes permiso para realizar esta acción.` });
    }
  };
};

module.exports = verificarRol;
