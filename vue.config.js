const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/theme/mixins/*.less')]
        }
    },
    chainWebpack: config => {
        // 设置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/pages/components'))
    }
}
