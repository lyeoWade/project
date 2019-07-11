

<template>

	<section id="video" class="news">
		<div class="video-head news-head">
			<h2 class="fl">第一手消息</h2>
			<!-- <a class="fr videomore" href="javascript:;"></a> -->
			<div class="newstype" id="list">
				<h3 @click="downList"><img :src="columnIcon" />分类</h3>
			    <div>
			        <span @click="enterType(0)">全部</span>
			        <div>
			            <span @click="enterType(1)">篮球新闻</span>
			            <div>
			                <span @click="enterType(2)">足球新闻</span>
			                <div>
			                    <span @click="enterType(5)">推荐文章</span>
			                    <div>
			                        <span @click="enterType(8)">视频下载</span>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>    
			</div>
		</div>
		
		<div class="newslist" id="content"  ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
			<!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore"> -->
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<ul id="newsWrap">
			 <li v-for="(item , index) in newsList" :key="item.id" class="clearfix">
					<img :src="item.thumb">
					<div class="newinfo">
						<h2>
							<router-link :to="{name:'news.Newsdetail',query:{id:item.id}}">{{item.title}}</router-link>
						</h2>
						<p><span class="time">{{item.datatime | getTime('YYYY-MM-DD')}}</span><span class="read">{{item.page_view}}</span>
							
							<span class="column" @click="enterType(item.newtype)">
								{{item.newtype | handleType}}
							</span>

						</p>
					</div>
				</li> 
			</ul>
			</mt-loadmore>
		</div>
		
	</section>

</template>




<script>

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'
import { Loadmore } from 'mint-ui';

import { MessageBox } from 'mint-ui';

  
//global.axios=axios;
//axios.defaults.headers.post['Content-Type'] = 'application/json'; //设置了这玩意儿后台拿不到值？？？？？？

Vue.component(Loadmore.name, Loadmore);

export default {
  name: 'News',
  data(){
    return {
    	newsList:[],
    	newtype:this.$route.params.newsId,
    	nowpage:1,
    	allLoaded:false,
    	isAutoFill: false,
    	wrapperHeight: 0,
    	isDown:false,
    	columnIcon:['../static/column.png']
    }
  },
  beforeRouterUpdate(to , from , next){

  	console.log(to);

  	next();
  },
  methods:{
  	enterType(type){

  		this.RollUp();
  		this.$router.push({name:'news',params:{newsId:type}});
  		this.newsList=[];
  		this.newtype=type;
  		this.nowpage=1;
  		this.getList();
  	},
  	getList:function(){

  		
  		let datas = qss.stringify({ 
		  newtype: this.newtype, 
		  type: "list",
		  nowpage:this.nowpage,
		  PageSize:20
		});
  		console.log(datas);
		axios.post('arclist.php', datas)
		.then( str =>{
			console.log(str)
		  this.newsList = this.newsList.concat(str.data.result);
		  
		  if(str.data.result.length<1){
		  	console.log(this)
		  	//MessageBox('提示', '没数据了');
		  	this.$toast("没数据了");
		  }

		})
		.catch(function (error) {
		  console.log(error);
		});
  	},
    loadBottom() {
	  // 加载更多数据
	  //this.$refs.loadmore.onTopLoaded();
	  this.nowpage++;
	  this.$refs.loadmore.onBottomLoaded();
	  this.getList();
	},
	downList(){
		

		var oList=document.getElementById("list");
		var aDiv=oList.getElementsByTagName("div");
		var aBtn=document.getElementsByTagName("input");
		var oTimer=null;

		// var c=[1,2,3]
		// c.map(item =>{
		// 	//aDiv[item].style.opacity="1";
		// 	console.log(item)
		// });

		for(var k=0; k<aDiv.length; k++){
			aDiv[k].style.opacity="1";
		}

		if(!this.isDown){
			var i=0;
			clearInterval(oTimer);
			oTimer=setInterval(function(){
				aDiv[i].className="open";
				i++;
				if(i==aDiv.length)
				{
					clearInterval(oTimer);
				}
			},100);	
			this.isDown=true
		}else{
			this.RollUp();
		}
		


	},
	RollUp(){
		var oList=document.getElementById("list");
		var aDiv=oList.getElementsByTagName("div");
		var aBtn=document.getElementsByTagName("input");
		var i=aDiv.length-1;
		var oTimer=null;

		clearInterval(oTimer);
		oTimer=setInterval(function(){
			aDiv[i].className="";
			i--;
			if(i<0)
			{
				clearInterval(oTimer);
				for(var k=0; k<aDiv.length; k++){
					aDiv[k].style.opacity="0";
				}
			}
		},50);
		this.isDown=false;
	}
  },
  mounted(){
 	  this.wrapperHeight =document.documentElement.clientHeight -this.$refs.wrapper.getBoundingClientRect().top;
      this.getList();
  },
  updated(){
  	this.$bus.$emit('changeTitle',"新闻")
  }
};

/*
export default {
	name : 'News',
	data(){
		return {

		}
	}
}*/

</script>


<style scoped>
#content{
   overflow: scroll;
}


.newstype{
	position: absolute;
	right: 10px;
	top: 0;
	width: 80px;
	height: 50px;

}
@-webkit-keyframes open{
	0%
	{
		-webkit-transform:rotateX(-120deg);
		-moz-transform:rotateX(-120deg);
		-o-transform:rotateX(-120deg);
		transform:rotateX(-120deg);

	}	
	40%
	{
		-webkit-transform:rotateX(30deg);
		-moz-transform:rotateX(30deg);
		-o-transform:rotateX(30deg);
		transform:rotateX(30deg);
	}
	60%
	{
		-webkit-transform:rotateX(-20deg);
		-moz-transform:rotateX(-20deg);
		-o-transform:rotateX(-20deg);
		transform:rotateX(-20deg);
	}
	80%
	{
		-webkit-transform:rotateX(10deg);
		-moz-transform:rotateX(10deg);
		-o-transform:rotateX(10deg);
		transform:rotateX(10deg);
	}
	100%
	{
		-webkit-transform:rotateX(0deg);
		-moz-transform:rotateX(0deg);
		-o-transform:rotateX(0deg);
		transform:rotateX(0deg);
	}
}
@-moz-keyframes open{
	0%
	{
		-moz-transform:rotateX(-120deg);
		transform:rotateX(-120deg);

	}	
	40%
	{
		-moz-transform:rotateX(30deg);
		transform:rotateX(30deg);
	}
	60%
	{
		-moz-transform:rotateX(-20deg);
		transform:rotateX(-20deg);
	}
	80%
	{
		-moz-transform:rotateX(10deg);
		transform:rotateX(10deg);
	}
	100%
	{
		-moz-transform:rotateX(0deg);
		transform:rotateX(0deg);
	}
}
@keyframes open{
	0%
	{
		transform:rotateX(-120deg);

	}	
	40%
	{
		transform:rotateX(30deg);
	}
	60%
	{
		transform:rotateX(-20deg);
	}
	80%
	{
		transform:rotateX(10deg);
	}
	100%
	{
		transform:rotateX(0deg);
	}
}
.newstype h3{ 
	height:0.30rem; 
	margin-top: 0.05rem;
	text-align:center; 
	/*font:14px/30px "微软雅黑"; */
	line-height: 0.3rem;
	/*font-size: 0.12rem;*/
	color:#1fb5ad; 
	background: #fff;
	position:relative;
	z-index:2;
}
.newstype h3 img{
	display: inline-block;
	width: 16px;
	vertical-align: middle;
	margin-top: -2px;
	margin-right: 6px;
}
.newstype div{ 
	position:absolute; 
	top:31px;
	left:0;
	-webkit-transform-style:preserve-3d;
	 -webkit-transform-origin:top; 
	 -webkit-transform:rotateX(-120deg); 
	 transition:.5s;
	 opacity: 0;
	}
.newstype>div{ top:45px;}
.newstype .open{
	-webkit-animation:open 2s;
	-webkit-transform:rotateX(0deg);
}
.newstype span{ 
	display:block;
	width:80px;
	text-align: center;

	height:30px; 
	font:14px/30px "微软雅黑"; 
	background:#1fb5ad; 

	color:#fff; 
	transition:.5s; 
	box-shadow:inset 0 0 60px 60px rgba(255,0,0,1);
}
.newstype .open>span{
	box-shadow:inset 0 0 60px 30px rgba(0,0,0,0);
}
.newstype span:hover{ 
	/*background:#FF0;
	text-indent:30px;*/
}
</style>










