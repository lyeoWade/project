<template>
  <section id="video" class="online">
    <div class="video-head news-head">
      <h2 class="fl">今日直播</h2>
      <a class="fr videomore" href="javascript:;"></a>
    </div>
    <div class="onlinelist">
      <!-- <div class="onlinetime"><span>2017-09-28</span> <span>星期五</span></div> -->

      <div class="onlone-wrap">
        <p class="dataisno" v-show="noData">暂无数据</p>
        <div class="online-info unonlineed" v-show="OnlineList" v-for="(item , index) in OlineData" :key='item.id'>
          <a href="javascript:;" class="online-link">
            <div class="online-detail">
              <div class="time-status">
                <p>{{item.PlayTime}}</p>

                <!-- {{OlineData}} -->
              </div>
              <div class="match-info">
                <div class="team">
                  <p><img :src="item.hteamLogo" alt="">{{item.hteam}}</p>
                  <p><img :src="item.gteamLogo" alt="">{{item.gteam}}</p>
                </div>
                <div class="period">
                  <i></i>
                  <p>{{item.league}}</p>
                </div>
              </div>
            </div>
          </a>
          <div class="user-handle-wrap">
            <div class="game-socre">
              <div class="no-started">
                <span>前瞻</span>
                <a href="" class="qianzhan">魔术小将或成奇兵屠火箭魔术小将或成奇兵屠火箭</a>
              </div>
              <div class="playing">
                <span>第三节</span>
                <strong>100&nbsp;:&nbsp;98</strong>
              </div>
            </div>
            <div class="fenxi"><i class="fenxi-icon"></i>分析</div>
            <div class="user-play"><i class="play-icon"></i>直播</div>
          </div>
          
        </div>
      </div>

    </div>
    
    <!-- <div class="online-info unonlineed">
          <a href="//m.hupu.com/nba/game/preview_151873.html" class="online-link">
            <div class="online-detail">
              <div class="time-status">
                <p>09:00</p>
              </div>
              <div class="match-info">
                <div class="team">
                  <p><img src="//gdc.hupucdn.com/gdc/nba/team/logo/123x124/ORL.png" alt="">魔术</p>
                  <p><img src="//gdc.hupucdn.com/gdc/nba/team/logo/123x124/HOU.png" alt="">火箭火火箭火箭</p>
                </div>
                <div class="period">
                  <i></i>
                  <p>NBA常规赛</p>
                </div>
              </div>
            </div>
          </a>
          <div class="user-handle-wrap">
            <div class="game-socre">
              <div class="no-started">
                <span>前瞻</span>
                <a href="" class="qianzhan">魔术小将或成奇兵屠火箭魔术小将或成奇兵屠火箭</a>
              </div>
              <div class="playing">
                <span>第三节</span>
                <strong>100&nbsp;:&nbsp;98</strong>
              </div>
            </div>
            <div class="fenxi"><i class="fenxi-icon"></i>分析</div>
            <div class="user-play"><i class="play-icon"></i>直播</div>
          </div>
          
        </div> -->
    <!-- <div class="onlinemore"><a href="javascript:;">敬请期待,下赛季精彩呈现...</a></div> -->
  </section>
  
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'


  export default {
    name:"online",
    data(){
      return {

        noData:false,
        OnlineList:true,
        OlineData:[]
      }
    },
    mounted(){
      let id=this.$route.query.id;
      let datas = qss.stringify({ 
        type: "GetOnlineList"
      });
      axios.post('online.php', datas)
      .then( str =>{
        console.log(str.data.result);
        if(str.data.counts===0){
          this.noData=true;
          this.OnlineList=false;
        }else{
           this.OlineData=str.data.result;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
