// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    target: 'node',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    }
}
