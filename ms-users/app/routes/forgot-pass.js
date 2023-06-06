const express = require('express');
const router = express.Router();
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const { check } = require('express-validator');
//controllers
const ForgotPassController = require('../controllers/ForgotPass.Controller');

router

   .post('/reset-password', [
      check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
      validarCampos
   ], ForgotPassController.resetPassword)

   .patch('/change-password', [validarJWT,
      check('password', 'El password debe tener minimo 6 caractres').isLength({ min: 6 }),
      check('password2', 'El password debe tener minimo 6 caractres').isLength({ min: 6 }),
      validarCampos

   ], ForgotPassController.changePassword)

   .get('/auth/renew', validarJWT, ForgotPassController.revalidarToken)

module.exports = router
