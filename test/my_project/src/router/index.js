import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/home'
import News from '@/components/News/news'
import Online from '@/components/Online/online'
import Newsdetail from '@/components/News/Newsdetail'
import Injuries from '@/components/Injuries/injuries'
import Star from '@/components/user/star'
import Colection from '@/components/user/colection'
import Shop from '@/components/user/shop'
import Coment from '@/components/user/coment'
import Login from '@/components/user/login'
import Videodetail from '@/components/Home/videodetail'
import Sds from '@/components/user/sds'
import Sds2 from '@/components/user/sds2'
Vue.use(Router);

export default new Router({
  linkActiveClass:'link-active',
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
      path: '/news/:newsId',
      name: 'news',
      component: News
    },
    {
      path: '/news/:newsId/Newsdetail',
      name: 'news.Newsdetail',
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
    },
    {
      path: '/user/star',
      name: 'user.star',
      component: Star
    },
    {
      path: '/user/colection',
      name: 'user.colection',
      component: Colection
    },
    {
      path: '/user/shop',
      name: 'user.shop',
      component: Shop
    },
    {
      path: '/user/sds',
      name: 'user.sds',
      component: Sds
    },
    {
      path: '/user/sds2',
      name: 'user.sds2',
      component: Sds2
    },
    {
      path: '/user/coment',
      name: 'user.coment',
      component: Coment
    },
    {
      path: '/user/login',
      name: 'user.login',
      component: Login
    },
    {
      path: '/home/videodetail',
      name: 'home.videodetail',
      component: Videodetail
    }
  ]
})
