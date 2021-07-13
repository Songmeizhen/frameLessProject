const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将多个css文件合成一个
const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const getEntry = () => {
    let entries = [];
    entries = glob.sync('src/pages/*/index.js');
    let entry = {};
    entries.forEach(file => {
        const fileSplit = file.split('/');
        const pageName = fileSplit[2];
        let pageHtml = fileSplit.slice(0,3).join('/') + 'index.html'
        entry[pageName] = {
            entry: file,
            template: pageHtml,
            filename: `${pageName}.html`
        }
    })
}

const rules = [
    //配置css/scss/sass的loader
    {
        test: /\.(css|scss|sass)/,
        use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader', 'sass-loader'],
        exclude: /node_modules/
    },
    //配置js的loader，使用babel将高级语言转化
    {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
    },
    {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10000,//将小于这个bit数的才进行urlBase64转码
                    outputPath: 'images'
                }
            }
        ]
    }
]
module.exports = {
    entry: getEntry(),
    module: {
        rules: [...rules]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src')
        }
    },
    optimization: {
        minimize: false,
        splitChunks: {
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                common: {
                    chunks: 'initial', //同步和异步加载文件提取到两个模块中
                    minChunks: 2,
                    name: 'common'
                }
            }
        }
    },
    plugins: [
        new copyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/assets'),
                to: 'assets',
                ignore: ['.*']
            }
        ])
    ]
}
