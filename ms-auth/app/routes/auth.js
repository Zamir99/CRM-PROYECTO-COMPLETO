const express = require('express');
const router = express.Router();
const { check } = require('express-validator');



// Controllers
const AuthController = require('../controllers/Auth.Controller');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');


// Login 
router
    .post('/auth/login', [
        check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
        check('password', 'El password es obligatorio').isLength({min: 6}),
        validarCampos
    ], AuthController.loginUsuario)

   .get('/auth/renew',validarJWT,AuthController.revalidarToken)

module.exports = router