<template>
  <div id="app">
    <mt-header title="这里是会变换的标题啊啊啊啊啊啊">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>

      <mt-button icon="more" slot="right"></mt-button>


    </mt-header>
    <router-view/>

    <mt-tabbar v-model="selected">
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
        伤病/首发
      </mt-tab-item>
      <mt-tab-item id="uesr">
        <img slot="icon" src="./assets/user.png">
        我的
      </mt-tab-item>
    </mt-tabbar>

    
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      selected:''
    }
  },
  watch:{
    selected:function(newv,oldv){
      console.log(this.$route);

      this.$router.push({name:newv})
    }
  }
}
</script>

<style>
body{
  padding:50px 0 60px 0;
  margin:0;
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

}

.mint-tab-item {
  padding: 10px 0 7px 0;
}
</style>
