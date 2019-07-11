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
console.log(Moment('2017-04-03 13:28:16').format("YYYYMMDD"));

axios.defaults.baseURL='http://localhost/nba2/phpdata/datapage/';

//处理时间
Vue.filter('getTime',function(date,formatStr){
	return Moment(date).format(formatStr);
});

//处理空图片

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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
