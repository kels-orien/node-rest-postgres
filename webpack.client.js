const path = require("path");
const webConfig = require("./webConfig");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: webConfig.environment,

  entry: ["./src/client.js", "./src/assets/scss/style.scss"],

  output: {
    filename: "client_bundle.js",
    path: path.resolve(__dirname, "build/public"),
    publicPath: "/build/public"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: "/node_modules",
        options: {
          presets: [
            "react",
            "stage-0",
            [
              "env",
              {
                target: { browsers: ["last 2 versions"] }
              }
            ]
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].min.css",
              outputPath: "assets/css/"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader",
            options: {
              minimize: true,
              url: true,
              root: webConfig.siteURL
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
