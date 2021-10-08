const packageName = require('./package.json').name;

const port = 8091; // dev port

module.exports = {
    devServer: {
        port: 8091,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    // 自定义webpack配置
    configureWebpack: {
        output: {
            library: `${packageName}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${packageName}`,
        },

    },
};