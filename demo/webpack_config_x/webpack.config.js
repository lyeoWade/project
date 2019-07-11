
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:{
		'main':'./main.js'
	},
	output:{
		filename:'./bulid.js'
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html'
		})
	]
	,
	module:{
		loaders:[
			{
				//声明模块 包含很多loader
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			},
			{
				//参数 图片大小 小于limit 生成bese64文件 
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:[
					{
						loader:'url-loader',
						options:{
							limit:800000,
							name:'./[name].[hash].[ext]',
							publicPath:'./static'
						}

					}
				]
			}
		]
	},
	watch:true
}


