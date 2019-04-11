const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['styled-components'],
    homePics: '../j-service/client/src/app.jsx',
    description: '../m-service/client/index.jsx',
    reviews: '../v-service/client/app.jsx',
    moreHomes: '../a-service/client/MoreHomes.jsx'
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
    path: path.resolve(__dirname, 'public'),
    chunkFilename: '[id].[chunkhash].js'
  }
};
