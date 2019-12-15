const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        "kumuluzee-rest.typesafe": "./src/index.ts",
        "kumuluzee-rest.typesafe.min": "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: "KumuluzeeRest",
        libraryTarget: "umd",
        globalObject: "this"
    },
    resolve: {
        extensions: [
            ".ts", ".js"
        ]
    },
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/
        })]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
};
