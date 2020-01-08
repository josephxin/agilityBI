<template>
	
	<div class="content">
		 <div class="manual">	
		 	<div class="manual_pop clearfix">
		 		<div class="manual_pop_not">
		 			<p>未配对的字段<em>({{noFields.length}})</em></p>
		 			<ul>
		 				<li v-for="(item,index) in noFields" :class="{active:active==index}" :key="index" @click="ctiv(index,item)">
		 					<i class="iconfont icon-right-1" v-show="active==index"></i>
		 					{{item.name}}
		 				</li>
		 			</ul>
		 		</div>
		 		<div class="manual_pop_list">
		 			<div class="mpl_title">
		 				技术数据列表
		 			</div>
		 			<div class="mpl_select clearfix">
		 				<!--<select name="按字段">
		 					<option :value="item.id" v-for="(item,i) in condition" :key="i" >{{item.name}}</option>
		 				</select>-->
		 				<el-select v-model="id" placeholder="请选择" width="128">
						    <el-option
						      v-for="item in options"
						      :key="item.id"
						      :label="item.label"
						      :value="item.id">
						    </el-option>
						</el-select>
		 				<div class="mpl_find">
		 					<input type="text" />
		 					<button>搜索</button>
		 				</div>
		 			</div>
		 			<div class="mpl_table">
						<el-table ref="multipleTable" :data="tableData"  height="200"  style="width: 100%" @selection-change="handleSelectionChange">
						    <el-table-column type="selection" width="64" align="center"></el-table-column>
						    <el-table-column prop="name" label="字段名"  width="88" show-overflow-tooltip align="center"></el-table-column>
						    <el-table-column prop="data" label="数据" width="126" show-overflow-tooltip align="center"></el-table-column>
						    <el-table-column prop="address" label="说明" show-overflow-tooltip align="center"> </el-table-column>
						</el-table>
						<div class="mpl_btn">
						    <el-button @click="pair">配对</el-button>
						</div>
		 			</div>
		 		</div>
		 	</div>
		 </div>
	</div>	
</template>

<script>
	export default {
	  data() {
	    return {
			tableData: [{
			  data: '2016-05-03',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-02',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-04',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-01',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-08',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-06',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  data: '2016-05-07',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}],
			noFields:[{
				name:"姓名"
			},{
				name:"体重"
			},{
				name:"身高"
			}],
			condition:[{
				name:"字段",
				id:1
			},{
				name:"说明",
				id:2
			},{
				name:"数据",
				id:3
			}],
			options: [{
	          id: '1',
	          label: '黄金糕'
	        }, {
	          id: '2',
	          label: '双皮奶'
	        }, {
	          id: '3',
	          label: '蚵仔煎'
	        }, {
	          id: '4',
	          label: '龙须面'
	        }, {
	          id: '5',
	          label: '北京烤鸭'
	        }],
	        id:"",
			active:-1,
			multipleSelection: [],
			dialogFormVisible: false,
		}
	  },
	  mounted(){
	  	
	  },
	  methods: {
	    handleSelectionChange(val) {
	        this.multipleSelection = val;
	        //console.log(val)
	        //console.log("选择")
	    },
	    ctiv(index,item){
	    	this.active = index
	    	//在这调用接口  传入需要的参数  比如  我选中身高了 id 传上去  调取数据下来
	    	if(item.name == "身高"){
		    	this.tableData = [{
					  data: '2016-03-03',
					  name: '身高',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	},{
					  data: '2016-05-03',
					  name: '身高',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	},{
					  data: '2016-05-03',
					  name: '身高',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	}]
	    	}else if(item.name == "姓名"){
	    		this.tableData = [{
					  data: '2016-03-03',
					  name: '姓名',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	},{
					  data: '2016-05-03',
					  name: '姓名',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	},{
					  data: '2016-05-03',
					  name: '姓名',
					  address: '上海市普陀区金沙江路 1518 弄'
		    	}]
	    	}else if(item.name == "体重"){
	    		this.tableData =[]
	    	}else{
	    		this.tableData =[]
	    	}
	    },
	    pair(){
	    	
	    }
	  },
	  components: {},
	  computed: {}
	}
	
</script>

<style scoped lang="scss"> 
.content{
	.manual{
		width: 539px;
		height: 378px;
		padding:33px;
		.manual_pop{
			height: 100%;
			border-bottom:1px solid #d4d7df;
			.manual_pop_not{
				width: 134px;
				height: 356px;
				float:left;
				text-align: center;
				border: 1px solid #c0e4df;
				p{
					height: 51px;
					line-height: 51px;
					text-align: center;
					background: #efefef;
					border-bottom: 1px solid #c0e4df;
					font-size: 14px;
					color:#333333;
					font-weight: 600;
					em{
						color:#ff8a00;
						font-size: 12px;
					}
				}
				ul{
					>li{
						position: relative;
						height: 35px;
						line-height: 35px;
						text-align: center;
						background: #FFF;
						border-bottom: 1px solid #e3eee8;
						font-size: 14px;
						color:#333333;
						cursor:pointer;
						user-select:none;
					}
					li.active{
						background: #f6f6f6;
					}
					/*li:first-child{
						background: #f6f6f6;
					}*/
					i{
						position: absolute;
						top:2px;
						left: 25px;
						color:#82b5f3
					}
				}
			}
			.manual_pop_list{
				float: right;
				width:386px;
				height: 357px;
				border-top:1px solid #d4d7df;
				.mpl_title{
					height: 56px;
					line-height: 56px;
					color: #008675;
					font-size: 16px;
					text-align: center;
					font-weight: 600;
				}
				.mpl_select{
					select{
						float: left;
						width: 128px;
						height: 32px;
						border:1px solid $input-border;
						outline: none;
					}
					.mpl_find{
						float: right;
						display: flex;
						input{
							width: 178px;
							height: 30px;
							border:1px solid $input-border;
							outline: none;
						}
						button{
							width:69px;
							height: 32px;
							background: $btn-export;
							color: #FFFFFF;
							font-size: 14px;
							border: none;
							outline: none;
						}
					}
				}
				.mpl_table{
					margin-top: 16px;
					.mpl_btn{
						margin-top: 20px;
						text-align: center;
						button{
							width:82px;
							height: 30px;
							border-radius: 15px;
							background: $btn-export;
							color: #FFFFFF;
							line-height: 0;
							outline: none;
						}
					}
				}
			}
		}
	}
	
}
</style>