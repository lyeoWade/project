<template>
  <div id="app">
    <el-container class="ccc">
      <el-header> <i class="el-icon-share"></i>极限数据后台管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
 
            <el-col :span="12">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                

                <el-submenu v-for="(item , i) in NavRouteArr" :key="i" :index="item.id">
                  <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="0" v-for="(navItem,ii) in item.routerdata" :key="ii">
                      <router-link :to="navItem.router">
                        {{navItem.title}}
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

               
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>


       <Bread :breads="breads"></Bread>


      </el-container>
    </el-container>

    
  </div>
</template>

<script>

import Bread from './components/Bread'

var NavRouteArr  =[
    {id:'1',title:"文章管理",routerdata:
      [
        {childId:1,title:"发布文章",router:{name:'push_arclist'}},
        {childId:2,title:"文章采集",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'arclist'}},
        {childId:4,title:"评论管理",router:{name:'push_arclist'}}
      ]
    },
    {id:'2',title:"我的收藏",routerdata:
      [
        {childId:1,title:"发布文章",router:{name:'push_arclist'}},
        {childId:2,title:"文章采集",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:4,title:"评论管理",router:{name:'push_arclist'}}
      ]
    },
    {id:'3',title:"我的评论",routerdata:
      [
        {childId:1,title:"发布文章",router:{name:'push_arclist'}},
        {childId:2,title:"文章采集",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:3,title:"文章列表",router:{name:'push_arclist'}},
        {childId:4,title:"评论管理",router:{name:'push_arclist'}}
      ]
    },
    {id:'4',title:"捡西瓜Demo",router:{name:'push_arclist'}}
  ]

export default {
  name: 'App',
  data(){
    return {
      NavRouteArr:NavRouteArr,
      breads:''
    }
  },
  computed:{

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components:{
    Bread
  },
  created(){
    this.$bus.$on('breads',(data)=>{          
        console.log(data);
        this.breads=data;
    })
  }
}
</script>

<style>
html,body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app{
  background-color: #999;
  height: 100%;
}
.ccc{
   background-color: #999;
    height: 100%;
}
.el-header{
    background-color: #1fb5ad;
    color: #fff;
    text-align: left;
    line-height: 60px;
  }
  
  .el-aside {
        background-color: hsl(210, 9%, 36%);
    color: #333;
    /*text-align: center;*/
    height: 100%;
    overflow-y: hidden;
  }
.el-aside ul li{
  width: 200px;
}
.el-aside ul li ul li{
  text-align: center;
}
.el-aside a{
  text-decoration: none;
  color: #fff;
} 
  .el-main {
    background-color: #fff;
    color: #333;
    /*text-align: center;*/
    line-height: 160px;
  }
  .el-container{
    /*height: 100%;*/
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-col-12{
    width: 100%;
  }
</style>
