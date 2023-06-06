const { Admin } = require('../models');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Admin.findAll();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener los usuarios' });
  }
};

const bcrypt = require('bcrypt');

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, rol } = req.body;

    // Generar un salt sincrónicamente
    const salt = bcrypt.genSaltSync(10);

    // Generar el hash de la contraseña 
    const hashedPassword = bcrypt.hashSync(password, salt);

    const usuario = await Admin.create({
      nombre,
      apellido,
      email,
      password: hashedPassword, // Guardar el hash de la contraseña en lugar del valor original
      telefono,
      rol
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al crear el usuario' });
  }
};
module.exports = exports;

exports.actualizarUsuario = async (req, res) => {
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



exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Admin.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el usuario' });
  }
};
