"use strict";

const path = require("path");
const production = require("./webpack.production.config.js");

module.exports = {
    ...production,
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
