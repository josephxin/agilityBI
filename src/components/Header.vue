<template>
	<div class="header-main clearfix">
		<div class="logoBox fl" @click="goHome">
			<img src="../assets/imgs/logo.png" />
		</div>
		<div class="toggle-env fl" v-if="false">
			<btn class="mini-btn" :item="toggleBtn" @click.native="toggleEnvironment"></btn>
		</div>
		<ul class="headMenu fr">
			<li :class="{'active': $root.headNav==0}">
				<router-link :to="{name: 'index'}">
					<span>首页</span>
					<em>Home</em>
				</router-link>
			</li>
			<li :class="{'active': $root.headNav==1}" @mouseenter="flag_configure=true" @mouseleave="flag_configure=false">
				<a>
					<span class="transition">配置</span>
					<em class="transition">Configure</em>
				</a>
				<transition name="fade-slide">
					<div class="configure-list" v-show="flag_configure">
						<span class="arrow-top"></span>
						<ol class="pull-down-menu">
							<li v-for="(item, index) in configureList" :key="index" @click="$router.push({name: item.url})" :class="{'active': $root.configureActive==index}">{{item.name}}</li>
						</ol>
					</div>
				</transition>
			</li>
			<li :class="{'active': $root.headNav==2}" @mouseenter="flag_my=true" @mouseleave="flag_my=false">
				<a>
					<span class="transition">我的</span>
					<em class="transition">My</em>
				</a>
				<transition name="fade-slide">
					<div class="configure-list" v-show="flag_my">
						<span class="arrow-top"></span>
						<ol class="pull-down-menu">
							<li v-for="(item, index) in myList" :key="index" @click="$router.push({name: item.url})" :class="{'active': $root.myActive==index}">{{item.name}}</li>
						</ol>
					</div>
				</transition>
			</li>
			<li :class="{'active': $root.headNav==3}">
				<router-link :to="{name: 'help'}">
					<span class="transition">帮助</span>
					<em class="transition">Help</em>
				</router-link>
			</li>
			<li @mouseenter="flag_skin=true" @mouseleave="flag_skin=false">
				<a>
					<span class="transition">换肤</span>
					<em class="transition">Skin</em>
				</a>
				<transition name="fade-slide">
					<div class="configure-list" v-show="flag_skin">
						<span class="arrow-top"></span>
						<ol class="pull-down-menu pull-down-menu-skin">
							<li v-for="(item, index) in skinList" :key="index" @click="setTheme(item.pic, index)" :class="[{'active': $root.skinActive==index}, item.pic]">{{item.name}}</li>
						</ol>
					</div>
				</transition>
			</li>
			<li class="margin-right" :class="{'active': $root.headNav==4}">
				<router-link :to="{name: 'community'}">
					<span class="transition">社区</span>
					<em class="transition">Community</em>
				</router-link>
			</li>

			<li class="divider"></li>
			<!--token==''-->
			<li v-if="token==''">
				<a class="login-sign" @click="$root.dialogLoginFormVisible=true">
					<span class="transition">登录</span>
				</a>
			</li>
			<!--这里必须用v-show，否则点击登录对话框的提交按钮后，用户的下拉菜单会显示-->
			<!--token != ''-->
			<li v-show="token != '' " @mouseenter="flag_user=true" @mouseleave="flag_user=false">
				<a>
					<i class="iconfont icon-yonghu transition"></i>
					<span class="transition">{{userName}}</span>
				</a>
				<transition name="fade-slide">
					<div class="configure-list" v-show="flag_user">
						<span class="arrow-top"></span>
						<ol class="pull-down-menu">
							<li v-for="(item, index) in userList" :key="index" @click="item.fn">{{item.name}}</li>
						</ol>
					</div>
				</transition>
			</li>
		</ul>

		<!--登录对话框-->
		<el-dialog :visible.sync="$root.dialogLoginFormVisible" custom-class="BI-login" top="30vh" :modal-append-to-body="false" :show-close="false">
			<div class="login-tit">
				用户登录
			</div>
			<el-form ref="loginUserInfo" :model="loginUserInfo" :rules="loginRules" class="login-form">
				<el-form-item prop="userName">
					<i class="iconfont icon-yonghu icon-p"></i>
					<el-input v-model.trim="loginUserInfo.userName" v-focus placeholder="请输入用户名" class="user-pwd"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<i class="iconfont icon-mima-copy icon-p"></i>
					<el-input v-model.trim="loginUserInfo.pwd" type="password" placeholder="请输入密码" class="user-pwd"></el-input>
				</el-form-item>
				<div class="login-footer">
					<p class="btn btn-confirm" @click="submitLoginForm('loginUserInfo')"></p>
					<p class="btn btn-cancle" @click="resetForm('loginUserInfo')"></p>
				</div>
				<div class="login-immediately">
					<span>没有账号？</span>
					<a @click="dialogSignFormVisible=true; $root.dialogLoginFormVisible=false;">立即注册！</a>
				</div>
			</el-form>
		</el-dialog>

		<!--注册对话框-->
		<el-dialog :visible.sync="dialogSignFormVisible" custom-class="BI-login" top="30vh" :modal-append-to-body="false" :show-close="false">
			<div class="login-tit">
				用户注册
			</div>
			<el-form ref="signUserInfo" :model="signUserInfo" :rules="signRules" class="login-form">
				<el-form-item prop="userName">
					<i class="iconfont icon-yonghu icon-p"></i>
					<el-input v-model.trim="signUserInfo.userName" v-focus placeholder="请输入用户名" class="user-pwd"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<i class="iconfont icon-mima-copy icon-p"></i>
					<el-input type="password" v-model.trim="signUserInfo.pwd" placeholder="请输入密码" class="user-pwd"></el-input>
				</el-form-item>
				<el-form-item prop="rpwd">
					<i class="iconfont icon-mima-copy icon-p"></i>
					<el-input type="password" v-model.trim="signUserInfo.rpwd" placeholder="请再次输入密码" class="user-pwd"></el-input>
				</el-form-item>
				<div class="login-footer">
					<p class="btn btn-confirm" @click="submitSignForm('signUserInfo')"></p>
					<p class="btn btn-cancle" @click="resetForm('signUserInfo')"></p>
				</div>
				<div class="login-immediately">
					<span>已有账号？</span>
					<a @click="$root.dialogLoginFormVisible=true; dialogSignFormVisible=false;">立即登录！</a>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	import { BIMsg } from "@/assets/js/tools.js";
	import btn from '@/components/buttons/btn'
	import { register, check, login } from "@/api/index.js"

	export default {
		name: "headerBar",
		components: {
			btn
		},
		data() {
			var validateName = (rule, value, callback) => {
				//console.log(rule)
				//console.log(value)
				this.checkName(value, callback)
			}
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.signUserInfo.rpwd !== '') {
						this.$refs.signUserInfo.validateField('rpwd');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.signUserInfo.pwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				flag_configure: false,
				flag_my: false,
				flag_skin: false,
				flag_user: false,
				configureList: [{
						name: "数据源连接",
						url: "dataMatching"
					},
					{
						name: "数据结构分析",
						url: "dataStructureAnalysis"
					},
					{
						name: "外键配置",
						url: "foreignKey"
					},
					{
						name: "实体配置",
						url: "entity"
					},
					{
						name: "知识图谱构建",
						url: "relationExtraction"
					},
					{
						name: "热词配置",
						url: "hotWord"
					},
					/*{
						name: "模板配置",
						url: "templateMatching"
					},*/
				],
				skinList: [{
						name: "橘红色",
						pic: "red"
					},
					{
						name: "蓝色",
						pic: "blue"
					},
					{
						name: "绿色",
						pic: "green"
					}
				],
				myList: [{
						name: '我的收藏',
						url: 'collect'
					},
					{
						name: '我的报告',
						url: 'myReport'
					},
					{
						name: '我的搜索',
						url: 'mySeek'
					}
				],
				userList: [{
						name: '切换用户',
						fn: () => {
							this.$root.dialogLoginFormVisible = true
						}
					},
					{
						name: '注销登录',
						fn: () => {
							//this.$store.commit('setToken', false)
							this.$store.commit('delToken', '')
							this.$store.commit('changeUserInfo', {
								userId: 0,
								userName: ''
							})
							this.$router.push({
								name: 'index'
							})
						}
					},
				],
				dialogSignFormVisible: false, //注册对话框
				loginUserInfo: {
					userName: '',
					pwd: '',
				},
				signUserInfo: {
					userName: '',
					pwd: '',
					rpwd: '',
				},
				loginRules: {
					userName: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}],
					pwd: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
				},
				signRules: {
					userName: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					}, {
						validator: validateName,
						trigger: 'blur'
					}],
					pwd: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					rpwd: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
				},
				toggleBtn: {
					name: '切换到测试环境',
				},
			};
		},
		computed: {
			...mapState(["token", "userId", "userName"]),
		},
		watch: {

		},
		methods: {
			//vuex中设置mutations
			...mapMutations(["changeTheme"]),
			goHome() {
				this.$router.push({
					name: "index"
				});
			},
			setTheme(theme, index) {
				// 存取 localStorage 以防页面刷新 丢失主题
				localStorage.setItem("theme", theme);
				this.changeTheme(theme);
				this.$root.skinActive = index;
				localStorage.setItem("skinActive", index);
			},
			windowChangeColor() {
				//不同窗口的状态监听
				let _this = this;
				window.addEventListener("storage", function(e) {
					if(e.key == "theme") {
						_this.changeTheme(e.newValue);
					}
					if(e.key == "skinActive") {
						_this.$root.skinActive = e.newValue;
					}
				});
			},
			// 点击登录按钮
			submitLoginForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//合法，调接口
						login({
							"username": this.loginUserInfo.userName,
							"password": this.loginUserInfo.pwd
						}).then(data => {
							//console.log('登录', data)
							if(data.code == 200) {
								BIMsg({
									message: "登录成功！"
								});
								this.$root.dialogLoginFormVisible = false
								this.$store.commit('setToken', data.data.token)
								this.$store.commit('changeUserInfo', {
									userId: data.data.userId, //接口返回的用户名ID
									//userId: 1, //接口返回的用户名ID
									userName: data.data.userName //接口返回的用户名
								})
								var communityType = data.data.communityType
								if(communityType == null) {
									this.$confirm('您还没有选择社区，是否前往社区页选择社区？', '提示', {
										confirmButtonText: '确定',
										cancelButtonText: '取消',
										type: 'warning',
										customClass: "change_Box",
									}).then(() => {
										//点击确定按钮，跳到社区页
										this.$router.push({
											name: 'community'
										})
									}).catch(() => {
										//点击取消按钮，跳到主页
										this.$router.push({
											name: 'index'
										})
									});
								} else {
									//登录成功后跳回主页面
									this.$router.push({
										name: 'index'
									})
								}
							} else {
								BIMsg({
									message: data.message,
									type: "error"
								})
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						BIMsg({
							message: "请输入用户名或密码",
							type: "info"
						});
					}
				});
			},
			// 点击注册按钮
			submitSignForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						//合法，调接口
						register({
							"username": this.signUserInfo.userName,
							"password": this.signUserInfo.rpwd,
						}).then(data => {
							//console.log(data)
							if(data.code == 200) {
								BIMsg({
									message: "注册成功",
									type: "info"
								});
								this.dialogSignFormVisible = false
								this.$root.dialogLoginFormVisible = true
								this.$refs.signUserInfo.resetFields()
							} else {
								BIMsg({
									message: "出现了一点小问题，请稍等",
									type: "info"
								});
							}
						}).catch(err => {
							console.log(err)
						})
					} else {
						BIMsg({
							message: "用户名或密码输入错误",
							type: "info"
						});
					}
				});
			},
			//检验名字是否重名
			checkName(name, callback) {
				check({
					"username": name
				}).then(data => {
					if(data.code == 200) {
						callback()
					} else {
						callback(new Error('用户名已存在！'))
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击重置按钮
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			// 切换服务器环境
			toggleEnvironment() {
				if(this.toggleBtn.name == '切换到测试环境') {
					window.baseUrlResult = eolinker //潍坊的接口地址
					window.baseUrlSwagger = eolinker //总部的接口地址
					this.toggleBtn.name = '切换到线上环境'
				} else {
					window.baseUrlResult = serverUrlWF //潍坊的接口地址
					window.baseUrlSwagger = serverUrlHQ //总部的接口地址
					this.toggleBtn.name = '切换到测试环境'
				}

				//console.log(this.$router, this.$router.currentRoute.name);
				if(this.$router.currentRoute.name == 'index') { //强制刷新首页的数据
					this.$store.commit('changeRouterAlive', false)
					this.$nextTick(() => {
						this.$store.commit('changeRouterAlive', true)
					})
				} else {
					this.$router.push({
						name: 'index'
					})
				}
			}
		},
		created() {
			this.windowChangeColor();
		},
		mounted() {

		}
	};
</script>
<style lang="scss">
	.user-pwd {
		padding-left: 38px;
		width: 225px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: 700;
		.el-input__inner {
			border: none;
			height: 30px;
			line-height: 30px;
			padding-left: 0;
		}
	}
	
	.theme-blue {
		.user-pwd {
			.el-input__inner {
				color: #1f9eff;
			}
		}
	}
	
	.theme-red {
		.user-pwd {
			.el-input__inner {
				color: #fea188;
			}
		}
	}
	
	.theme-green {
		.user-pwd {
			.el-input__inner {
				color: #afd1a6;
			}
		}
	}
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	.toggle-env {
		margin-top: 13px;
		margin-left: 15px;
	}
	
	.header-main {
		padding: 0 50px;
		height: 50px;
	}
	
	.add_and_no {
		z-index: 100;
		height: 50px;
		line-height: 50px;
		margin-left: 48px;
		button {
			width: 100px;
			height: 32px;
			box-sizing: border-box;
			border-radius: 20px;
			border: 1px solid #dd2911;
			background: #fff3ef;
			color: #ffffff;
		}
		.cancel {
			margin-left: 20px;
		}
	}
	
	.logoBox {
		height: 100%;
		cursor: pointer;
		&:hover {
			opacity: 0.7;
		}
		img {
			height: 28px;
			margin-top: 11px;
		}
	}
	
	.headMenu {
		user-select: none;
		>li {
			z-index: 100;
			position: relative;
			float: left;
			margin-right: 48px;
			height: 50px;
			line-height: 50px;
			&:last-of-type {
				margin-right: 0;
			}
			&.margin-right {
				margin-right: 40px;
			}
			&.divider {
				margin-right: 34px;
				width: 1px;
				height: 18px;
				margin-top: 17px;
				background-color: $header-divider;
			}
			>a {
				padding: 15px 0;
				i {
					margin-right: 4px;
					color: $header-icon;
					font-size: 23px;
					vertical-align: middle;
				}
				span {
					color: $header-text;
					font-size: 16px;
				}
				em {
					padding-left: 4px;
					font-size: 12px;
					color: $header-english;
					font-style: italic;
				}
			}
		}
	}
	
	.configure-list {
		position: absolute;
		top: 42px;
		left: calc(50% - 89px);
		width: 178px;
		box-sizing: border-box;
		border: 1px solid $e1;
		border-radius: 6px;
		padding: 9px;
		background-color: white;
		box-shadow: 0 2px 5px #ccc;
		/*transform: translateY(0);*/
		.arrow-top {
			position: absolute;
			top: -5px;
			left: calc(50% - 4px);
			box-sizing: border-box;
			width: 8px;
			height: 8px;
			border: 1px solid $e1;
			border-right-color: transparent;
			border-bottom-color: transparent;
			background-color: white;
			transform: rotate(45deg);
		}
	}
	
	.pull-down-menu {
		li {
			border: 1px solid transparent;
			border-radius: 2px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			font-size: 14px;
			color: $color30;
			cursor: pointer;
			transition: .3s;
		}
	}
	
	.pull-down-menu-skin {
		li {
			padding-left: 80px;
			height: 46px;
			line-height: 46px;
			text-align: left;
			user-select: none;
			&.red {
				background: url(../assets/imgs/common/skin_red.png) no-repeat 9px;
			}
			&.blue {
				background: url(../assets/imgs/common/skin_blue.png) no-repeat 9px;
			}
			&.green {
				background: url(../assets/imgs/common/skin_green.png) no-repeat 9px;
			}
		}
	}
	
	.theme-blue {
		.pull-down-menu {
			li {
				&:hover,
				&.active {
					background-color: #f0f7ff;
					border: 1px solid #e6ecf5;
				}
			}
		}
		.headMenu {
			>li {
				&:hover,
				&.active {
					a {
						i,
						span,
						em {
							color: $configure-list;
						}
					}
				}
			}
		}
		.add_and_no {
			button {
				border: 1px solid #e6ecf5;
				background: #f0f7ff;
			}
			.add {
				background: url(../assets/imgs/blue/bg_confirm.png) no-repeat;
				background-size: 100% 100%;
			}
			.cancel {
				background: url(../assets/imgs/blue/btn_bg.png) no-repeat;
				background-size: 100% 100%;
				color: #4a6c98;
			}
		}
	}
	
	.theme-green {
		.pull-down-menu {
			li {
				&:hover,
				&.active {
					background-color: #e8f9e7;
					border: 1px solid #e6ecf5;
				}
			}
		}
		.headMenu {
			>li {
				&:hover,
				&.active {
					a {
						i,
						span,
						em {
							color: $configure-list-green;
						}
					}
				}
			}
		}
		.add_and_no {
			button {
				border: 1px solid #e6ecf5;
				background: #f0f7ff;
			}
			.add {
				background: url(../assets/imgs/green/test_green.png) no-repeat;
				background-size: 100% 100%;
			}
			.cancel {
				background: url(../assets/imgs/green/next_green.png) no-repeat;
				background-size: 100% 100%;
				color: #4a6c98;
			}
		}
	}
	
	.theme-red {
		.pull-down-menu {
			li {
				&:hover,
				&.active {
					background-color: #ffefe9;
					border: 1px solid #f5e6e6;
				}
			}
		}
		.headMenu {
			>li {
				&:hover,
				&.active {
					a {
						i,
						span,
						em {
							color: $configure-list-red;
						}
					}
				}
			}
		}
		.add_and_no {
			button {
				color: #eb5233;
			}
		}
	}
	
	// 登录样式
	.theme-blue {
		.login-sign:hover,
		.login-tit,
		.icon-p {
			color: #1f9eff;
		}
		.login-form {
			.user-pwd {
				border-bottom: 1px solid #1f9eff;
			}
		}
		.btn-confirm {
			background: url("../assets/imgs/blue/login_blue_03.png") no-repeat;
		}
		.btn-cancle {
			background: url("../assets/imgs/blue/login_blue_06.png") no-repeat;
		}
		.login-immediately {
			color: $configure-list;
			a {
				color: $configure-list;
			}
		}
	}
	
	.theme-red {
		.login-sign:hover,
		.login-tit,
		.icon-p {
			color: #da442f;
		}
		.login-form {
			.user-pwd {
				border-bottom: 1px solid #fea188;
			}
		}
		.btn-confirm {
			background: url("../assets/imgs/red/login_red_03.png") no-repeat;
		}
		.btn-cancle {
			background: url("../assets/imgs/red/login_red_06.png") no-repeat;
		}
		.login-immediately {
			color: $configure-list-red;
			a {
				color: $configure-list-red;
			}
		}
	}
	
	.theme-green {
		.login-sign:hover,
		.login-tit,
		.icon-p {
			color: rgba(0, 169, 73, 0.75);
		}
		.login-form {
			.user-pwd {
				border-bottom: 1px solid #afd1a6;
			}
		}
		.btn-confirm {
			background: url("../assets/imgs/green/login_green_03.png") no-repeat;
		}
		.btn-cancle {
			background: url("../assets/imgs/green/login_green_06.png") no-repeat;
		}
		.login-immediately {
			color: $configure-list-green;
			a {
				color: $configure-list-green;
			}
		}
	}
	
	.login-sign {
		color: #676767;
		font-size: 16px;
		padding: 15px 0;
	}
	
	.login-tit {
		font-size: 20px;
		font-weight: 700;
		text-align: center;
	}
	
	.login-form {
		width: 263px;
		margin: 0 auto;
		>div {
			position: relative;
			.icon-p {
				width: 38px;
				position: absolute;
				top: 0px;
				font-size: 18px;
			}
		}
	}
	
	.login-footer {
		margin-top: 40px;
		.btn {
			width: 265px;
			height: 32px;
			line-height: 32px;
			font-size: 14px;
			border-radius: 16px;
			font-weight: 700;
			cursor: pointer;
			&:nth-child(2) {
				margin-top: 20px;
			}
			&:hover {
				opacity: 0.8;
			}
		}
	}
	
	.login-immediately {
		margin-top: 10px;
		a {
			text-decoration: underline;
		}
	}
</style>