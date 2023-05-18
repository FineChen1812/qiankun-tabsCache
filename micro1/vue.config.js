const packageName = require("./package.json").name;
module.exports = {
  devServer: {
    port: 1801,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  },
  configureWebpack: {
    output: {
      library: "micro1",
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
}