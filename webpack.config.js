module.exports = {
    entry: ['./client/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    mode: 'development',
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}