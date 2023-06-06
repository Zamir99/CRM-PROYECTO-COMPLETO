module.exports = {
    secret: process.env.SECRET_KEY_RESET_PASSWORD || 'secret-key',
    url: process.env.URL_RESET_PASSWORD || 'http://localhost:4200/change-password',
  };
  