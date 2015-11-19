var path = require('path')
module.exports = {
  entry: [
    // Set up an es6-ish environment
    "babel-polyfill",

    // Application's entrypoint
    "./source/javascripts/entry.es6"],
  output: {
    path: "./source/javascripts",
    filename: "bundle.js",
    sourceMapFilename: "bundle.map"

  },

  module: {
    loaders: [

      // React and ES6
      {
        test: /\.(jsx|js|es6)$/,
        include: path.join(__dirname, "source/javascripts"),
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      }

    ]
  },

  // externals: {
  //   'react': 'React'
  // },
  //
  resolve: {
    extensions: ['', '.jsx', '.json', '.es6', '.js']
  },

  node: {
    fs: "empty"
  }
}

