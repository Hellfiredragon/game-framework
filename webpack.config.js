"use strict";

const path = require("path");
const common = require("./webpack.common.js");

module.exports = {
    ...common,
    mode: "development",
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true
    }
};
