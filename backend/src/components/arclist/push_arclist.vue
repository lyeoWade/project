<template>
	<div class="content-style">
		<el-form :label-position="labelPosition" label-width="130px" :model="formLabelAlign">
		  <el-form-item label="标题:">
		    <el-input v-model="formLabelAlign.name" placeholder="标题"></el-input>
		  </el-form-item>
		  <el-form-item label="描述\摘要:">
		   

		    <el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="textarea">
			</el-input>
		  </el-form-item>

		  <el-form-item label="是否推荐">
		    <el-checkbox v-model="checked"></el-checkbox>
		  </el-form-item>

		
		  <el-form-item label="BANNER图片">
		    <el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :before-remove="beforeRemove"
			  multiple
			  :limit="1"
			  :on-exceed="handleExceed"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>


		  </el-form-item>

		  
		    <el-form-item label="文章内容">
	          <quill-editor ref="myTextEditor"
	              v-model="ruleForm.content"
	              :options="editorOption"
	              @change="onEditorChange($event)">
	          </quill-editor>  
	        </el-form-item>
		  
			<!-- <quill-editor v-model="content" ref="myTextEditor" :options="editorOption" @change="onEditorChange($event)">
			</quill-editor> -->

		  <el-form-item label="文章分类">
		    <el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value"
			      :change="arcType(value)">
			    </el-option>
			</el-select>
		  </el-form-item>

		  <el-form-item label="关键字:">
		    <el-input v-model="formLabelAlign.name" placeholder="关键字"></el-input>
		  </el-form-item>
			

		<el-form-item>
		    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
		    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
		</el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import Element from 'element-ui'
import editor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import 'quill/dist/quill.bubble.css'
Vue.use(editor)
Vue.use(Element, { size: 'small' })

export default {
	name:'ccc',
	data(){
		return {
			labelPosition: 'right',
			textarea: '',
	        formLabelAlign: {
	          name: '',
	          type: '',
	          
	        },
	        content:'',
	        checked: false,
	        fileList: [],
	        ruleForm:{

	        },
	        bread:[],
	        editorOption:{
	        	theme:'snow',
	        	modules:{
	        		toolbar:[
	        			['bold', 'italic', 'underline', 'strike'],
				          ['blockquote', 'code-block'],
				          [{ 'header': 1 }, { 'header': 2 }],
				          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
				          [{ 'script': 'sub' }, { 'script': 'super' }],
				          [{ 'indent': '-1' }, { 'indent': '+1' }],
				          [{ 'direction': 'rtl' }],
				          [{ 'size': ['small', false, 'large', 'huge'] }],
				          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				          [{ 'color': [] }, { 'background': [] }],
				          [{ 'font': [] }],
				          [{ 'align': [] }],
				          ['clean'],
				          ['link', 'image', 'video']
	        		]
	        	}
	        },
	        options: [{
		          value: '篮球新闻',
		          label: '篮球新闻'
		        }, {
		          value: '足球新闻',
		          label: '足球新闻'
		        }, {
		          value: '神棍区',
		          label: '神棍区'
		        }, {
		          value: '推荐文章',
		          label: '推荐文章'
		        }, {
		          value: '视频下载',
		          label: '视频下载'
		        }],
		    value: ''
		}
	},
	methods:{
		 handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	      handlePreview(file) {
	        console.log(file);
	      },
	      handleExceed(files, fileList) {
	        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	      },
	      beforeRemove(file, fileList) {
	        return this.$confirm(`确定移除 ${ file.name }？`);
	      },

	    onEditorChange({editor, html, text}) {//内容改变事件
	        console.log("---内容改变事件---")
	        this.content = html
	        console.log(html)
	    },
	    arcType(val){
	    	console.log(val)
	    }
	},
	created(){
		this.$bus.$emit('breads',['文章管理','发布文章'])
	}
}

</script>


<style type="text/css">
	.content-style{
		padding: 30px;
	}
</style>