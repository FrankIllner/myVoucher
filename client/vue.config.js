module.exports = {
    devServer: {
      https: true,
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
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/qr': '/'}
      },
      '^/auth': {
        target: 'http://192.168.178.26:4000/user/login/',
        logLevel: "debug",
        ws: true,
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/auth': '/'}
      },

    }
  }
}