// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './../static/reset.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element, { size: 'small' })

Vue.config.productionTip = false






import EventBus from './EventBus.js';

Vue.prototype.$bus=EventBus;

//console.log(EventBus)


import axios from 'axios'
//console.log(Moment('2017-04-03 13:28:16').format("YYYYMMDD"));
//http://localhost/nba2
axios.defaults.baseURL='http://localhost/project/phpdata/datapage/';





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
