<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
  </div>
</template>

<script>


import imgSrc from './../../static/timg.jpg'
import axios from './../../../node_modules/axios/dist/axios'
import qss from './../../../node_modules/qs/dist/qs'

axios.defaults.baseURL='http://localhost/nba2/phpdata/datapage/';  
//global.axios=axios;
//axios.defaults.headers.post['Content-Type'] = 'application/json'; //设置了这玩意儿后台拿不到值？？？？？？

var datas = qss.stringify({ 
  id: "116", 
  type: "GetOneArticleInfo",
});

  

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgSrc:imgSrc,
    }
  },
  methods:{
    postMsg(){
      console.log(datas)
      axios.post('arclist.php', datas)
      .then(function (str) {
          console.log(str.data);
      })
      .catch(function (error) {
          console.log(error);
        });

    }
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
