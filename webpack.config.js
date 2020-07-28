const HtmlWebpackPlugin = require('html-webpack-plugin')//引入插件--打包HTML
const path = require('path')//node下的一个模块

module.exports={//为commonJS的模块化
    entry:{
        app:path.resolve(__dirname,'src/index.js')//__dirname 为文件的所在文件夹的绝对路径
    },
    output:{
        filename:'static/js/[name].bundle.js',//[name]为入口文件的标识即app
        path:path.resolve(__dirname,'dist')     
    },
    module:{
        rules:[
            {//处理js
                test: /\.js$/,
               // exclude: /(node_modules|bower_components)/,//排除文件
               include:[path.resolve(__dirname,'src')],
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {//处理css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name:'staic/img/[name].[hash:5].[ext]'//相当于output.path
                    },
                  },
                ],
              },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'index.html',//模板页面
            filename:'index.html'//输出到那个文件下   其中根目录在出口配置的path中设置

        })        
    ],
    devServer:{
        open:true,
        quiet:true,
    },
    devtool:'cheap-moudle-eval-source-map'
}