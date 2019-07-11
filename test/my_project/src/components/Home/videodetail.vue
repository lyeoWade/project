<template>
<div>
  <section id="article">
  <div class="newshead">
    <h1>{{Datas.title}}</h1>
    <p class="titlebuttom"><span class="fl articletime">{{Datas.updatetime}}</span><span class="fr viewnum">{{Datas.view}}</span></p>
  </div>
  <div class="articlecontent">
    <p class="descriptions"></p>

    <div class="tumb">
      <a :href="Datas.videoUrl">
      <img :src="Datas.thumPic">
      </a>
    </div>
    <!-- <video id="sourceid" width="100%" height="" controls="" autobuffer="" autoplay=""> -->
            
     <!--  <video autoplay="" :src="Datas.videoUrl"></video>
     <div class="wrap-video">
      <iframe width="100%" height="100%" id="v" name="vvv" border='none' src=""></iframe>
    </div> -->
        <p><a :href="Datas.videoUrl" id="othersource">播放不了？去源网站观看</a></p>
  </div>


  </section>
  <Comment :column="column" />
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

Vue.use(MintUi);
import Comment from '@/components/comment/comment'

export default {
  name:'videodetail',
  data(){
    return {
      Datas:'',
      column:1
    }
  },
  mounted(){
    var _this=this;
    if(!this.$route.query.id){
      this.$router.go(-1);
      //this.$router.go(0);
      setTimeout(function(){
        _this.getVideoDetail();
      },1000)
    }else{
      this.getVideoDetail();
      //this.getCommentList();
    }
  },
  methods:{
    getVideoDetail(){
        let id=this.$route.query.id;
        
        let datas = qss.stringify({ 
          id: id, 
          type: "GetOneVideoInfo"
        });
        axios.post('online.php', datas)
        .then( str =>{
          console.log(str)
          this.Datas = str.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  },
  components:{
    Comment
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
