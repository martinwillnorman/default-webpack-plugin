const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

module.exports = {
  entry: {
    main: "./src/scripts/index.js"
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jp(e*)g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8920,
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist/*"]),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([{ from: "src/images", to: "images" }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "80-90",
        strip: true
      },
      gifsicle: {
        interlaced: true
      },
      svgo: {
        removeViewBox: true
      },
      plugins: [ImageminMozjpeg({})]
    })
  ]
};
