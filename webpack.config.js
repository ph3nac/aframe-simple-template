const path = require("node:path");
const isDev = process.env.NODE_ENV === "development";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDev ? "development" : "production",
  // dev モードではソースマップをつける
  devtool: isDev ? "source-map" : undefined,
  module: {
    rules: [
      {
        // 拡張子 js のファイル（正規表現）
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        // ローダーの指定
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // dev モードではソースマップを付ける
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        // 画像やフォントファイル
        test: /\.(jpg|ico|png|svg|ttf|otf|eot|woff?2?)$/,
        type: "asset",
      },
    ],
  },
  devServer: {
    static: {
      directory: "./dist",
    },
    // https: true,
  },
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
      scriptLoading: "blocking",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/auto", to: "auto" }],
    }),
  ],
  stats: {
    colors: true,
  },
};
