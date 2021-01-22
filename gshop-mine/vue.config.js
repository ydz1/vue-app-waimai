module.exports = {
  devServer: {
    open: true,
    proxy: { // 在此配置跨域
      // '/api' 这里是你需要配置的接口地址域名后跟的后缀，
      // 即为地址后的/api,例如这个地址http://www.xxxxxx.com/api
      '/api': {
        target: 'http://localhost:4000', // 后端的接口地址
        changeOrigin: true, // 开启跨域
        pathRewrite: {
          '^/api': ''// 这里即为重写后的地址，baseURL里的地址要换成这个
        }
      }
    }
  }
}
