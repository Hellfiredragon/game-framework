"use strict";

const path = require("path");
const common = require("../../webpack.common.js");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    ...common,
    externals: [
        nodeExternals({
            modulesDir: "../../node_modules"
        })
    ]
};
