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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              fallback: "file-loader",
              outputPath: "file-loader/"
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            limit: 10 * 1024,
            noquotes: true,
            outputPath: "svgs/"
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
          outputPath: "responsive-images/"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist/*"]),
    new MiniCssExtractPlugin({
      filename: "main.[hash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([{ from: "src/static", to: "static" }]),
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
        removeViewBox: false,
        removeDimensions: true
      },
      plugins: [ImageminMozjpeg({})]
    })
  ]
};
