/**
 * Created by zql on 2017/7/13.
 */

let webpack = require('webpack');
let path = require('path');
let glob = require('glob');
let SrcDir = path.resolve(process.cwd(),'src');

/**
 *  获得入口文件
 * */

let getEntry = function(){

    let jsDir = path.resolve(SrcDir);
    let jsFile = glob.sync(jsDir+'/*.{js,jsx}');
    let jsMap = {};

    for(let i= 0,len = jsFile.length;i<len;i++){
        let filePath = jsFile[i];
        let fileName = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
        jsMap[fileName] = filePath;
    }
    return jsMap;
};


module.exports = {
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件
                /*include: path.resolve(__dirname, 'src'),//在config中查看 编译时，需要包含哪些文件*/
                query: {
                    presets: ['es2015','latest'] //按照最新的ES6语法规则去转换
                }
            }
        ]
    }
};