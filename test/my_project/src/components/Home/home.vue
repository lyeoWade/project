<template>
  <div id="allContent" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
       <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in Datas" :key='item.id'>
          <img :src="item.bannerUrl.substring(2)"/>
        </mt-swipe-item>
      </mt-swipe>
      

      <section id="video" class="">
        <div class="video-head news-head">
          <h2 class="fl">精彩视频</h2>
          <!-- <a class="fr videomore" href="javascript:;"></a> -->
        </div>
        <!-- 视频推荐 -->

        <section id="video">
          
          <div class="videolist">
            
            <ul class="clearfix" id="video-wrap">
               <li v-for="(item , index) in videoListDatas" :key='item.id'>

                <router-link :to="{name:'home.videodetail',query:{id:item.id}}">
                  <div class="mark"></div>
                  <!-- <img :src="item.thumPic"> -->
                  <img v-lazy="item.thumPic"/>
                  <p>{{item.title}}</p>
                </router-link>
  
              <!-- <router-link :to="{name:'news.Newsdetail',query:{id:item.id}}">{{item.title}}</router-link> -->
              </li>
            </ul>
           
          </div>
        </section>

        

      </section>
   </mt-loadmore>

  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'


import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Swipe, SwipeItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';

import { MessageBox } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.use(MintUi);

export default {
  name:'home',
  data(){
    return {
      Datas:'',
      videoListDatas:[],
      allLoaded:false,
      isAutoFill: false,
      wrapperHeight: 0,
      nowpage:1,
    }
  },
  mounted(){

    this.getVideoBanner()
    this.getVideoList()
    this.wrapperHeight =document.documentElement.clientHeight -this.$refs.wrapper.getBoundingClientRect().top;
  },
  updated(){
    this.$bus.$emit('changeTitle','首页')
  },
  methods:{
    getVideoBanner(){

      let datas = qss.stringify({ 
        type: "VideoBanner"
      });


      axios.post('arclist.php', datas)
      .then( str =>{
        console.log(str)
        this.Datas = str.data.result;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getVideoList(){
      let datas = qss.stringify({ 
        type     : "GetVideoList",
        keywords :'',
        nowpage  :this.nowpage,
        PageSize :20
      });
      axios.post('online.php', datas)
      .then( str =>{
        console.log(str)
     //  this.videoListDatas = str.data.result;
       this.videoListDatas = this.videoListDatas.concat(str.data.result);
       if(str.data.result.length<1){
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
      this.getVideoList();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;

}
li {
  display: inline-block;
 
}
a {
  color: #42b983;
}
img{
  width:200px;
}
.mint-swipe{
  height: 160px;
  background: #ccc;
}
.mint-swipe img{
  width: 100%;
}
#allContent{
   overflow: scroll;
}
</style>
