<template>
	<div class="changedata">
		<div class="changedata_content">
			<el-tabs @tab-click="handleClick" value="new">
			    <el-tab-pane label="新的" name="new">
			    	<!--<up-change-file></up-change-file>-->
			    	<div class="new_file clearfix">
			    		<button class="new_file_empty" @click="removeFileList">清空</button>
						<el-upload
						  class="upload-demo"
						  drag
						  action=""
						  :show-file-list="false"
						  :file-list="fileList"
						  :auto-upload="false"
						  :on-change="changeFileList"
						  multiple>
						  <i class="el-icon-upload"></i>
						  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						  <el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
					</div>
			    </el-tab-pane>
			    
			    <el-tab-pane label="以前的" name="previous">
			    	<div class="previous_content">
			    		<el-table ref="multipleTable" :data="tableData3" align="center"  height="313"  style="width: 100%" @selection-change="handleSelectionChange">
						    <el-table-column type="selection" width="78" align="center"></el-table-column>
						    <el-table-column prop="name" label="文件名" width="169" show-overflow-tooltip align="center"></el-table-column>
						    <el-table-column prop="update" label="上传日期" show-overflow-tooltip align="center"> </el-table-column>
						</el-table>
			    	</div>
			    </el-tab-pane>
			</el-tabs>
		  </div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        tableData3: [{
			  update: '2016-05-03',
			  name: '历史业务数据包1',
			}, {
			  update: '2016-05-02',
			  name: '历史业务数据包2',
			}, {
			  update: '2016-05-04',
			  name: '历史业务数据包3',
			}, {
			  update: '2016-05-01',
			  name: '历史业务数据包4',
			}, {
			  update: '2016-05-08',
			  name: '历史业务数据包5',
			}, {
			  update: '2016-05-06',
			  name: '历史业务数据包1',
			}, ],
			multipleSelection: [],
			fileList:[],
	      };
	    },
		mounted(){
		},
		methods: {
			handleClick(tab, event) {
//		        console.log(tab, event);
//		        console.log("tab被选中了")
		    },
		    changeFileList(files,fileList){
		    	//console.log(files)
		    	//console.log(fileList)
//		    	console.log("1")
		    	this.fileList = fileList
		    },
		    removeFileList(file){
		    	//console.log(file)
		    	this.fileList = [];
		    },
		    handleSelectionChange(val) {
				//多选框的选中的值
				//console.log(val)
//				console.log("multipleSelection触发了")
			    this.multipleSelection = val;
			},
		    getParentChangeData(){
		    	//父组件调用的
		    	//console.log(this.multipleSelection)
		    }
		    
		    
		},
		components: {
		},
		computed: {}
	};
</script>

<style scoped lang="scss">
	.changedata{
		width: 538px;
		height: 382px;
		padding: 15px 33px 33px;
		
		.changedata_content{
			.new_file{
				.new_file_empty{
					width: 92px;
					height: 30px;
					margin-left: 104px;
					line-height: 0;
					background: #FFFFFF;
					border-radius:15px;
					border: 1px solid #85c2ba;
					color: $btn-export;
				}
				.new_file_up{
					float: left;
					button{
						width: 92px;
						height: 30px;
						line-height: 0;
						border-color: $btn-export;
						border-radius:15px;
						background: $btn-export;
						margin-right: 10px;
					}
					
					
				}
			}
			.previous_content{
				
			}
			
		}
	}
</style>