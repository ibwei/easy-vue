const { merge } = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'all', // 必须三选一： "initial" | "all"(默认就是all) | "async"
      minSize: 0, // 最小尺寸，默认0
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 1, // 最大异步请求数， 默认1
      maxInitialRequests: 1, // 最大初始化请求书，默认1
      name: 'vendor', // 名称，此选项可接收 function
      cacheGroups: {
        // 这里开始设置缓存的 chunks
        priority: 0, // 缓存组优先级
        //打包重复出现的代码
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'vendor',
        },
        //打包第三方类库
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: Infinity,
        },
      },
    }),
  ],
});
