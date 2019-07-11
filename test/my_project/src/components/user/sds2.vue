

<template>
    <div>
    	
        <div style="height:40px; width: 100%; text-align: left; text-indent: 0.1rem; line-height: 40px; font-size: 12px; color: #ccc;">
           <!-- 累计访问次数:<sub>10</sub> -->
        </div>

        <div id="wrap">
            <!-- <div class="water-polo">
                <img src="img/4.png" />
            </div> -->

            <!-- <div class="bullet left" style="left:10px;top:10px;"></div> -->
        </div>
        <div id="dd" class="clearfix">
            <div class="scoreWrap">
                <p>剩余:<span id="txt">0</span>次机会</p>
                <p>分数:<span id="score">0</span></p>
                <p>历史最高分数:<span id="highScore">0</span></p>
            </div>
            <div class="handle">
                <p id="reStart"><a href="javascript:;" @click="reStart">重新开始</a></p>
            </div>
            <!-- <div id="count">
                <div id="value"></div>
            </div> -->
        </div>
        <div class="desc">
            <h3>游戏说明</h3>
            <p>1.点击水果如果是西瓜就会爆炸，其升级顺序为 草莓(1分)->桃子(2分)->苹果(5分)->西瓜(10分)</p>
            <p>2.每过一关会增加5次机会</p>
            <!-- <p>3.使用水果兑换步数</p> -->
        </div>
    </div>
    <!-- 
        使用原生js的模块化，不借助webpack等

        如果我们希望浏览器支持模块化加载，需要在script标签上添加一个属性：
            type属性，值为：module

        原生js的模块化必须在web服务器环境下才能使用

        可以使用自己属性任何方式来搭建webserver，比apache，php，node，nginx

        安装node环境
            npx
     -->
</template>

<script type="text/javascript">
import Vue from 'vue'
import axios from 'axios'
import Game from './../../../static/Game2.js';
import './../../../static/sds.css'






export default {
    name:"sds2",
    data(){
        return {

        }
    },
    created(){
         console.log(123)
        this.$bus.$emit('changeTitle','捡西瓜');
    }
    ,
    mounted(){
        // Game.Wrap=document.getElementById('wrap');
        Game.wrap = document.querySelector('#wrap');
        Game.txt = document.querySelector('#txt');
        Game.scoreHtml = document.querySelector('#score');
        Game.highScore = document.querySelector('#highScore')
        Game.Start()

        // console.log(this.$bus)
        // this.$bus.$emit('changeTitle',"捡西瓜");
        //alert(123)
    },
    updated(){
       
        
        
    },
    methods:{
        reStart(){
            this.$router.go(0);
        }
    }
}

</script>

<style type="text/css">
	.desc{
        margin-bottom: 65px;
        padding: 10px;
    }
    .desc h3{
        text-align: center;
    }
    .desc p{
        line-height: 24px;
        font-size: 14px;
    }
    #dd{
        padding: 0.1rem;
    }

    .scoreWrap{
        float: left;
        width: 50%;
    }
     #dd .scoreWrap p{
        text-align: left;
        font-size: 14px;
        line-height: 24px;
        color: #1fb5ad;
     }

     .handle{
        float: left;
        width: 50%;
     }
     .handle a{
        font-size: 14px;
        color: #1fb5ad;
        background: #fefefe;
     }
</style>


