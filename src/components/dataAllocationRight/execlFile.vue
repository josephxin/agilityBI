<template>
	<div class="upFile">
		<div class="from">
			<p class="upFile_name">
				<label class="upFile_name_common">
					数据连接名称
				</label>
				<input type="text" placeholder="请输入数据连接名称" />
			</p>
			<div class="upFile_exe">
				<label class="upFile_name_common">
					文件地址
				</label>
				<div class="upFile_name_load">
					<el-upload class="upload-demo" drag multiple :show-file-list="true" action="">
						<i class="iconfont icon-microsoftexcel"></i>
						<div class="el-upload__text">拖拽文件到此处上传</div>
						<el-button size="small" type="primary" class="test">添加</el-button>
					</el-upload>
					<div class="unl_record">
						<div class="unl_record_num">已添加<span>0</span>张{{dataMatch.name}}</div>
						<div>
							<button class="next">清空</button>
						</div>
					</div>
				</div>
			</div>
			<div class="upFile_head" v-show="false">
				<label class="upFile_name_common">
					表头设置
				</label>
				<div class="upFile_name_load">
					<el-radio v-model="radio" label="1">把第一行作为表头</el-radio>
					<el-radio v-model="radio" label="2">自动生成表头</el-radio>
					<div class="unl_tab">
						<el-table ref="singleTable" :data="tableData" stripe highlight-current-row max-height="370" align="center" style="font-size: 14px;">
							<el-table-column type="index" align="center" label="序号"></el-table-column>
							<el-table-column property="date" align="center" label="常见名称"></el-table-column>
							<el-table-column property="name" align="center" label="开发进度"> </el-table-column>
							<el-table-column property="address" align="center" label="数据核对"></el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="option">
			<button class="test">测试连接</button>
			<button class="next">保存</button>
		</div>-->
	</div>

</template>

<script>
	import { mapState } from "vuex";
	
	export default {
		components: {},
		props: {
			
		},
		data() {
			return {
				radio: "1",
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
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				currentRow: null
			}
		},
		computed: {
			...mapState(["dataMatch"]),
		},
		watch: {
			dataMatch: {
				handler(newValue, oldValue) {
					//console.log(newValue, newValue.host)
					if(newValue.host) { //存在说明是点击了已有的数据源
						this.emptyForm() //先重置表单在加载数据
						this.ruleForm.myDatabase = newValue.databaseName
						this.ruleForm.myIP = newValue.host
						this.ruleForm.myPort = newValue.port
						this.ruleForm.myUserName = newValue.userName
						this.ruleForm.myPassWold = newValue.passWord
						this.ruleForm.myPicked = newValue.type
						this.$parent.databaseId = newValue.databaseId
					} else {
						this.emptyForm()
						this.ruleForm.myDatabase = ""; //有时他并没有清空
						this.$parent.databaseId = ''
					}
				},
				deep: true
			},
		},
		methods: {
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss">
	.upFile {
		padding-top: 81px;
		padding-left: 16%;
		padding-right: 18%;
		.from {
			.upFile_name {
				display: flex;
				justify-content: space-between;
				height: 26px;
				line-height: 26px;
				margin-bottom: 30px;
				.upFile_name_common {
					width: 99px;
					text-align: left;
					font-size: 14px;
					color: $search-input-color;
				}
				input {
					flex: 1;
					height: 24px;
					font-size: 14px;
					background: #f2f4f5;
					color: rgba(119, 119, 119, 0.75);
					border: 1px solid #e6e6e6;
					border-radius: 2px;
					padding-left: 10px;
				}
			}
			.upFile_exe {
				display: flex;
				justify-content: space-between;
				height: 320px;
				margin-bottom: 0;
				.upFile_name_common {
					width: 99px;
					text-align: left;
					font-size: 14px;
					color: $search-input-color;
				}
				.upFile_name_load {
					flex: 1;
					.upload-demo {
						position: relative;
						.el-upload-dragger {
							margin-top: 0;
						}
						i {
							display: inline-block;
							margin: 82px 0 16px;
							font-size: 67px;
							color: #c0c4cc;
							line-height: 50px;
							font-style: normal;
							font-weight: normal;
						}
						button {
							position: absolute;
							width: 80px;
							height: 32px;
							border-radius: 20px;
							bottom: -46px;
							right: 99px;
						}
					}
					.unl_record {
						display: flex;
						justify-content: space-between;
						margin-top: 14px;
						button {
							width: 80px;
							height: 32px;
							border-radius: 20px;
						}
						.unl_record_num {
							span {
								color: #67b9ff;
								margin: 0 5px;
							}
						}
					}
				}
			}
			.upFile_head {
				display: flex;
				justify-content: space-between;
				margin-top: 21px;
				.upFile_name_common {
					width: 99px;
					text-align: left;
					font-size: 14px;
					color: $search-input-color;
				}
				.upFile_name_load {
					flex: 1;
					.unl_header {
						margin-right: 38px;
						input[type=radio] {
							width: 14px;
							height: 14px;
							vertical-align: middle;
							margin-right: 5px;
							margin-left: 0px;
						}
					}
					.unl_tab {
						margin-top: 20px;
						border: 1px solid #e6e6e6;
						border-bottom: none;
					}
				}
			}
		}
		.option {
			margin-top: 55px;
			padding-bottom: 66px;
			text-align: center;
			button {
				width: 100px;
				height: 32px;
				line-height: 32px;
				font-size: 16px;
				border-radius: 20px;
				text-align: center;
			}
			.test {
				margin-right: 60px;
				color: #FFFFFF;
			}
			.next {
				color: #4a6c98;
			}
		}
	}
	
	.theme-red {
		.el-radio__input.is-checked .el-radio__inner {
			background: red;
			border-color: red;
		}
	}
	
	.theme-blue {
		.test {
			background: url(../../assets/imgs/blue/test_blue.png);
			background-size: 100% 100%;
		}
		.next {
			background: url(../../assets/imgs/blue/next_blue.png);
			background-size: 100% 100%;
		}
	}
	
	.theme-green {}
</style>