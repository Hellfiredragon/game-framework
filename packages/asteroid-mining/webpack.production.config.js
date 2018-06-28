"use strict";

const path = require("path");
const common = require("../../webpack.common.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    ...common,
    plugins: [
        ...common.plugins,
        new CopyWebpackPlugin([
            {from: path.resolve("src", "index.html"), to: "."}
        ])
    ]
};
