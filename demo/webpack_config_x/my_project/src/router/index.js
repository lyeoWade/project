import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import News from '@/components/News/news'
import Online from '@/components/Online/online'
import Newsdetail from '@/components/News/Newsdetail'
import Injuries from '@/components/Injuries/injuries'


Vue.use(Router);

export default new Router({
  routes: [
  	{
      path: '/',
      redirect:'/home'
    },
  	{
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/Newsdetail',
      name: 'Newsdetail',
      component: Newsdetail
    },
    {
      path: '/online',
      name: 'online',
      component: Online
    },
    {
      path: '/injuries',
      name: 'injuries',
      component: Injuries
    }
  ]
})
