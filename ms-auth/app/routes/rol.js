const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.Controller');
const adminrolController = require('../controllers/adminrol.Controller');
const validarJWT = require('../middlewares/validar-jwt');
const verificarRol = require('../middlewares/verificarRol');

// Rutas para usuarios
router.get('/usuarios', usuarioController.listarUsuarios);
router.post('/usuarios', usuarioController.crearUsuario);
router.put('/ActualizarUsuarios', validarJWT, usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', validarJWT, usuarioController.eliminarUsuario);

// Rutas para administradores
router.get('/admin', verificarRol('admin'), adminrolController.obtenerTodos);
router.post('/super-admin', validarJWT, verificarRol('super-admin'), adminrolController.crearAdmin);
router.put('/admin/:id', validarJWT, verificarRol('admin'), adminrolController.actualizarAdmin);
router.delete('/admin/:id', validarJWT, verificarRol('super-admin'), adminrolController.eliminarAdmin);

module.exports = router;
