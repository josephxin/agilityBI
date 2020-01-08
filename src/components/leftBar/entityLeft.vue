<template>
	<div class="entity_left">
		<happy-scroll>
			<div class="entity_left_item">
				<div class="eli_title">
					<img class="" src="../../assets/imgs/entity_pattern.png" />
					<p>数据库实体配置</p>
				</div>
			</div>
			<div class='entity_left_content'>
				<div class="elc_add" @click="open">
					<button type="text" class="elc_add_btn">
							<i class="iconfont icon-jia fl"></i>
							<span class="fl">新建实体</span>
						</button>
				</div>

				<foreign-key-left-list></foreign-key-left-list>

				<collapse-entity :list="list" pageType="entity" @event-click-entity="getShow" @event-click-change="changeName" @event-click-delete="deleteName"></collapse-entity>
			</div>
		</happy-scroll>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { BIMsg } from "../../assets/js/tools.js";
	import foreignKeyLeftList from "components/dataForeignKeyLeftList/foreignKeyLeftList"
	import collapseEntity from "@/components/collapse/collapseEntity"
	import { getDataForeignKey, getDataEntity, getDataDeleteEntity } from "@/api/index.js";

	export default {
		components: {
			foreignKeyLeftList,
			collapseEntity,
		},
		data() {
			return {
				activeNames: ["1"],
				list: [],
			}
		},
		computed: {
			...mapState(["foreignKeyList", "entityId", "entityUpdata", "hotWordEntityActive"]),
		},
		watch: {
			entityUpdata: {
				handler(val, oldval) {
					//console.log(val)
					this.getDataEntityAjax()
				}
			}
		},
		methods: {
			//实体配置
			open() { //增加实体
				this.$prompt('', '新增实体', {
					confirmButtonText: '确定',
					showCancelButton: false,
					confirmButtonClass: "confirm_add",
					customClass: "add_Box",
					inputType: "textarea",
					inputPlaceholder: '请输入您要新增的术语',
					inputValidator: this.validator,
					inputErrorMessage: "输入框不能为空",
				}).then(({
					value
				}) => {
					//console.log(value)
					var obj = {}
					obj.entityName = value
					obj.includeTable = []
					this.list.unshift(obj) //给list 加
					//默认选中新增的项
					this.getShow({
						item: obj,
						index: 0
					})

					BIMsg({
						message: "添加成功",
						type: 'success'
					})
				}).catch((err) => {
					//console.log(err)
				});
			},
			getShow(data) { //点击实体获取接口
				//console.log("获取到的实体", data)
				var item = data.item
				var index = data.index
				var _this = this
				var entityId = item.entityId ? item.entityId : "";
				this.$store.commit("changeEntityId", entityId) // 更新实体id
				this.$store.commit("changeHotWordEntityActive", index)
				if(item.entityId) {
					var lookUp = item.includeTable
					var lookKey = this.foreignKeyList
					var entityLeftList = []
					var entityListName = []
					for(var i = 0; i < lookUp.length; i++) {
						for(var j = 0; j < lookKey.length; j++) {
							var databases = lookKey[j].database;
							for(var l = 0; l < databases.length; l++) {
								var tables = databases[l].table;
								for(var k = 0; k < tables.length; k++) {
									//console.log(lookKey[j].database[0].table[k].id)
									//console.log(lookUp[i].tableId)
									if(lookUp[i].tableId == tables[k].id) {
										//console.log(entityListName)

										entityLeftList.push(tables[k])
										entityListName.push(tables[k])
										_this.$store.commit("changeEntityDataObj", item)
										_this.$store.commit("changeEntityLeftList", entityLeftList)
										_this.$store.commit("changeEntityListName", entityListName)
									}
								}
							}
						}
					}
				} else {
					_this.$store.commit("changeEntityDataObj", item)
					_this.$store.commit("changeEntityLeftList", [])
					_this.$store.commit("changeEntityListName", [])
				}
			},
			validator(val) {
				if(val.trim() == "" || val == null) {
					return false
				} else {
					return true
				}
			},
			//编辑实体名
			changeName(data) {
				//console.log(data);
				var entityName = data.entityName
				var index = data.index
				this.$prompt('请输入名字', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputValue: entityName,
					customClass: "change_Box",
					inputValidator: this.validator,
					inputErrorMessage: "输入框不能为空",
				}).then(({
					value
				}) => {
					//console.log(value)
					this.list[index].entityName = value
				}).catch((err) => {

				});
			},
			//删除实体
			deleteName(data) {
				//console.log(data);
				var entityId = data.entityId
				var index = data.index
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					customClass: "change_Box",
				}).then(() => {
					//console.log('实体数组', this.list)
					this.list.splice(index, 1)
					//如果是接口返回的实体，需要发送请求，删除实体
					if(entityId) {
						this.getDataDeleteEntityAjax(entityId)
					}

					var len = this.list.length
					if(len - 1 == this.hotWordEntityActive) {
						this.$store.commit("changeHotWordEntityActive", -1)
						this.$root.toolkit.clear()

						this.$store.commit("changeEntityDataObj", {})
						this.$store.commit("changeEntityLeftList", [])
						this.$store.commit("changeEntityListName", [])
					} else {
						// 加上定时器，否则数据不更新
						setTimeout(() => {
							//console.log($('.elc_content .is_active'));
							$('.elc_content .is_active').trigger('click')
						})
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			//获取数据库表结构和外键接口
			getForeignKeyAjax() {
				getDataForeignKey({
					"userId": this.$root.userId,
				}).then(data => {
					//console.log(data)
					if(data.message == "success") {
						this.$store.commit("changeForeignKeyList", data.data)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//获取实体列表接口
			getDataEntityAjax() {
				getDataEntity({
					"userId": this.$root.userId,
				}).then(data => {
					//console.log('获取实体列表接口', data, this.entityId)
					if(data.message == "success") {
						this.list = data.data
						if(this.entityId) {
							setTimeout(() => {
								$('.elc_content li').each((index, item) => {
									if($(item).data('id') == this.entityId) {
										$(item).trigger('click')
									}
								})
							})
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//删除实体表接口
			getDataDeleteEntityAjax(id) {
				getDataDeleteEntity({
					"userId": this.$root.userId,
					"entityId": id
				}).then(data => {
					//console.log(data)
					BIMsg({
						message: "删除成功",
						type: 'success'
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},
		created() {

		},
		mounted() {
			this.getForeignKeyAjax()
			this.getDataEntityAjax()

			// 重置当前实体下标为-1，不选中实体
			this.$store.commit("changeHotWordEntityActive", -1)
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.entity_left {
		height: 100%;
		.eli_title {
			height: 111px;
			text-align: center;
			background: url(../../assets/imgs/bg_red.png) no-repeat;
			background-size: 100% 100%;
			user-select: none;
			img {
				margin-top: 32px;
			}
			p {
				color: white;
				font-size: 14px;
				line-height: 24px;
			}
		}
		.entity_left_content {
			.elc_add_btn {
				display: block;
				width: 100%;
				height: 46px;
				line-height: 46px;
				color: #FFF;
				background: 0 0;
				padding-left: 19px;
				i {
					margin-right: 8px;
				}
			}
			.elc_content {
				background: $configure-list-red-5;
				>li {
					height: 50px;
					line-height: 50px;
					font-size: 14px;
					cursor: pointer;
					padding: 0 20px;
				}
				>li:hover,
				li.is_active {
					background: $configure-list-red;
					i.elc_left {
						display: inline-block;
					}
				}
				.iconfont {
					font-size: 14px;
					margin-right: 12px;
				}
				i.elc_left {
					display: none;
					margin-left: 15px;
					margin-right: 0;
				}
			}
		}
	}
	
	.theme-green {
		.entity_left {
			.eli_title {
				background: url(../../assets/imgs/bg_green.png) no-repeat;
				background-size: 100% 100%;
			}
			.entity_left_content {
				.elc_content {
					background: $configure-list-green-5;
					>li:hover,
					li.is_active {
						background: $configure-list-green;
					}
				}
			}
		}
	}
	
	.theme-blue {
		.entity_left {
			padding: 6px;
			.eli_title {
				background: url(../../assets/imgs/blue/bg_term.png) no-repeat;
				background-size: 100% 100%;
			}
			.entity_left_content {
				.elc_content {
					background: $configure-list-5;
					>li:hover,
					li.is_active {
						background: $configure-list-3;
					}
				}
			}
		}
	}
</style>