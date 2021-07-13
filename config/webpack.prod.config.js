const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将多个css混成一个
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css文件
const commonWebpackConfig = require('./webpack.common.conf');

const productWebpackConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: './js/[name].[hash].js',
        publicPath: './'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })

    ]
};
module.exports = merge(commonWebpackConfig, productWebpackConfig);

