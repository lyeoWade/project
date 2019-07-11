<template>
  <div class="denglu">
    <div class="dl-wrap">
      <ul>
        <li><span><img :src="userIcon" /></span><input type="text" value="" v-model="username" placeholder="请输入用户名" class="username"></li>
        <li><span><img :src="passwordIcon" /></span><input type="password" value="" v-model="password"  placeholder="请输入密码" class="password" autocomplete="off"></li>
        <li class="btn-wrap"><input type="button" value="登录" @click="loginFn" class="dl-btn"></li>
        <p style="text-align: center;">name:zimu / pass:111111</p>
      </ul>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'

import { MessageBox } from 'mint-ui';


export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:'',
      userIcon:'../static/user1.png',
      passwordIcon:'../static/password.png',
    }
  },
  methods:{
    loginFn(){
     let id=this.$route.query.id;
      let datas = qss.stringify({ 
        act:'login',
        login_name: this.username,
        login_pass: this.password
      });
      axios.post('login.php', datas)
      .then( str =>{
        console.log(str);
        if(str.data.respondCode=='0'){
          console.log(this)
          this.$toast(str.data.respondMsg); //无效了？？？
          
          localStorage.setItem("userInfo",JSON.stringify(str.data));
          var _this=this;

          this.$bus.$emit('isLoginState',str.data)

          setTimeout(function(){
            _this.$router.go(-1);
          },1000);
          // MessageBox.alert('提示', str.data.respondMsg).then( res=>{
          //   this.$router.go(-1);
          // });
          
        }else{
         this.$toast(str.data.respondMsg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    Login(){
      
    }
  }
  ,
  mounted(){
   // this.loginFn()
  },
  updated(){
    this.$bus.$emit('changeTitle','登录/注册')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
img{
  width:200px;
}

input::input-placeholder{color:  #fff ;} /* 有些资料显示需要写，有些显示不需要，但是在编辑器webstorm中该属性不被识别 */
::-webkit-input-placeholder { /* WebKit browsers */ 
color: #fff; 
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #fff; 
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #fff; 
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #fff; 
} 
</style>
