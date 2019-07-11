// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import './../static/com.js'

import Vue from 'vue'
import App from './App'
import router from './router'

import Moment from 'moment'
// import Home from './components/Home/home'
import './../static/home.css'
import './../static/reset.css'
Vue.config.productionTip = false
Vue.use(MintUi);
import axios from 'axios'
//console.log(Moment('2017-04-03 13:28:16').format("YYYYMMDD"));
//http://localhost/nba2
axios.defaults.baseURL='http://localhost/nba2/phpdata/datapage/';
import { Indicator } from 'mint-ui';

//处理时间
Vue.filter('getTime',function(date,formatStr){
	return Moment(date).format(formatStr);
});


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Indicator.open("加载中...");
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
   Indicator.close();
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//类目
//
Vue.filter('handleType',function(num){

	var newtypes='';

	switch(num){
		case '1':
			newtypes="篮球新闻";
		break;
		case '2':
			newtypes="足球新闻";
		break;
		case '3':
			newtypes="实时新闻";
		break;
		case '4':
			newtypes="神棍区";
		break;
		case '5':
			newtypes="推荐文章";
		break;
		case '6':
			newtypes="篮球心水";
		break;
		case '7':
			newtypes="足球心水";
		break;
		case '8':
			newtypes="视频下载";
		break;
		default:
			newtypes='篮球新闻';
	}
	return newtypes;
});


//挂在到Vue实例上  

import EventBus from './EventBus.js';

Vue.prototype.$bus=EventBus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data(){
  	return{
  		isLogin:false
  	}
  },
  router,
  components: { App },
  template: '<App/>',
  methods:{
  	getUserInfo(){
  		console.log(localStorage.getItem('1'))
  	}
  },
  mounted(){
  	this.getUserInfo()
  }
})
