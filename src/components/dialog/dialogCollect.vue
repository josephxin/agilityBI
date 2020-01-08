<template>
	<el-dialog :title="dialogTitle" :visible.sync="$root.dialogCollect" class="dialogCollect">
		<div class="el-dialog-content">
			<!--@submit.native.prevent 当表单内只有一个input时按回车会提交表单-->
			<el-form ref="collectForm" :model="collectForm" @submit.native.prevent label-width="59px" label-position="left" class="collect-form">
				<el-form-item label="名称">
					<!--<p>{{reportName}}</p>-->
					<el-input v-model="collectForm.name" placeholder="请输入名称" class="collect-name fl"></el-input>
				</el-form-item>
				<el-form-item label="文件夹">
					<div class="collect-folder">
						<el-collapse v-model="activeNames" ref="collectFolder">
							<el-collapse-item v-for="(item, index) in collectList" :key="index" :name="index+1">
								<template slot="title">
									<p :title="item.name">
										<i class="iconfont icon-shoucang1"></i>
										<span>{{item.name}}</span>
									</p>
								</template>
								<!--新增-->
								<div class="item" v-if="visibleNewFolder">
									<i class="iconfont icon-wenjianjia fl"></i>
									<el-input v-model="newFolderName" ref="newFolderName" class="new-folder__input fl" @blur="createNewFolder($event)" @keyup.enter.native="createNewFolder($event)"></el-input>
								</div>
								<!--遍历-->
								<transition-group name="slide" tag="div">
									<div class="item transition" :class="{'active': folderActive==index}" :title="obj.name" v-for="(obj, index) in list" :key="obj.id" @click="selectFolder(index, obj)" @contextmenu.prevent="appearFolderMenu($event, index, obj)">
										<i class="iconfont icon-wenjianjia fl"></i>
										<span class="fl" v-if="obj.toggle">{{obj.name}}</span>
										<el-input v-model="changeFolderName" v-if="!obj.toggle" ref="changeFolderName" class="new-folder__input fl" @blur="changeFolder($event, obj)" @keyup.enter.native="changeFolder($event, obj)"></el-input>
									</div>
								</transition-group>
							</el-collapse-item>
						</el-collapse>
						<div class="create-collect-folder" @click="appearNewFolder">
							<i class="iconfont icon-xinjianwenjianjia"></i>
							<span>新建文件夹</span>
						</div>
						<div class="popover" ref="popover" tabindex="-1" v-show="visiblePopover" @blur="visiblePopover = false">
							<p class="transition" @click="modifyFolder">修改</p>
							<p class="transition" @click="deleteFolder">删除</p>
						</div>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer clearfix">
			<button class="fr dialog-confirm" type="button" @click="collectConfirmFn">确 定</button>
		</div>
	</el-dialog>
</template>

<script>
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'

	export default {
		components: {},
		props: {
			dialogTitle: {
				type: String
			},
			newFolderId: {
				type: Number
			},
			flagDelete: {
				type: Boolean
			},
			flagUpdate: {
				type: Boolean
			},
			list: {
				type: Array
			},
		},
		data() {
			return {
				folderActive: -1, //所选中的目录下标
				folderId: 0, //所选中的目录id
				folderName: '', //所选中的目录名
				reportContent: [], //保存时发送的图表数组
				collectForm: { //表单
					name: '',
				},
				activeNames: [1],
				collectList: [{
					name: '本地收藏夹',
				}],
				visibleNewFolder: false,
				visiblePopover: false, //文件夹右键菜单显示隐藏
				newFolderName: '新建文件夹',
				changeFolderName: '',
				preventConflict: true, //解决失去焦点和回车事件的冲突
			}
		},
		computed: {
			...mapState(['reportId', 'reportName', 'currFolderId', 'chartArr', 'echartsData']),
		},
		watch: {
			reportName: {
				handler(val, oldval) {
					//console.log("监听reportName", val)
					this.collectForm.name = val
				}
			},
			list: {
				handler(val, oldval) {
					//console.log("监听目录list", val)
					if(this.list.length > 0) {
						this.folderActive = 0
						this.folderId = this.list[this.folderActive].id
						this.folderName = this.list[this.folderActive].name
					}
				}
			},
			newFolderId: {
				handler(val, oldval) {
					//console.log("新增目录时，监听接口返回的目录id", val)
					this.list.unshift({
						name: this.newFolderName,
						id: val,
						toggle: 'true',
						hasfile: 0
					})
					//console.log(this.list);
					//需要加定时器，否则获取不到dom元素
					setTimeout(() => {
						this.$refs.collectFolder.$el.scrollTop = 0;
					})
				}
			},
			flagDelete: {
				handler(val, oldval) {
					//console.log("删除目录的监听", val)
					this.list.splice(this.folderActive, 1)
					BIMsg({
						type: 'success',
						message: "删除成功!"
					})
				}
			},
			flagUpdate: {
				handler(val, oldval) {
					//console.log("修改目录的监听", val)
					this.list[this.folderActive].name = this.changeFolderName
					BIMsg({
						type: 'success',
						message: "修改成功!"
					})
				}
			},
		},
		methods: {
			// 点击文件夹
			selectFolder(index, obj) {
				//console.log(index, obj);
				this.folderActive = index
				this.folderId = obj.id
				this.folderName = obj.name
			},
			// 显示文件夹的右键菜单
			appearFolderMenu(e, index, obj) {
				//console.log(e, index, obj);
				this.folderActive = index
				this.folderId = obj.id
				this.folderName = obj.name
				this.changeFolderName = obj.name
				this.visiblePopover = true
				this.$refs.popover.style.left = e.x + 'px'
				this.$refs.popover.style.top = e.y + 'px'
				setTimeout(() => {
					this.$refs.popover.focus()
				})
			},
			// 点击修改按钮
			modifyFolder() {
				this.list[this.folderActive].toggle = ''
				setTimeout(() => {
					//console.log(this.$refs.changeFolderName);
					this.$refs.changeFolderName[0].select()
				})
			},
			// 点击删除按钮
			deleteFolder() {
				// 如果文件夹内有文件，需要给个提示，是否要删除文件夹
				//console.log(this.list[this.folderActive].hasfile);
				this.visiblePopover = false
				if(this.list[this.folderActive].hasfile == 1) {
					this.$confirm('此文件夹包含 文件，确定要删除此文件夹吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// 调接口，删除文件夹
						this.$emit('delete-event', this.folderId)
					}).catch(() => {
						BIMsg({
							message: "已取消删除"
						})
					});
				} else {
					// 调接口，删除文件夹
					this.$emit('delete-event', this.folderId)
				}
			},
			// 出现新的文件夹input框
			appearNewFolder() {
				this.visibleNewFolder = true
				this.newFolderName = '新建文件夹'
				//需要加定时器，否则获取不到dom元素
				setTimeout(() => {
					//console.log(this.$refs.newFolderName, this.$refs.newFolderName[0]);
					this.$refs.newFolderName[0].select()
					this.$refs.collectFolder.$el.scrollTop = 0;
					//console.log(this.$refs.collectFolder, this.$refs.collectFolder.$el, this.$refs.collectFolder.$el.scrollHeight, this.$refs.collectFolder.$el.scrollTop);
				})
			},
			// 创建新的文件夹
			createNewFolder(e) {
				//console.log(e, e.type);
				if(this.preventConflict) {
					if(e.type == 'keyup') {
						this.preventConflict = false
						setTimeout(() => {
							this.preventConflict = true
						})
					}
					if(this.newFolderName == '') {
						this.newFolderName = '新建文件夹'
					}
					// this.visibleNewFolder必须写在这里
					this.visibleNewFolder = false
					//触发父组件事件，调接口，把文件名传给后台
					this.$emit('add-event', this.newFolderName)
				}
			},
			// 修改文件夹
			changeFolder(e, obj) {
				//console.log(e, e.type, obj);
				if(this.preventConflict) {
					if(e.type == 'keyup') {
						this.preventConflict = false
						setTimeout(() => {
							this.preventConflict = true
						})
					}
					// 如果文件夹名为空或者名字没有改变，则不修改，不调接口，还使用之前的名字
					if(this.changeFolderName != '' && this.changeFolderName != obj.name) {
						//调接口，把修改后的文件名传给后台
						this.$emit('update-event', {
							id: obj.id,
							name: this.changeFolderName,
						})
					}
					obj.toggle = 'true'
				}
			},
			// 点击对话框中的确定按钮
			collectConfirmFn() {
				if(this.folderId == 0) {
					BIMsg({
						type: 'warning',
						message: '请选择一个文件夹!'
					});
					return
				}
				this.$root.dialogCollect = false
				//处理图表数据
				this.reportContent.length = 0
				this.chartArr.forEach((item, index) => {
					this.reportContent.push(this.echartsData[item])
				})
				//console.log('图表数据', this.echartsData,this.chartArr)
				//console.log('保存时的图表数据', this.reportContent)
				//生成当前图片并且转成base64
				var dataDom = document.querySelector('#main-content')
				this.$h2c(dataDom).then(c => {
					let reportUrl = c.toDataURL("image/png");
					//console.log(reportUrl)
					if(this.dialogTitle == '添加收藏') {
						this.$emit('save-report', {
							"folderid": this.folderId,
							"foldername": this.folderName,
							"reportName": this.collectForm.name,
							"reportContent": JSON.stringify(this.reportContent),
							"reportUrl": reportUrl,
						})
					} else if(this.dialogTitle == '保存') {
						//所选中的目录id和报告所属的目录id是否相等
						if(this.folderId == this.currFolderId) {
							//相等，调修改接口
							this.$emit('update-report', {
								"id": this.reportId,
								"reportName": this.collectForm.name,
								"reportContent": JSON.stringify(this.reportContent),
								"reportUrl": reportUrl,
							})
						} else {
							//不相等，调新增接口
							this.$emit('save-report', {
								"folderid": this.folderId,
								"foldername": this.folderName,
								"reportName": this.collectForm.name,
								"reportContent": JSON.stringify(this.reportContent),
								"reportUrl": reportUrl,
							})
						}
					}
				}).catch((err) => {
					console.log(err)
				})
			},
		},
		created() {
			//console.log('created')
		},
		mounted() {
			//console.log(this.collectForm)
			this.collectForm.name = this.reportName
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	// 对话框-添加收藏
	.dialogCollect {
		.el-dialog {
			width: 445px;
			padding-bottom: 30px;
			.el-dialog__body {
				padding: 35px 37px 21px;
			}
			.el-dialog__footer {
				padding: 0 37px;
			}
		}
	}
	
	// 添加收藏-表单
	.collect-form {
		.el-collapse {
			height: 211px;
			overflow-y: auto;
		}
		.el-form-item__label {
			line-height: 26px;
		}
		.el-form-item__content {
			line-height: 26px;
		}
		.collect-name {
			>.el-input__inner {
				height: 26px;
				line-height: 24px;
				background-color: #f2f4f5;
			}
		}
		.collect-folder {
			position: relative;
			box-sizing: border-box;
			width: 312px;
			height: 241px;
			border: 1px solid $e6;
			border-radius: 2px;
			.el-collapse-item__header,
			.el-collapse-item__content {
				color: #333!important;
			}
			.el-collapse-item__header {
				box-sizing: border-box;
				height: 26px;
				line-height: 24px;
				border-bottom: 1px solid $e6;
				background: none;
				background-color: #f2f4f5 !important;
				padding: 0 10px;
				>p {
					>i {
						margin-right: 6px;
						color: $color-yellow;
					}
				}
			}
			.el-collapse-item__arrow {
				line-height: 24px;
			}
			.el-collapse-item__content {
				.item {
					height: 26px;
					line-height: 26px;
					padding-left: 30px;
					cursor: pointer;
					>i {
						margin-right: 8px;
						color: $color-yellow;
					}
					>span{
						white-space: nowrap;
				    width: 85%;
				    overflow: hidden;
					}
					.new-folder__input {
						width: auto;
						>input {
							box-sizing: border-box;
							display: block;
							height: 26px;
						}
					}
				}
			}
			.create-collect-folder {
				box-sizing: border-box;
				height: 28px;
				border-top: 1px solid $e6;
				padding: 0 10px;
				cursor: pointer;
				>i {
					margin-right: 6px;
					color: $color-yellow;
				}
			}
		}
	}
	
	// 文件夹右键菜单
	.popover {
		position: fixed;
		top: 0;
		left: 0;
		width: 150px;
		padding: 2px 0;
		background-color: white;
		outline: none;
		border: 1px solid $e6;
		box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
		>p {
			padding: 0 20px;
			cursor: pointer;
		}
	}
	
	.theme-blue {
		.el-collapse-item__content {
			.item {
				&.active,
				&:hover {
					background-color: $configure-list-1;
				}
				.new-folder__input {
					>input {
						border: 1px solid $configure-list;
					}
				}
			}
		}
		.popover {
			>p {
				&:hover {
					background-color: $configure-list-1;
				}
			}
		}
	}
	
	.theme-red {
		.el-collapse-item__content {
			.item {
				&.active,
				&:hover {
					background-color: $configure-list-red-1;
				}
				.new-folder__input {
					>input {
						border: 1px solid $configure-list-red;
					}
				}
			}
		}
		.popover {
			>p {
				&:hover {
					background-color: $configure-list-red-1;
				}
			}
		}
	}
	
	.theme-green {
		.el-collapse-item__content {
			.item {
				&.active,
				&:hover {
					background-color: $configure-list-green-1;
				}
				.new-folder__input {
					>input {
						border: 1px solid $configure-list-green;
					}
				}
			}
		}
		.popover {
			>p {
				&:hover {
					background-color: $configure-list-green-1;
				}
			}
		}
	}
</style>