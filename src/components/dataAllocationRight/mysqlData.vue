<template>
	<div class="sql_content">
		<div class="from">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="123px" size="mini" class="demo-ruleForm">
				<el-form-item label="主机名或IP地址" prop="myIP">
					<el-input v-model.trim="ruleForm.myIP"></el-input>
				</el-form-item>
				<el-form-item label="端口" prop="myPort">
					<el-input v-model.number="ruleForm.myPort"></el-input>
				</el-form-item>
				<el-form-item label="用户名" prop="myUserName">
					<el-input v-model="ruleForm.myUserName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="myPassWold">
					<el-input v-model="ruleForm.myPassWold"></el-input>
				</el-form-item>
				<transition-group name="custom-classes-transition" mode="in-out" enter-active-class="animated fadeInDown">
					<el-form-item v-if="dataMatch.id == 1 || dataMatch.id == 5" label="数据库名/实例名" prop="myDatabase" key="1">
						<el-input v-model="ruleForm.myDatabase"></el-input>
					</el-form-item>
					<el-form-item v-if="dataMatch.id == 3 || dataMatch.id == 4" label="服务器或SID" prop="myPicked" key="2">
						<el-radio-group v-model="ruleForm.myPicked">
							<el-radio label="SID">SID</el-radio>
							<el-radio label="服务名">服务器名</el-radio>
						</el-radio-group>
						<!--<el-input v-model="ruleForm.mySid" class="call"></el-input>-->
						<el-input v-model="ruleForm.myDatabase" class="call"></el-input>
					</el-form-item>
					<!--<el-form-item label="选择模式" prop="name" v-if="dataMatch.id == 4" key="3">
						<i class="selset_data">
							<span></span>
							<a>选择并连接模式</a>
						</i>
					</el-form-item>-->
				</transition-group>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { BIMsg } from '../../assets/js/tools.js'
	import { postDataAllocationRight, getDataAllocationRight } from "@/api/index.js"

	export default {
		components: {},
		props: {

		},
		data() {
			var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,3}|1\d\d|2[0-4]\d|25[0-5])$/
			let validatePass = (rule, value, callback) => {
				var flag = reg.test(value)
				if(flag) {
					callback()
				} else {
					callback(new Error('请输入正确的主机名或ip地址'));
				}
			};

			return {
				ruleForm: {
					myIP: '', //ip地址
					myPort: "", //端口
					myUserName: "", //用户名
					myPassWold: "", //密码
					myDatabase: "", //数据库名、实例名
					mySid: "", //用在了服务器或sid那个单选宽后面的那个input框中
					mySidAndName: "", //服务器或sid
					myPicked: "", //用在了单选那里
					myPattern: "",
				},
				rules: {
					myIP: [{
						required: true,
						message: '请输入主机名或ip地址',
						trigger: 'blur'
					}, {
						validator: validatePass,
						trigger: 'blur'
					}],
					//myIP: [{required: true,message: '请输入内容',trigger: 'blur'}],
					myPort: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, {
						type: "number",
						message: "端口必须为数字",
						trigger: 'blur'
					}],
					myUserName: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					myPassWold: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					myDatabase: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					mySid: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					mySidAndName: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					myPattern: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					myPicked: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}]
				},
			}
		},
		computed: {
			...mapState(["dataMatch"]),
		},
		watch: {
			dataMatch: {
				handler(newValue, oldValue) {
					//console.log('监听dataMatch', newValue)
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
						this.$parent.databaseId = ''
					}
				},
				deep: true
			},
			ruleForm: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					if(newValue) {
						this.$parent.disState = true //父级保存按钮的使用
					}
				},
				deep: true
			}
		},
		methods: {
			//测试连接
			submitForm(formName) { 
				this.$refs[formName].validate((valid) => {
					if(valid) {
						getDataAllocationRight({
								"databaseName": this.ruleForm.myDatabase, //数据库名称,数据库类型是Oracle时，为服务名或SID
								"host": this.ruleForm.myIP, //数据连接域名或者ip
								"port": this.ruleForm.myPort, //数据库连接端口
								"user": this.ruleForm.myUserName, //用户名
								"passWord": this.ruleForm.myPassWold, //密码,字段传入null时，使用原密码测试连接。
								"sourceName": this.dataMatch.name, //数据库类型，取值范围：MySQL、DB2和Oracle
								"type": this.ruleForm.myPicked, //当类型为Oracle时，此参数有效，取值范围为：（服务名，SID）
								"userId": this.$root.userId, //用来确认权限和购买的服务
							})
							.then(data => {
								//console.log('测试连接返回',data)
								if(data.data.status) {
									this.$parent.disState = false //父级保存按钮的使用
									BIMsg({
										message: '测试连接成功！',
										type: 'info'
									})
								} else {
									BIMsg({
										message: '测试连接失败！',
										type: 'info'
									})
								}
							})
							.catch(err => {
								BIMsg({
									message: err.message,
								})
							});
					} else {
						return false;
					}
				});
			},
			//增加数据源
			submitFormAdd() { 
				postDataAllocationRight({
						"databaseId": this.$parent.databaseId, //数据库id,更新时为必选
						"host": this.ruleForm.myIP,
						"port": this.ruleForm.myPort,
						"userName": this.ruleForm.myUserName,
						"passWord": this.ruleForm.myPassWold,
						"sourceName": this.dataMatch.name, //数据库类型，取值范围：MySQL、DB2和Oracle
						"databaseName": this.ruleForm.myDatabase, //数据库名称
						"type": this.ruleForm.myPicked, //当类型为Oracle时，此参数有效，取值范围为：（服务名，SID）
						"userId": this.$root.userId,
					})
					.then(data => {
						//console.log('增加数据源返回',data)
						if(data.data.status) {
							this.emptyForm()
							this.$parent.$parent.$parent.$refs.allocationList.getDataSource()
							BIMsg({
								message: '数据源添加成功！',
								type: 'info'
							})
						} else {
							BIMsg({
								message: '数据源添加失败！',
								type: 'info'
							})
						}
					})
					.catch(err => {
						BIMsg({
							message: err.message
						})
					})
			},
			emptyForm() { //清空内容，并重置表单
				this.$refs.ruleForm.resetFields(); //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
				this.ruleForm.myDatabase && (this.ruleForm.myDatabase = "") //有时他并没有清空
				this.$parent.disState = true //禁用保存按钮
			},

		},
		created() {

		},
		mounted() {
			this.$on('mysqldata', (formName) => {
				this.submitForm(formName);
			});
			this.$on('mysqldataAdd', () => {
				this.submitFormAdd();
			});

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.sql_content {
		width: 100%;
		.from {
			width: 919px;
			padding-top: 152px;
			margin: auto;
			.el-form-item {}
		}
		.option {
			margin-top: 46px;
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
	
	@-webkit-keyframes fadeInDown {
		from {
			opacity: 0;
			-webkit-transform: translate3d(0, -100%, 0);
			transform: translate3d(0, -100%, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
	
	@keyframes fadeInDown {
		from {
			opacity: 0;
			-webkit-transform: translate3d(0, -100%, 0);
			transform: translate3d(0, -100%, 0);
		}
		to {
			opacity: 1;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
	
	.fadeInDown {
		-webkit-animation-name: fadeInDown;
		animation-name: fadeInDown;
	}
	
	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	.animated.infinite {
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}
	
	.theme-red {}
	
	.theme-blue {}
	
	.theme-green {}
</style>