const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { postCssLoader } = require('@craigmiller160/postcss-config');
const { isProduction } = require('./utils/nodeEnvCheck');

const loaders = (isCssModule) => ([
    isProduction() ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: isProduction() ? 3 : 2,
            modules: isCssModule,
            sourceMap: isProduction()
        }
    },
    isProduction() ? postCssLoader : null,
    'resolve-url-loader',
    {
        loader: 'sass-loader',
        options: {
            sourceMap: isProduction()
        }
    }
].filter((loader) => loader));

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: loaders(false),
                sideEffects: true
            },
            {
                test: /\.module\.scss$/,
                use: loaders(true)
            }
        ]
    }
};