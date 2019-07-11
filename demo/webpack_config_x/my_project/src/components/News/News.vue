

<template>

	<section id="video" class="news">
		<div class="video-head news-head">
			<h2 class="fl">第一手消息</h2>
			<!-- <a class="fr videomore" href="javascript:;"></a> -->
			
		</div>
		
		<div class="newslist" id="content"  ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
			<!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore"> -->
			<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<ul class="clearfix" id="newsWrap">
			 <li v-for="(item , index) in newsList" :key="item.id">
					<img :src="item.thumb">
					<div class="newinfo">
						<h2>
							<router-link :to="{name:'Newsdetail',query:{id:item.id}}">{{item.title}}</router-link>
						</h2>
						<p><span class="time">{{item.datatime | getTime('YYYY-MM-DD')}}</span><span class="read">{{item.page_view}}</span><span class="column" @click="enterType(item.newtype)">{{item.newtype | handleType}}</span></p>
					</div>
				</li> 
			</ul>
			</mt-loadmore>
		</div>
		




		<div class="onlinemore"><a href="javascript:;">加载更多...</a></div>
	</section>

</template>




<script>

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'
import { Loadmore } from 'mint-ui';



  
//global.axios=axios;
//axios.defaults.headers.post['Content-Type'] = 'application/json'; //设置了这玩意儿后台拿不到值？？？？？？

Vue.component(Loadmore.name, Loadmore);

export default {
  name: 'News',
  data(){
    return {
    	newsList:[],
    	newtype:'',
    	nowpage:1,
    	allLoaded:false,
    	isAutoFill: false,
    	wrapperHeight: 0,
    }
  },
  methods:{
  	enterType(type){
  		this.newsList=[];
  		this.newtype=type;
  		this.getList();
  	},
  	getList:function(){

  		let datas = qss.stringify({ 
		  newtype: this.newtype, 
		  type: "list",
		  nowpage:this.nowpage,
		  PageSize:15
		});

		axios.post('arclist.php', datas)
		.then( str =>{
			//console.log(str)
		  this.newsList = this.newsList.concat(str.data.result);
		  
		  if(str.data.result.length<1){
		  	alert("没有更多数据了");
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
	}
  },
  mounted(){
 	  this.wrapperHeight =document.documentElement.clientHeight -this.$refs.wrapper.getBoundingClientRect().top;
      this.getList();
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
</style>










