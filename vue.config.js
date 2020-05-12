module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        assets: '@/assets',
        components: '@/components',
        network: '@/network',
        utils: '@/utils'
      }
    }
  }
}
