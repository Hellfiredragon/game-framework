const glob = require("glob");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = {};
glob.sync("./src/**/*.specs.tsx").forEach(x => {
    entries["../test-target" + x.substr(0, x.length - 4).substr(5)] = x;
});
entries["index"] = "./src/index.tsx";

module.exports = {
    entry: entries,
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                use: ["babel-loader", "ts-loader"]
            }, {
                test: /\.less$/,
                include: path.resolve(__dirname, "less"),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    externals: [],
    plugins: [
        new CopyWebpackPlugin([
            {from: "src/index.html"},
            {from: "node_modules/font-awesome/css/font-awesome.min.css", to: "css"},
            {from: "node_modules/font-awesome/fonts/*", to: "fonts", flatten: true}
        ]),
        new ExtractTextPlugin("css/index.css")
    ]
};
