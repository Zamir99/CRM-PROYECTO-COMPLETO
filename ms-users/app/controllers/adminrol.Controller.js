const { Admin } = require('../models');

// Función para obtener todos los roles
exports.obtenerTodos = async (req, res) => {
  try {
    const roles = await Admin.findAll({
      attributes: ['id', 'nombre', 'email', 'rol']
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Función para crear un nuevo usuario con rol de Admin o Super Admin
const bcrypt = require('bcrypt');

exports.crearAdmin = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, rol } = req.body;
    const rolUsuario = req.usuario.rol; // Obtener el rol del usuario autenticado

    // Verificar si el rol del usuario autenticado es "super-admin"
    if (rolUsuario !== "super-admin") {
      return res.status(403).json({ message: "Permiso denegado. Solo los usuarios super-admin pueden crear usuarios super-admin." });
    }

    // Generar un salt sincrónicamente
    const salt = bcrypt.genSaltSync(10);

    // Generar el hash de la contraseña 
    const hashedPassword = bcrypt.hashSync(password, salt);

    const usuario = await Admin.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      telefono,
      rol
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al crear el usuario' });
  }
};



// Función para actualizar un rol existente
exports.actualizarAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Asegúrate de que req.params contiene el valor de id correctamente
    const { nombre, email, password, rol } = req.body;

    // Verifica si el valor de id es válido antes de realizar la consulta
    if (!id) {
      return res.status(400).json({ message: 'El parámetro id es requerido' });
    }

    const usuario = await Admin.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;

    await usuario.save();
    res.json({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar el usuario' });
  }
};


exports.eliminarAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const rolUsuario = req.usuario.rol; // Obtener el rol del usuario autenticado

    if (rolUsuario === "super-admin") {
      // Si es "super-admin", eliminar el usuario por su ID sin restricciones
      await Admin.destroy({ where: { id } });
      return res.status(204).json({ message: "Usuario eliminado exitosamente" });
    }

    if (rolUsuario === "admin") {
      // Si es "admin", verificar el rol del usuario que se intenta eliminar
      const usuario = await Admin.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar si el rol del usuario a eliminar no es "admin" ni "super-admin"
      if (usuario.rol !== "admin" && usuario.rol !== "super-admin") {
        // Si no es "admin" ni "super-admin", permitir eliminar
        await Admin.destroy({ where: { id } });
        return res.status(204).json({ message: "Usuario eliminado exitosamente" });
      }

      // Si es "admin" o "super-admin", no permitir la eliminación
      return res.status(403).json({ message: "Permiso denegado. Los usuarios con rol admin no pueden eliminar usuarios con rol admin o super-admin" });
    }

    // Si el rol del usuario autenticado no es "super-admin" ni "admin", no permitir la eliminación
    res.status(403).json({ message: "Permiso denegado. Solo los usuarios super-admin y admin pueden eliminar usuarios" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




