const path = require('path');

module.exports = {
    entry: [
        path.join(__dirname, 'src', 'index.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bm-oidc.js',
        library: 'bmOIDC',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node-modules/
            }
        ]
    }
};