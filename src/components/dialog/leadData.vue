<template>
	<div class="lead">
		<div class="lead_content clearfix">
			<div class="lead_content_left">
				<ul>
					<li class="clearfix" v-for="(file,index) in format" :key="index"  :class="{'active': active==index}" @click="ctive(index,file)">
						<img :src="file.img" alt="" :title="file.name"/>
						<span :title="file.name">{{file.name}}</span>
					</li>
				</ul>
			</div>	
			<div class="lead_content_right">
				<div class="lcr-header">
					<span>数据链接名称</span>
					<input type="text" />
				</div>
				<!--<up-load-file :forName="forName"></up-load-file>-->
				
				<div class="lcr_updata">
					<h3>{{forName}}地址</h3>
					<el-upload
					  class="upload-demo"
					  drag
					  multiple
					  action=""
					  :accept="typeAccept"
					  :file-list="fileList"
					  :auto-upload="false"
					  :show-file-list="false"
					  :on-change="changeFileList">
					  <i class="el-icon-upload"></i>
					  <div class="el-upload__text">将文件拖到此处</div>
					  <el-button size="small" type="primary">添加</el-button>
					</el-upload>
					<div class="lcr_hand">
						<div class="lcr_hand_record">已添加<span>{{listLength}}</span>张Excel</div>
						<div class="lcr_hand_btn">
							<button @click="removeFileList">清空</button>
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
	    	format:[{
	    		name:"Excel",
	    		img:require("@/assets/imgs/excel.png"),
	    		accept:".xlc,.xlm,.xls,.xlt,.xlw,.xml,.xltx,.xltm,xlsx"
	    	},{
	    		name:"SQL server",
	    		img:require("@/assets/imgs/mysol.png"),
	    		accept:".mdf,.ndf,.ldf"
	    	},{
	    		name:"MySQL",
	    		img:require("@/assets/imgs/excel.png"),
	    		accept:".frm,.MYD,.MYI"
	    	},{
	    		name:"MapR Haddopp Hive",
	    		img:require("@/assets/imgs/mysol.png"),
	    		accept:".xlc,.xlm,.xls,.xlt,.xlw,.xml"
	    	},{
	    		name:"CSV",
	    		img:require("@/assets/imgs/excel.png"),
	    		accept:".csv"
	    	},{
	    		name:"Db2",
	    		img:require("@/assets/imgs/excel.png"),
	    		accept:".db2"
	    	},{
	    		name:"Oracle",
	    		img:require("@/assets/imgs/mysol.png"),
	    		accept:".dbf,.ora"
	    	},{
	    		name:"Spark SQL",
	    		img:require("@/assets/imgs/excel.png"),
	    		accept:"."
	    	}],
	    	active:0,
	    	forName:"",
	    	fileList:[],
	    	listLength:0,
	    	typeAccept:""
	    }
	  },
	  mounted(){
	  	this.forName = this.format[0].name
	  	this.typeAccept = this.format[0].accept
	  },
	  methods: {
	  	ctive(index,files){
	  		this.active = index;
	  		this.forName = files.name
	  		this.typeAccept = files.accept
	  	},
	  	handleExceed(files,fileList){
	  		//console.log(files)
	  		//console.log(fileList)
	  	},
	  	changeFileList(files,fileList){
	  		//console.log(files)
	  		//console.log(fileList)
	  		this.fileList = fileList
	  		this.listLength = fileList.length;
	  	},
	  	removeFileList(file){
	  		//console.log(file)
	  		//console.log("这是 清空")
	  		this.fileList = [];
	  		this.listLength = this.fileList.length;
	  	},
	  	getParentLeadData() {
	  		//父组件调用的  且在这上传数据
	  		//console.log(this.fileList)
	      }
	  	
	  },
	  components: {
	  },
	  computed: {}
	}
</script>

<style scoped lang="scss">
	.lead{
		height: 371px;
		.lead_content{
			width:550px;
			height: 340px;
			border-bottom: 1px solid $configuration-content-bottom;
			margin:30px 0 0 30px;
			.lead_content_left{
				float: left;
				ul{
					width: 171px;
					height: 320px;
					border:1px solid #c0e4df;
					li{
						width: 157px;
						height: 40px;
						line-height: 40px;
						padding-left:14px;
						cursor:pointer;
						img{
							display: block;
							float: left;
							width: 39px;
							height: 28px;
							margin-top:4px;
							margin-bottom: 6px;
							margin-right: 12px;
						}
						span{
							display: block;
							width: 96px;
							float:left;
							font-size: 12px;
							overflow: hidden;
							white-space:nowrap;
							text-overflow:ellipsis
						}
					}
					li.active{
						background: #e1f2f0;
					}
					li:hover{
						background: #e1f2f0;
					}
				}
			}
			.lead_content_right{
				float: right;
				width: 349px;
				height: 338px;
				.lcr-header{
					span{
						margin-right: 10px;
						font-size: 14px;
						color: #333333;
					}
					input{
						width:247px;
						height: 32px;
						border:1px solid $input-border;
						outline: none;
					}
				}
				.lcr_updata{
					position: relative;
					margin-top: 15px;
					h3{
						height: 33px;
						line-height: 33px;
						font-size: 14px;
						color:#333333;
					}
					.lcr_hand{
						display: flex;
						justify-content: space-between;
						margin-top: 10px;
						.lcr_hand_btn{
							width: 148px;
							text-align:end;
							button{
								width: 69px;
								height: 30px;
								line-height: 0;
								background: #FFFFFF;
								border:1px solid $btn-export;
								border-radius:15px;
								color:$btn-export;
							}
						}
						.lcr_hand_record{
							height: 30px;
							line-height:30px;
							font-size:14px;
							color:#666666;
							span{
								color:$btn-export;
								margin: 0 5px;
							}
						}
					}
				}
			}
		}
	}

</style>