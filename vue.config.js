module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
  lintOnSave: false, //关闭语法检查

  //打包配置文件
  assetsDir: 'static',
  parallel: false,
  publicPath: './',

  //开启代理服务器
  devServer: {
    proxy: {
      'userGetImageCode': {
        target: 'http://124.222.100.205:8080/getImageCode',
        pathRewrite: { '^/userGetImageCode': '' },
        ws: true,
        changeOrigin: true
      },
      '/userImageCode': {
        target: 'http://124.222.100.205:8080/imageCode',
        pathRewrite: { '^/userImageCode': '' },
        ws: true,
        changeOrigin: true
      },
      'userEmailCode': {
        target: 'http://124.222.100.205:8080/sendEmailCode',
        pathRewrite: { '^/userEmailCode': '' },
        ws: true,
        changeOrigin: true
      },
      '/userRegister': {
        target: 'http://124.222.100.205:8080/Register',
        pathRewrite: { '^/userRegister': '' },
        ws: true,
        changeOrigin: true
      },
      '/userLogin': {
        target: 'http://124.222.100.205:8080/Login',
        pathRewrite: { '^/userLogin': '' },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
