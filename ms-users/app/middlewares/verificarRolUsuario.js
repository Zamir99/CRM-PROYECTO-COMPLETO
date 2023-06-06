const { response } = require('express');

const verificarRolUsuario = (rolesPermitidos) => {
  return (req, res = response, next) => {
    console.log('Roles permitidos:', rolesPermitidos);

    const rolUsuario = req.usuario && req.usuario.rol;

    if (rolUsuario && rolesPermitidos.includes(rolUsuario)) {
      next(); // Llama a next() solo cuando el rol del usuario esté permitido
    } else {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
  };
};

module.exports = verificarRolUsuario;
