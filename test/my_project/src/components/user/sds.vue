

<template>
    <div>
    	<div id="dd">
            <p><span id="txt">0</span>滴水</p>
            <!-- <div id="count">
                <div id="value"></div>
            </div> -->
        </div>

        <div id="wrap">
            <!-- <div class="water-polo">
                <img src="img/4.png" />
            </div> -->

            <!-- <div class="bullet left" style="left:10px;top:10px;"></div> -->
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
import Game from './../../../static/Game.js';
import './../../../static/sds.css'






export default {
    name:"sds",
    mounted(){
        Game.wrap = document.querySelector('#wrap');
        Game.txt = document.querySelector('#txt');

        console.log(Game.wrap)

        Game.start();
    }
}

</script>

<style type="text/css">
	
</style>


