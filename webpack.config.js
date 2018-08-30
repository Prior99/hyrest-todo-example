const path = require('path');

module.exports = {
    mode: "development",
    entry:  path.join(__dirname, "src", "web"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        alias: {
            "typeorm": "typeorm/browser"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader"
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        port: 4001,
        historyApiFallback: true
    }
};
