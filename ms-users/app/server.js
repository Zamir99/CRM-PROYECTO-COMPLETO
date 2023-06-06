const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const axios = require('axios');
const cors = require('cors');
//require('../app/database/asociations');

// Settings
const PORT = process.env.PORT || 3000;

  app.use(function(req,res,next){
  res.set({
    'Content-Type': 'aplication/json',
    'Access-Control-Allow-Origin':'*'
  });
  next();
});

app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas Usuario 
app.use( '/api',require('../app/routes/Admin'));
// Rutas Login
/* app.use( '/api',require('../app/routes/auth')); */
// Rutas resetPassword y changePassword
app.use( '/api',require('../app/routes/forgot-pass'));

/* app.use( '/api',require('../app/routes/rol.users')); */

app.use( '/api',require('../app/routes/rol'));

// Rutas para autenticación
app.use('/auth', (req, res, next) => {
  // Envía una solicitud GET al microservicio de autenticación
  axios.get('http://localhost:4000/api/auth/login').then(response => {
    // Retorna la respuesta del microservicio de autenticación al cliente
    res.status(response.status).json(response.data);
  }).catch(error => {
    console.error(error);
    // Retorna el error al cliente
    res.status(error.response.status).json(error.response.data);
  });
});

// Arrancamos el servidor 
app.listen(PORT, function () {
  console.log(`Example app listening on http://localhost:${PORT}!`);

//Conexion a la base de datos
  sequelize.authenticate().then(() => {
      console.log('Nos hemos conectado a la base de datos yujuu!!!!!');
  })
  //sequelize.sync({ force: true }).then(() => {
    // console.log("Nos hemos conectado a la base de datos");
  //}).catch(error => {
    //console.log('Se ha producido un error');
  //})
});