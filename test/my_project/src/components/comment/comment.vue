<template>
  <div>
    <div id="comment">
      <div class="comment-txt">
        <textarea class="txt-box" cols="" v-model="commentTxt" rows="5" placeholder="请输入您的评论..."></textarea>
        <button class="txt-btn" @click="pushComment">评论</button>
      </div>
      <h2>全部回复</h2>
      <div class="comment-wrap">
        
        <p style="text-align: center; line-height: 50px;" v-if="noComment">暂无评论</p>

        <dl class="reply-list" v-else="yesComment" v-for="(item , index) in commentListData" :key="index">
          <dd class="operations-user">
            <div class="user-info">
              <div class="avatar">
                <a href="/my/43020850263023" dace-node="5051_7100">
                  <img :src="defaultPic" alt="">
                </a>
              </div>
              <a href="javascript:;" dace-node="5051_7100" class="user-name">{{item.username}}</a>

              <div class="user-other">
                <!-- <span class="floor">1楼</span> -->
                <span class="times">
                {{item.times}}
                </span>
              </div>
            </div>

            <!-- <div class="operations">
              <a href="javascript:" class="button-bright">
                <span class="zan">
                  赞<em>(525)</em>
                </span>
              </a>
            </div> -->

          </dd>
          <dt class="reply-content">
            <div class="current-content">
              <span class="short-content">
              {{item.content}} 
              </span>
            </div>
          </dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'





export default {
  name : 'News',
  data(){
    return {
        ArcData:'',
        defaultPic:['../static/111.jpg'],
        commentTxt:'',
        //column:2,//1评论视屏 2评论新闻
        commentListData:[],
        noComment:true,
        yesComment:false
    }
  },
  props:['column']
  ,
  methods:{
      //发布评论
      
      pushComment(){

        //判断是否登录
        var UserData=localStorage.getItem('userInfo');
        if(UserData==null){
          this.$toast('请登录之后再操作。');
          return false;
        }
        if(this.commentTxt==''){
          this.$toast('请输入评论');
          return false;
        }
        var UserObj=JSON.parse(UserData);
        var UserId=UserObj.id;//评论人id
        var arcId=this.$route.query.id; //文章id
        //  var column=2; 
        
        var datas= qss.stringify({
          type    :'conmentAdd',
          column :this.column,
          user_id:UserId,
          arc_id :arcId,
          content:this.commentTxt
        });
        console.log(datas)
        axios.post('arclist.php',datas)
        .then( str=>{
          
          if(str.data.code==1){
            this.$toast(str.data.desc);
            this.commentTxt='';
            this.commentListData=[];
            this.getCommentList();
          }else{
            this.$toast(str.data.desc);
          }
        })
        .catch(function(){

        });

       // alert(this.commentTxt)
      }
      ,
      getCommentList(){
        let id=this.$route.query.id;
        //alert(id)
        var arcId=this.$route.query.id; //文章id
        let datas = qss.stringify({ 
          arc_id: arcId, 
          type: "conmentList",
          column:this.column
        });

        axios.post('arclist.php', datas)
        .then( str =>{
          console.log(str)
          if(str.data.counts==0){
            this.commentListData = [];
            this.yesComment=true;
          }else{
            this.noComment=false;
            this.commentListData = this.commentListData.concat(str.data.result);  
          }
          
          
          //this.ArcData = str.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  },
  mounted(){
    
    var _this=this;

    this.getCommentList();
   

   



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
</style>
