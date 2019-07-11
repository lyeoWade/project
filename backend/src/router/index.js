import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import push_arclist from '@/components/arclist/push_arclist'
import Arclist from '@/components/arclist/arclist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/push_arclist',
      name: 'push_arclist',
      component: push_arclist
    },
    {
      path: '/arclist',
      name: 'arclist',
      component: Arclist
    }
  ]
})
