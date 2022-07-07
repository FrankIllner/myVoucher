const fs = require('fs');
module.exports = {
    devServer: {
      https: {
        key: fs.readFileSync('./cert/localhost+4-key.pem'),
        cert: fs.readFileSync('./cert/localhost+4.pem'),
      },
      proxy: {
        '^/api': {
        target: 'http://api.localhost/',
        logLevel: "debug",
        ws: true,
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/'}
      },
      '^/qr': {
        target: 'http://qr.localhost/',
        logLevel: "debug",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/qr': '/'}
      },
      '^/mail': {
        target: 'http://mail.localhost/',
        logLevel: "debug",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/mail': '/'}
      }
    }
  }
}