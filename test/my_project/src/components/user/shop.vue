<template>
  <div class="comment">
      <noLogin v-bind:isLogins="isLogin"/>
      <div  v-show="Logined">后台没写数据</div>
  </div>
</template>

<script>

import noLogin from '@/components/user/noLogin'


export default {
  name: 'shop',
  data(){
    return {
      isLogin:false,
      Logined:true,
      titles:'体育商城'
    }
  },
  created(){

  },
  mounted(){

    

     if(!localStorage.getItem('userInfo')){
      this.isLogin=true;
      this.Logined=false;
    }
  },
  updated(){
    this.$bus.$emit('changeTitle',"体育商城");
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
</style>
