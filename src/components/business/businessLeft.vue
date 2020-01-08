<template>
	<div class="business">
		<div class="business_add_wrap" @click="open">
			<button type="text" class="business_add">
				<i class="iconfont icon-jia fl"></i>
				<span class="fl">添加术语</span>
			</button>
		</div>
		<div class="business_add_wrap" @click="chackFile">
			<button type="text" class="business_add">
				<i class="iconfont icon-fuzhi fl"></i>
				<span class="fl">批量导入</span>
			</button>
			<input type="file" v-show="false" @click="fileUpload" ref="file" />
		</div>

		<ul class="business-terms-list">
			<li class="business_title transition" :class="{'active': active==index}" v-for="(item, index) in businessTermsList" :key="index" @click="selectBusinessTerms(index)" :data-item="JSON.stringify(item)">
				<span>{{item.nodes[0].name}}</span>
				<i class="iconfont icon-duihao2 fr" v-if="item.nodes[0].tip"></i>
				<i class="iconfont icon-bi bt_left" :class="{'activeShow': active==index}" @click.stop="changeName(item.nodes[0].name,item.nodes[0].id)"></i>
				<i class="iconfont icon-unie639 bt_left" :class="{'activeShow': active==index}" @click="deleteName(item.nodes[0].name,item.nodes[0].id)"></i>
				<div class="tilte_background"></div>

			</li>
		</ul>
	</div>
</template>

<script>
	import { BIMsg } from "../../assets/js/tools.js";
	export default {
		components: {

		},
		data: function() {
			return {
				active: 0,
				dialogTableVisible: false,
				businessTermsList: [{
						"nodes": [{
							"id": "1",
							"type": "start",
							"name": "销售收入",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": false,
						}],
						"edges": {

						}
					},
					{
						"nodes": [{
							"id": "2",
							"type": "start",
							"name": "商品收入",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": true,
						}],
						"edges": {

						}
					},
					{
						"nodes": [{
							"id": "3",
							"type": "start",
							"name": "利润率",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": false,
						}],
						"edges": {

						}
					},
					{
						"nodes": [{
							"id": "4",
							"type": "start",
							"name": "订单转换率",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": false,
						}],
						"edges": {

						}
					},
					{
						"nodes": [{
							"id": "5",
							"type": "start",
							"name": "商品类型",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": false,
						}],
						"edges": {

						}
					},
					{
						"nodes": [{
							"id": "6",
							"type": "start",
							"name": "时间占比",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50,
							"tip": false,
						}],
						"edges": {

						}
					}
				],
				exp: {

				},
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			open() {
				this.$prompt('', '新增术语', {
					confirmButtonText: '确定',
					showCancelButton: false,
					confirmButtonClass: "confirm_add",
					customClass: "add_Box",
					inputType: "textarea",
					inputPlaceholder: '请输入您要新增的术语(中间以","隔开)',
					inputValidator: this.validator,
					inputErrorMessage: "输入框不能为空",
				}).then(({
					value
				}) => {
					//console.log(value)
					//调用接口
					var list = {
						"nodes": [],
						"edges": {}
					}
					var val = {}
					val.name = value;
					val.tip = false;
					val.id = value + 7;
					val.type = "start";
					val.datatype = "varchar";
					val.w = 140;
					val.h = 140;
					val.left = 0;
					val.top = 50;
					list.nodes.push(val)
					this.businessTermsList.push(list)
					BIMsg({
						message: "添加成功",
						type: 'success'
					})
				}).catch(() => {
					BIMsg({
						message: "添加失败",
						type: 'info'
					})
				});
			},
			validator(val) {
				if(val.trim() == "" || val == null) {
					return false
				} else {
					return true
				}
			},
			changeName(name, id) {
				this.$prompt('请输入名字', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: name,
					customClass: "change_Box",
				}).then(({
					value
				}) => {
					//console.log(value)
					this.businessTermsList.map((item, i) => {

						if(item.nodes[0].id == id) {
							item.nodes[0].name = value
						}
					})
				}).catch(() => {

				});
			},
			deleteName(name, id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					customClass: "change_Box",
				}).then(() => {
					this.businessTermsList.map((item, i) => {
						if(item.nodes[0].id == id) {
							this.businessTermsList.splice(i, 1);
						}
					})
					BIMsg({
						message: "删除成功",
						type: 'success'
					})
				}).catch(() => {

				});
			},
			chackFile() {
				this.$refs.file.click()
			},
			fileUpload() {
				//console.log(1)
			},
			selectBusinessTerms(index) {
				this.active = index;
			},
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.business {
		.business_add_wrap {
			cursor: pointer;
		}
		.business_add {
			display: block;
			height: 46px;
			line-height: 46px;
			color: #FFF;
			background: 0 0;
			padding-left: 19px;
			i {
				margin-right: 8px;
			}
		}
		.business-terms-list {
			.business_title {
				color: rgba(255, 255, 255, .9);
				cursor: pointer;
				padding-left: 19px;
				padding-right: 25px;
				>span {
					float: left;
					display: block;
					max-width: 140px;
					height: 50px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				i {
					margin-left: 15px;
				}
				.bt_left {
					display: none;
					/*float:right;*/
					color: #FFF;
				}
				&:hover .bt_left {
					display: inline-block;
				}
				.activeShow {
					display: inline-block;
				}
			}
		}
	}
	
	.theme-blue {
		.business {
			padding-top: 11px;
		}
		.business_title {
			height: 38px;
			line-height: 38px;
			margin-bottom: 15px;
			&.active,
			&:hover {
				font-weight: bold;
				.tilte_background {
					display: block;
				}
			}
			.tilte_background {
				display: none;
				width: 240px;
				height: 1px;
				background: url(../../assets/imgs/title_background.png);
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-red {
		.business {
			.business_add_wrap {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				background-color: #d24836;
			}
			.business_add {
				height: 51px;
				line-height: 51px;
			}
			.business-terms-list {
				.business_title {
					height: 51px;
					line-height: 51px;
					&.active,
					&:hover {
						background: url(../../assets/imgs/red/bg_red_bar.jpg)
					}
					i {
						color: #feb600;
						&.bt_left {
							color: #FFF;
						}
					}
				}
			}
		}
	}
	
	.theme-green {
		.business {
			.business_add_wrap {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
			}
			.business_add {
				height: 51px;
				line-height: 51px;
			}
			.business-terms-list {
				.business_title {
					height: 51px;
					line-height: 51px;
					&.active,
					&:hover {
						background: url(../../assets/imgs/green/bg_green_bar.jpg);
					}
					i {
						color: #feb600;
						&.bt_left {
							color: #FFF;
						}
					}
				}
			}
		}
	}
</style>