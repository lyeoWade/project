<template>
  <div>
    <section id="article">
      <div class="newshead">
        <h1>{{ArcData.title}}</h1>
        <p class="titlebuttom"><span class="fl articletime">{{ArcData.pushtime}}</span><!-- <span class="fr">23</span> --></p>
      </div>
      <div class="articlecontent" v-html="ArcData.article">
       
      </div>

    
    </section>
      
    <Comment :column="column" />

  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'

import Comment from '@/components/comment/comment'



export default {
  name : 'News',
  data(){
    return {
        ArcData:'',
        defaultPic:['../static/111.jpg'],
        column:2,//1评论视屏 2评论新闻
    }
  },
  methods:{
      getArc(){
        let id=this.$route.query.id;
        //alert(id)
        let datas = qss.stringify({ 
          id: id, 
          type: "GetOneArticleInfo"
        });
        axios.post('arclist.php', datas)
        .then( str =>{
          console.log(str)
          this.ArcData = str.data;

        })
        .catch(function (error) {
          console.log(error);
        });
      }
  },
  mounted(){
    
    var _this=this;
    if(!this.$route.query.id){
      this.$router.go(-1);
      //this.$router.go(0);
      setTimeout(function(){
        _this.getArc();
      },1000)
    }else{
      this.getArc();
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
