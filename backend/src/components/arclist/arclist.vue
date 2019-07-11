
<template>
	<div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <template slot-scope="scope">
            <el-table-column
             type="selection"
             width="55">
            </el-table-column>
          

          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="datatime"
            label="时间"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            width="">
          </el-table-column>
          <el-table-column
            prop="isrecommend"
            label="是否推荐？"
            width="130">
          </el-table-column>
           <el-table-column
            prop="page_view"
            label="浏览量">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="220">
              <template slot-scope="scope">
                <el-button @click="deleteOneArc(scope.row.id)" type="text" size="small">删除</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="allChooseHandle">
          <el-button  @click="toggleSelection()">删除选中</el-button>
      </div>
      
  		<el-pagination
  		  background
  		  layout="prev, pager, next"
  		  :total="AllNums"
        :page-size="20"
  		  @current-change="page">
  		</el-pagination>

	 </div>
</template>


<script type="text/javascript">

import Vue from 'vue'
import axios from 'axios'
import qss from './../../../node_modules/qs/dist/qs'


	export default {
      data() {
        return {
          tableData: [],
          multipleSelection: [],
          breads:['文章管理','文章列表'],
          AllNums:0,
          nowpage:1
        }
      },
	    methods:{
	    	page(val){
          //分页
	    		//alert(val)
         this.getArcList(val);
	    	},

        toggleSelection(){
          console.log(this.multipleSelection[0].id)
        },
        handleSelectionChange(val) {
          console.log(val)
          this.multipleSelection = val;
        },
        getArcList(nowpage){
          
          let datas = qss.stringify({ 
            username: "", 
            newtype:"",
            nowpage:nowpage,
            PageSize:20,
            title:"",
            type: "list"
          });

          axios.post('arclist.php', datas)
          .then( str =>{
            console.log(str)
            if(str.data.counts==0){
              this.tableData = [];
            }else{
              this.tableData = str.data.result;  
              
              this.tableData.filter(item=>{
                item.isrecommend==1?item.isrecommend='推荐':item.isrecommend="不推荐"
              })

              this.AllNums=parseInt(str.data.Total);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        deleteOneArc(rows){
          console.log(rows)
        }
	    },
      created(){
        console.log(this.breads)
        this.$bus.$emit('breads',this.breads)
      },
      mounted(){
        this.getArcList(this.nowpage);
      }
    }
</script>


<style type="text/css" >
	.has-gutter{
    line-height: 50px;
  }
  .el-table th{
    line-height: 50px;
  }
  .el-pagination{
    text-align: center;
    line-height: 54px;
 
  }

  .allChooseHandle{
    height: 50px;
    line-height: 50px;
    position: relative;

  }
</style>

