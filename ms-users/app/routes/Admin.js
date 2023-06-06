const express = require('express');
const router = express.Router();
const { check } = require('express-validator');



// Controllers
const AdminController = require('../controllers/Admin.Controller');
const validarCampos = require('../middlewares/validar-campos');


// Crear usuario ( Acudientes y alumnos)
router
    .post('/crearUsuario', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        //check('cae', 'El cae es obligatorio').not().isEmpty(),
        validarCampos
    ], AdminController.crearUsuario)

module.exports = router