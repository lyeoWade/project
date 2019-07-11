
import axios from './node_modules/axios/dist/axios'
import qss from './node_modules/qs/dist/qs'
import imgSrc from './timg.jpg'


var data = qss.stringify({ 
	id: "116", 
	type: "GetOneArticleInfo",
});
var app={
	data(){
		return {
			imgSrc:imgSrc,

		}
	},
	template:`<div>
			11sss
			<img :src="imgSrc" alt="这是图片" />
			<div @click="postMsg">点击我发送信息</div>
	</div>`,
	methods:{
		postMsg(){
			axios.post('../../phpdata/datapage/arclist.php', data)
			.then(function (str) {
			    console.log(str.data);
			})
			.catch(function (error) {
			    console.log(error);
		    });

		}
	}
}


export default app;

