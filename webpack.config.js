const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",

  entry: ["./public/index.ts"],

  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "[name].js"
  },

  resolve: {
    extensions: [".ts"]
  },

  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
};
