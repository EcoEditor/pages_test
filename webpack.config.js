const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/app.ts"),
    output: {
		// (Lena) I've added this line from here: https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
		path: path.resolve(process.cwd(), 'dist'),
        //name for the js file that is created/compiled in memory
        filename: 'js/particleTest.js'
    },
    resolve: {
        // extensions: [".ts"]
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true,
        contentBase: path.resolve(appDirectory, "docs"), //tells webpack to serve from the public folder, [update] public renamed to docs for github pages sake
        publicPath: '/',
        hot: true
    },
    module: {
        rules: [
            // {test: /\.tsx?$/,
            // loader: "ts-loader"}
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(appDirectory, "docs/index.html")
        }),
        new CleanWebpackPlugin()
    ],
    mode: "development"
};