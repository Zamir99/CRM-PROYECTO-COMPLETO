const jwt = require('jsonwebtoken');
const authConfig = require('../../config/admin');

const generarJWT = (id, nombre, duracion) => {
    const payload = { id, nombre };
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        authConfig.secret,
        {
          expiresIn: duracion,
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  };
  
  module.exports = {
    generarJWT,

  };
  