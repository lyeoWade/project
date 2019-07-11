<template>
	<el-main>
	  <el-breadcrumb separator-class="el-icon-arrow-right">
	    

	    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
	    <el-breadcrumb-item v-for="(item,i) in breads" :key='i'>{{item}}</el-breadcrumb-item>

	  </el-breadcrumb>
	  <router-view/>
	</el-main>
</template>
<script type="text/javascript">
	
export default {
	name:'Bread',
	data(){
		return {
			breads:''
		}
	},
	mounted(){

		console.log(this.$bus)
		this.$bus.$on('breads',(data)=>{	      	
	      	console.log(data);

	      	this.breads=data;
	    })
	}
}


</script>
<style type="text/css"></style>