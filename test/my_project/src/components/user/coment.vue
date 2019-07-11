<template>
  <div class="comment">
      <noLogin v-bind:isLogins="isLogin"/>
      <div  v-show="Logined">
        
   
        
        <div id="feedarea">
          <h5><span>我的评论</span></h5>
          <div class="feed-list-area">
          
            <ul class="feed-list-last">
                <li v-for="(item , index) in MyComment" :key="index">
                  <strong>{{item.username}}</strong> 评论了 《  <a href="javascript:;" >{{item.title}}</a>》<span class="comment-time">{{item.times}} </span>
                  <p class="comment_txt">{{item.content}}</p>
                </li>
            </ul>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'

import noLogin from '@/components/user/noLogin'


export default {
  name: 'coment',
  data(){
    return {
      isLogin:false,
      Logined:true,
      MyComment:[]
    }
  },
  created(){
    
  },
  mounted(){
    if(!localStorage.getItem('userInfo')){
      this.isLogin=true;
      this.Logined=false;

    }else{
      this.getMyCommentList();
    }
    
  },
  updated(){
    this.$bus.$emit('changeTitle',"我的评论");
  },
  methods:{
     getMyCommentList(){
        let id=this.$route.query.id;
        
        var UserData=localStorage.getItem('userInfo');
      
        var UserObj=JSON.parse(UserData);
        var UserId=UserObj.id;//评论人id

        var arcId=this.$route.query.id; //文章id
        let datas = qss.stringify({ 
          user_id: UserId, 
          type: "getMyComment"
        });
        console.log(datas)
        axios.post('arclist.php', datas)
        .then( str =>{
          console.log(str)
          if(str.data.counts==0){
            //this.commentListData = [];
            //this.yesComment=true;
          }else{
            //this.noComment=false;
            this.MyComment = this.MyComment.concat(str.data.result);  
          }
          
          
          //this.ArcData = str.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  },
  components:{
    noLogin
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
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img{
  width:200px;
}

.feed-list-area{
  margin-bottom: 60px;
}

#feedarea h5 {
    display: block;
    margin-top: 40px;
    height: 40px;
    z-index: 0;
    position: relative;
}
h5, .h5 {
    font-size:14px;
}

#feedarea h5::before, 
#feedarea h5::after, 
#feedarea h6::before, 
#feedarea h6::after {
    display: block;
    content: '';
    position: absolute;
}
*, *::before, *::after {
    box-sizing: border-box;
}

#feedarea h5:first-child span {
    top: 0;
}
#feedarea h5 span {
    display: inline-block;
    top: 20px;
    left: 50%;
    padding: 10px;
    height: 24px;
    line-height: 4px;
    font-size: 14px;
    border-radius: 2px;
    color: #999;
    background: #f7f7f7;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    overflow: hidden;
    z-index: 1;
    position: absolute;
}
#feedarea h5:first-child::after {
    top: 12px;
}
#feedarea h5::after {
    top: 15px;
    right: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #ececec;
    z-index: 0;
    position: absolute;
}
.feed-list-last{

}
.feed-list-last li{
  margin-bottom: 10px;
  line-height: 22px;
}
.comment_txt{
  font-size: 12px;
  color: #afaaaa;
}
.comment-time{
  font-size: 12px;
}
</style>
