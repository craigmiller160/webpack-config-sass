const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { postCssLoader } = require('@craigmiller160/postcss-config');
const { isProduction, isDevelopment } = require('./utils/nodeEnvCheck');

const loaders = (isCssModule) => ([
    isProduction() ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: isProduction() ? 3 : 2,
            modules: isCssModule,
            sourceMap: isDevelopment()
        }
    },
    isProduction() ? postCssLoader : null,
    {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: isDevelopment(),
            // It spams warnings about missing sourcemaps in prod build, suppressing them for now
            silent: isProduction()
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: isDevelopment()
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
