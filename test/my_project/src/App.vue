<template>
  <div id="app" class="Apps">
     <section class="UserInfo">
      

      <div class="User clearfix" v-if="isLogin">
        <div class="pic fl"><a href="javascript:;"><img :src="defaultUserPic" /></a></div>
        <div class="username fl">
          <h2>{{UserObj.nickname}}</h2>
          <p>纵然孑然一身，我心向阳！</p>
        </div>
      </div>
      
      <div class="noLogin" @click="loginUsers" v-else="Logined">
        请登录
      </div>
      
      <ul class="menuList">
        <li v-for="(item , index) in UserRouteArr" :key="item.id" @click="AddClass(index)" :class="num==index?'active':''">
          
          <router-link :to="item.router" > {{item.title}} </router-link>
        </li>
      </ul>

    </section>

  

    <div class="contentBox" @click="">
      <mt-header :title="titles">
        <router-link to="/" slot="left" exact>
          <mt-button icon="back" @click.native="routerBack">返回</mt-button>
        </router-link>
        <mt-button icon="exit" slot="right" @click.native="exitUser" v-if="isLogin">退出</mt-button>
        <mt-button icon="login" slot="right" @click.native="loginUser"  v-else="Logined">登录</mt-button>
         
      </mt-header>

      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      
      
      <!-- <mt-tabbar v-model="selected">
        <mt-tab-item id="home">
          <img slot="icon" src="./assets/home.png">
          首页
        </mt-tab-item>
        <mt-tab-item id="online">
          <img slot="icon" src="./assets/zb.png">
          直播
        </mt-tab-item>
        <mt-tab-item id="news">
          <img slot="icon" src="./assets/wz2.png">
          新闻
        </mt-tab-item>
        <mt-tab-item id="injuries">
          <img slot="icon" src="./assets/sb.png">
          伤病
        </mt-tab-item>
        <mt-tab-item @click.native="toUser">
          <img slot="icon" src="./assets/user.png">
          我的
        </mt-tab-item>
      </mt-tabbar> -->
      
       <div class="bottom-nav">
        <ul class="">
          
          <li v-for="(item,index) in NavData" :key="index">
           
            <router-link :to="item.router">
              
              <div class="tab-icon"><img :src="item.icon"></div>
              <div class="tab-item-label">{{item.title}}</div>
            </router-link>
          </li>
        

          <li @click="toUser">
            <a href="javascript:;">          
              <div class="tab-icon"><img src="./assets/user.png"></div>
              <div class="tab-item-label">我的</div>
            </a>
          </li>
        </ul>  
    </div>

    </div>

  </div>
</template>

<script>
import router from './router'
var UserRouteArr  =[
    {id:2,title:"体育商城",router:{name:'user.shop'}},
    {id:4,title:"我的收藏",router:{name:'user.colection'}},
    {id:5,title:"我的评论",router:{name:'user.coment'}},
    {id:6,title:"捡西瓜Demo",router:{name:'user.sds2'}}
  ]


import homePic from './assets/home.png';
import zbPic from './assets/zb.png';
import newsPic from './assets/wz2.png';
import sbPic from './assets/sb.png';
import UserPic from './assets/user.png';

var NavData  =[
    {id:1,icon:homePic,title:"首页",router:{name:'home'}},
    {id:2,icon:zbPic,title:"直播",router:{name:'online'}},
    {id:3,icon:newsPic,title:"新闻",router:{
        name:'news',params:{newsId:0}
      }
    },
    {id:4,icon:sbPic,title:"伤病",router:{name:'injuries'}}
  ]

export default {
  name: 'App',
  data(){
    return {
      selected      :'',
      defaultUserPic:['../static/111.jpg'],
      num:1,
      UserRouteArr:UserRouteArr,
      titles:"Vue / webpack",
      UserObj:[],
      isLogin:false,
      Logined:true,
      NavData:NavData
    }
  },
  watch:{
    selected:function(newv,oldv){
      console.log(newv);
      this.$router.push({name:newv})
    }
  },
  computed:{

  },
  methods:{
    routerBack(){
        this.$router.go(-1);
    },
    toUser(){
      var oContent=document.querySelector('.contentBox');
      var oMenu=document.querySelector('.UserInfo');

      var wrap=document.querySelector('#app');
      wrap.classList.add('move');
      wrap.style.overflow='hidden';
      oContent.style.overflow='hidden';
    },
    AddClass(ind){
      console.log(this)
      this.num=ind;
      var wrap=document.querySelector('#app');
      var oContent=document.querySelector('.contentBox');
      wrap.classList.remove('move');
      
      setTimeout(function(){
        wrap.style.overflow='';
        oContent.style.overflow='';  
      },1000)
    },
    exitUser(){
       localStorage.removeItem('userInfo');
       this.isLogin=false;
       this.Logined=true;
       this.$router.go(0);
    },
    loginUser(){
      this.$router.push({
        name:'user.login'
      });
    },
    loginUsers(){
      this.loginUser();
     
      var wrap=document.querySelector('#app');
      var oContent=document.querySelector('.contentBox');
      wrap.classList.remove('move');
      
      setTimeout(function(){
        wrap.style.overflow='';
        oContent.style.overflow='';  
      },1000)
    }
  },
  mounted(){
    var UserData=localStorage.getItem('userInfo');  
    if(UserData){
      this.UserObj=JSON.parse(UserData);
      this.isLogin=true;
      this.Logined=false;
    }else{
      this.isLogin=false;
      this.Logined=true;
    }
    //$on 绑定事件
    this.$bus.$on('changeTitle',(data)=>{
      console.log(data)
      this.titles=data;
    })

    this.$bus.$on('isLoginState',(data)=>{
      console.log(data);

      if(data.respondCode==0){
        this.isLogin=true;
        this.Logined=false;
        this.UserObj=data;
      }

    })
  }
}
</script>

<style>
body{
  /*padding:50px 0 60px 0;*/
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
.mint-header{
  top:0;
  height:50px;
  background-color:#1fb5ad;
}
.mint-tabbar{
  height:60px;
}
.mint-header,
.mint-tabbar{
  width:100%;
  position:fixed;
  z-index: 200;

}

.mint-tab-item {
  padding: 10px 0 7px 0;
}
.mint-indicator-wrapper{
  z-index: 99999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #1fb5ad;
}


.mintui-login{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('./assets/user1.png') no-repeat;
  background-size: contain;
}
.mintui-exit{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('./assets/exit.png') no-repeat;
  background-size: contain;
}

.noLogin{
  text-align: center;
  color: #fff;
  line-height: 60px;
}
</style>
