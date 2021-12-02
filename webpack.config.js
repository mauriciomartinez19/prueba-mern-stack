module.exports = {
    entry: './src/app/index.js',//de aca tomo lo que quiero pasar
    output: {
        path: __dirname + '/src/public',//aca pongo el archivo ya transformado
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }
    ]
    }
};//con este codigo agarro el archivo index.js y lo convierto a bundle.js y lo guardo en la carpeta public
