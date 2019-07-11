<template>
  <div>
    <section id="video" class="">
    <!-- 视频推荐 -->
    <div class="sb-info">
      <h1>NBA实时伤停更新</h1>
      <span>伤停消息均来自国内外可靠的体育媒体、NBA记者以及球队官方，力求快速准确，但也难免偶尔官方出现错误或者教练临时调整，望各位见谅。</span>
      <p>最近一次更新时间：<time class="times">{{pushTime}}</time></p>
    </div>
    <div class="sb-team all-team">
      <h2>火箭队<span>返回<b></b></span></h2>
      <table>
        <thead>
          <tr>
            <th class="wp30">球员</th>
            <th class="wp20">状态</th>
            <th class="wp50">原因</th>
          </tr>
        </thead>
        <tbody id="NBAinj">
            <tr v-for="(item , index) in injData">
              <td class="wp30"><span class="sb-name">{{item.player}}</span><br><span class="sb-teamname">{{item.teamName}}</span></td>
              <td class="wp20"><span class="sb-reason">{{item.reason}}</span></td>
              <td class="sb-detail">{{item.timetable}}</td>
            </tr>
        </tbody>

       <!--  <tbody id="one-NBAinj" style="display: none;">
          <tr>
            <td class="wp30"><span class="sb-name">丹尼尔-汉密尔顿</span><br><span class="sb-teamname">亚特兰大老鹰</span></td>
            <td class="wp20"><span class="sb-reason">预计出场</span></td>
            <td class="sb-detail">7月26日，丹尼尔-汉密尔顿一年合同加盟老鹰！</td>
          </tr>
          <tr>
            <td class="wp30"><span class="sb-name">麦克-穆斯卡拉</span><br><span class="sb-teamname">亚特兰大老鹰</span></td>
            <td class="wp20"><span class="sb-reason">缺席</span></td>
            <td class="sb-detail">7月26日，丹尼尔-汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰！汉密尔顿一年合同加盟老鹰</td>
          </tr>
        </tbody> -->
      </table>
    </div>
  </section>

  <div style="height: 0.6rem; width: 100%; background: #fff;"></div>
  <!-- 底部菜单 -->
  <div class="team-search" style="display: none;" v-show="isShow" ref="che">
    <p>西部</p>
    <div>
      <ul>
        <li class="Race-area"><span>太平洋</span></li>
        <li><a href="javascript:;" teamid="30">勇士</a></li>
        <li><a href="javascript:;" teamid="29">快船</a></li>
        <li><a href="javascript:;" teamid="28">湖人</a></li>
        <li><a href="javascript:;" teamid="40">国王</a></li>
        <li><a href="javascript:;" teamid="37">太阳</a></li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Race-area"><span>西南</span></li>
        <li><a href="javascript:;" teamid="31">火箭</a></li>
        <li><a href="javascript:;" teamid="41">鹈鹕</a></li>
        <li><a href="javascript:;" teamid="27">马刺</a></li>
        <li><a href="javascript:;" teamid="32">独行侠</a></li>
        <li><a href="javascript:;" teamid="35">灰熊</a></li>
      </ul>
    </div>
    
    <div>
      <ul>
        <li class="Race-area"><span>西北</span></li>
        <li><a href="javascript:;" teamid="34">开拓者</a></li>
        <li><a href="javascript:;" teamid="33">雷霆</a></li>
        <li><a href="javascript:;" teamid="36">爵士</a></li>
        <li><a href="javascript:;" teamid="39">森林狼</a></li>
        <li><a href="javascript:;" teamid="38">掘金</a></li>
      </ul>
    </div>
    <p>东部</p>
    <div>
      <ul>
        <li class="Race-area"><span>大西洋</span></li>
        <li><a href="javascript:;" teamid="23">猛龙</a></li>
        <li><a href="javascript:;" teamid="15">凯尔特人</a></li>
        <li><a href="javascript:;" teamid="21">76人</a></li>
        <li><a href="javascript:;" teamid="17">尼克斯</a></li>
        <li><a href="javascript:;" teamid="16">篮网</a></li>
      </ul> 
    </div>
    <div>
      <ul>
        <li class="Race-area"><span>东南</span></li>
        <li><a href="javascript:;" teamid="12">热火</a></li>
        <li><a href="javascript:;" teamid="26">奇才</a></li>
        <li><a href="javascript:;" teamid="18">黄蜂</a></li>
        <li><a href="javascript:;" teamid="24">魔术</a></li>
        <li><a href="javascript:;" teamid="19">老鹰</a></li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="Race-area"><span>中部</span></li>
        <li><a href="javascript:;" teamid="13">骑士</a></li>
        <li><a href="javascript:;" teamid="25">步行者</a></li>
        <li><a href="javascript:;" teamid="22">雄鹿</a></li>
        <li><a href="javascript:;" teamid="14">活塞</a></li>
        <li><a href="javascript:;" teamid="20">公牛</a></li>
      </ul>
    </div>
    
  </div>
  <div class="sb-team-list">
    <a href="javascript:;" @click="InjShow" class="listBtn"></a>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'

export default {
  name : 'News',
  data(){
    return {
        injData:'',
        teamID:'',
        pushTime:'',
        isShow:false
    }
  },
  mounted(){
    var a=document.querySelectorAll('.team-search')[0].getElementsByTagName('a')
    var _this=this;
    for(var i=0; i<a.length; i++){
      a[i].onclick=function(){

        var teamid=this.getAttribute('teamid');
        _this.getIngList(teamid);
        _this.isShow=false;
      }
    }

    this.getIngList(this.teamID);

    
  },
  methods:{
    InjShow(){
      this.isShow=!this.isShow;
    },
    getIngList(teamID){
      let id=this.$route.query.id;
      let datas = qss.stringify({ 
        teamID: teamID, 
        type: "GetInjuriesList"
      });
      axios.post('nbainj.php', datas)
      .then( str =>{
        console.log(str)
        this.injData = str.data.result;
        this.pushTime= str.data.newTime;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  updated(){
    this.$bus.$emit('changeTitle',"NBA实时伤停")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
