module.exports = {
    devServer: {
      proxy: {
        '^/api': {
        target: 'http://api.localhost/',
        logLevel: "debug",
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/'}
      },
      '^/qr': {
        target: 'http://qr.localhost/',
        logLevel: "debug",
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/qr': '/'}
      },

    }
  }
}