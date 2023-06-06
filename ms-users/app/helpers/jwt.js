const jwt = require('jsonwebtoken');
const authConfig = require('../../config/admin');

const generarJWT = ( id, nombre) => {

    const payload = { id, nombre };

    return new Promise( (resolve, reject) => {
        
        jwt.sign( payload, authConfig.secret, {
            expiresIn: authConfig.expires
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject( err )
            }else{
                resolve( token )
            }

    })
    });

    
}
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.AUTH_SECRET)
    } catch (e) {
        return null
    }
}
module.exports = {
    generarJWT,
    verifyToken
}