<template>
  <div class="hello">
    <div class="no-login" v-show="isLogin">
      您尚未登录无法查看个人中心内容，<br /><br /><br /><router-link :to="{name:'user.login'}">请登录</router-link>
    </div>
    <div class="" v-show="Logined">后台没写数据</div>
  </div>
</template>

<script>



export default {
  name: 'colection',
  data(){return{
    isLogin:false,
    Logined:true
  }},
  created(){
    
  },
  mounted(){
    console.log(this.isLogin)
    if(!localStorage.getItem('userInfo')){
      this.isLogin=true;
      this.Logined=false;
    }
  },
  updated(){
    this.$bus.$emit('changeTitle',"我的收藏");
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
