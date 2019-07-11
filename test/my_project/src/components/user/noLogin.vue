

<template>
    <div class="no-login" v-show="isLogins">
      您尚未登录无法查看个人中心内容，<br /><br /><br /><router-link :to="{name:'user.login'}">请登录</router-link>
   	</div>
</template>

<script>



export default {
  name: 'noLogin',
  props:['isLogins'],

}
</script>

<!-- Add "scoped" attribute t	o limit CSS to this component only -->
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
