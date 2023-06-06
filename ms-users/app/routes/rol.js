const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.Controller');
const adminrolController = require('../controllers/adminrol.Controller');
const validarJWT = require('../middlewares/validar-jwt');
const obtenerRolUsuario = require('../middlewares/obtenerRolUsuario');
const verificarRol = require('../middlewares/verificarRol');

// Rutas para usuarios
router.get('/usuario-listar', validarJWT, obtenerRolUsuario(['usuario']), verificarRol(['usuario']), usuarioController.listarUsuarios);
router.put('/usuario-actualizar/:id', validarJWT, obtenerRolUsuario(['usuario', 'premium']), verificarRol(['usuario', 'premium']), usuarioController.actualizarUsuario);
router.post('/newUsuario', validarJWT, obtenerRolUsuario(['premium']), verificarRol(['premium']), usuarioController.crearUsuario);
router.delete('/eliminarusuario/:id', validarJWT, obtenerRolUsuario(['usuario']), verificarRol(['usuario']), usuarioController.eliminarUsuario);



// Rutas para administradores
router.get('/admin-listar', validarJWT, obtenerRolUsuario(['admin']), verificarRol(['admin']), adminrolController.obtenerTodos);
router.post('/crearAdmin', validarJWT, obtenerRolUsuario(['super-admin']), verificarRol(['super-admin']), adminrolController.crearAdmin);
router.put('/actualizar-rol/:id', validarJWT, obtenerRolUsuario(['admin']), verificarRol(['admin']), adminrolController.actualizarAdmin);
router.delete('/eliminar-admin/:id', validarJWT, obtenerRolUsuario(['super-admin', 'admin']), verificarRol(['super-admin', 'admin']), adminrolController.eliminarAdmin);

module.exports = router;
