const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['styled-components'],
    // homePics: '../j-service/client/src/app.jsx',
    // description: '../m-service/client/index.jsx',
    // reviews: '../v-service/client/app.jsx',
    // moreHomes: '../a-service/client/MoreHomes.jsx',
    // booking: '../m-booking/client/booking.jsx',
    // nav: '../m-nav/client/nav.jsx'
    homePics: 'https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/j-service-app.jsx',
    description: 'https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/m-service-index.jsx',
    reviews: '.https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/v-service-app.jsx',
    moreHomes: 'https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/MoreHomes.jsx',
    booking: 'https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/booking.jsx',
    nav: 'https://s3-us-west-1.amazonaws.com/mashbnb/module-jsx-files/nav.jsx'
  },
  externals: {
    'styled-components': 'styled'
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              'babel-plugin-styled-components',
            ]
          },
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/build'),
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$||\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$||\.html$/,
      threshold: 10240,
      minRatio: 0.7
    })
  ],
};
