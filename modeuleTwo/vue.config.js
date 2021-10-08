const packageName = require('./package.json').name;


module.exports = {
    devServer: {
        port: 8092,
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