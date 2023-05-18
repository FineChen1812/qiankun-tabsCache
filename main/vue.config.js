const packageName = require("./package.json").name;
module.exports = {
  devServer: {
    port: 1800,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  },
  configureWebpack: {
    output: {
      library: "main",
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
}