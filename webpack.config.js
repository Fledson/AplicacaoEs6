module.exports = {
    //qual o arquivo principapl
    entry: ['@babel/polyfill', './src/main.js'],
    //pra qual arquivo sera enviado o code convertido
    output: {
        // pasta do diretorio
        path: __dirname + '/public',
        //nome do arquivo
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname + '/public'
    },
    module: {
        rules: [{
            //expressão regular
            test: /\.js$/,
            //excluir a pasta
            exclude: /node_modules/,
            //
            use: {
                loader: 'babel-loader',
            }
        }],
    }
};