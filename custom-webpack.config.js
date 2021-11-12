const CompressionPlugin = require(`compression-webpack-plugin`);
const BrotliPlugin = require(`brotli-webpack-plugin`);
const path = require(`path`);
module.exports = {
    plugins:[
        new BrotliPlugin({
            asset: '[fileWithoutExt].[ext].br',
            test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/
        }),
        new CompressionPlugin({
            test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
            filename: "[path][base].gz",
            algorithm: "brotliCompress",
            threshold: 10240,
            minRatio: 0.8,
        })
    ],
}