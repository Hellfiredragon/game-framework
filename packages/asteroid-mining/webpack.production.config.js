"use strict";

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: "inline-source-map",
    entry: {
        "index": path.resolve("src", "index.tsx")
    },
    output: {
        path: path.resolve("dist"),
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        transpileOnly: false,
                    },
                }],
            }, {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'less-loader',
                ],
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: path.resolve("src", "index.html"), to: "."},
            {from: path.resolve("src", "font", "*"), to: "./font", flatten: true},
            {from: path.resolve("src", "images", "*"), to: "./images", flatten: true}
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

