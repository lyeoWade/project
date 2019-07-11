

<template>

  <section id="video" class="news">
    <div class="video-head news-head">
      <h2 class="fl">第一手消息</h2>
      <!-- <a class="fr videomore" href="javascript:;"></a> -->
      
    </div>
    
    <div class="newslist" id="content" ref="wrapper" >
      <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore"> -->
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
      <ul class="clearfix" id="newsWrap">
       <li v-for="(item , index) in newsList" :key="item.id">
          <img :src="item.thumb">
          
          <div class="newinfo">
            <h2>{{item.title}}</h2>
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



axios.defaults.baseURL='http://localhost/nba2/phpdata/datapage/';  
//global.axios=axios;
//axios.defaults.headers.post['Content-Type'] = 'application/json'; //设置了这玩意儿后台拿不到值？？？？？？

Vue.component(Loadmore.name, Loadmore);

export default {
  name: 'News',
  data(){
    return {
      newsList:[],
      newtype:'',
      allLoaded:false
    }
  },
  methods:{
    enterType(type){
      this.newtype=type;
      this.getList();
    },
    getList:function(){

      let datas = qss.stringify({ 
      newtype: this.newtype, 
      type: "list",
      nowpage:1,
      PageSize:15
    });

    axios.post('arclist.php', datas)
    .then( str =>{
      console.log(str)
      this.newsList=(str.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
    },
    loadBottom() {
    // 加载更多数据
    //this.$refs.loadmore.onTopLoaded();


    this.$refs.loadmore.onBottomLoaded();
    console.log(this.$refs)
  }
  },
  mounted(){
   //console.log(datas)
   //console.log(this)
   var _this=this;   //这个this怎么回事 箭头函数保持this指向

      /*axios.post('arclist.php', datas)
      .then( str =>{
          this.newsList=(str.data.result);
      })
      .catch(function (error) {
          console.log(error);
      });*/

      //console.log(this.$refs.wrapper.offsetHeight)
      //alert(document.documentElement.clientHeight );
      // console.log(document.getElementById('content').offsetHeight)
      //console.log(this.$refs.wrapper.getBoundingClientRect().top)

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

<!-- 

<template>
  <div class="tmpl">
    <nav-bar title="商品列表"></nav-bar>
    <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <ul class="mui-table-view mui-grid-view">
          <li v-for="(item,index) in datas" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
            <a>
              <img class="mui-media-object" v-lazy="item.img">
              <div class="mui-media-body" v-text="item.title"></div>
            </a>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodslist",
  data() {
    return {
      datas: [],
      //可以进行上拉
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 0
    };
  },
  created() {
    this.loadFrist();
  },
  mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    //   下拉刷新
    loadTop() {
      this.loadFrist();
    },
    // 上拉加载
    loadBottom() {
      this.loadMore();
    },
    // 下来刷新加载
    loadFrist() {
      this.$axios
        .get("goodslist1.json")
        .then(response => {
          this.courrentPage = 0;
          this.allLoaded = false; // 可以进行上拉
          this.datas = response.data.message;
          this.$refs.loadmore.onTopLoaded();
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    },
    // 加载更多
    loadMore() {
      this.$axios
        .get("goodslist.json")
        .then(response => {
          // concat数组的追加
          this.datas = this.datas.concat(response.data.message);
          if (this.courrentPage > 2) {
            this.allLoaded = true; // 若数据已全部获取完毕
          }
          this.courrentPage++;
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(error => {
          console.log(error);
          alert("网络错误，不能访问");
        });
    }
  }
};
</script>

<style scoped>
.main-body {
  /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
  overflow: scroll;
}
</style> -->