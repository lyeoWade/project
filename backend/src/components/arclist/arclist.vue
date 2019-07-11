
<template>
	<div>
		

    <template>
      <el-table
        :data="tableData"
        style="width: 100%">

        <el-table-column
         type="selection"
         width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
        </el-table-column>
      </el-table>
    </template>


		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="50"
		  @current-change="page">
		</el-pagination>
	</div>
</template>


<script type="text/javascript">
	export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
	    methods:{
	    	page(val){
	    		alert(val)
	    	}
	    }
    }
</script>


<style type="text/css" >
	.has-gutter{
    line-height: 50px;
  }
</style>

