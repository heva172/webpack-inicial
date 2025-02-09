
const HtmlWebPackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');// optimiza arxivos .css
const CopyPlugin=require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');// optimiza arxivos .js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//Si hay cambios borra la carpeta /dist y crea los archivos nuevos
module.exports={
    mode:'production',
    optimization:{
        minimizer:[new OptimizeCssAssetsPlugin()]
    },
    output:{
        filename:'main.[contentHash].js'
    }, 
    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                // use:[
                //     'babel-loader'
                // ]No me funciona con esta opción
            },
            {
                test:/\.css$/,
                exclude:/style\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]  
            },
            {
                test:/style\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]  
            },
            {
            test: /\.html$/i,
            loader: 'html-loader',
            options:{
                attributes:false,
                minimize:false,
                },
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                        {
                        loader:'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns:[
                {from:'src/assets', to:'assets/'},
            ],
        }),
            new MinifyPlugin(),
            new CleanWebpackPlugin(),
    ],
};