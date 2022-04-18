module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/penfu-user/' : '/',
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    disableHostCheck: true
  }
}
