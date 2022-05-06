const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')


dotenv.config()

module.exports = {
  resolve: {
    extensions: [ '.ts', '.js' ],
    fallback: {
        "url": require.resolve("url/"),
        "os": require.resolve("os-browserify/browser"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
    },
    alias: {
     process: "process/browser"
 },
 },
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: { 
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },
  plugins: [
    new webpack.ProvidePlugin({
        process: 'process/browser',
         Buffer: ["buffer", "Buffer"],
    }),
  ]
};

