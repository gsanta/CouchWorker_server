let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
let { CheckerPlugin } = require('awesome-typescript-loader');
 
module.exports = function createWebpackConfig() {
    return {
        entry: {
            app: ['./src/client/couchWorker.tsx']
        },
        output: {
            path: path.resolve(__dirname + '/../', 'dist/client'),
            filename: 'js/[name].js',
            libraryTarget: 'var',
            library: 'couchWorker'
        },
         module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    use: "source-map-loader"
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: "css-loader"
                            }, 
                            {
                                loader: "sass-loader"
                            }
                        ]
                    })
                },   
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [ 'css-loader' ]
                    })
                },
                {
                    test:   /\.(ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                    loader: 'url-loader',
                    options:  {
                        limit: 10000
                    }
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        plugins: [
            new ExtractTextPlugin('css/app.css')
        ]
    };
}