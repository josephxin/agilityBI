<template>
	<div class="hot_word_content">
		<header class="header">
			<div class="add_cancel_none">
				<button class="add_none el-btn save" @click="addHot">保存</button>
				<button class="cance_none el-btn cancel" @click="cancelFn">取消</button>
			</div>
		</header>
		<div class="hot_table">
			<el-table :data="tableData" border stripe class="el_table">
				<el-table-column label="名称" width="210" align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.idName }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="typeName" label="类型" width="210" align="center"></el-table-column>

				<el-table-column label="热词" header-align="center">
					<template slot-scope="scope">
						<transition-group name="fade" tag="div">
							<div class="aliasNames" v-for="(item,i) in scope.row.aliasNames" :key="i">
								<span :title="item.aliasName">{{item.aliasName}}</span>
								<i class="el-icon-circle-close" @click="deletes(i,scope.row.id)"></i>
							</div>
						</transition-group>
						<transition name="fade" mode="out-in">
							<i class="el-icon-circle-plus" @click="show(scope.$index)" v-if="scope.row.toggle"></i>
							<el-input size="mini" v-model="newDate" ref="newDate" value="" v-if="!(scope.row.toggle)" @blur="changeFolder($event)" @keyup.enter.native="changeFolder($event)"></el-input>
						</transition>
					</template>
				</el-table-column>
				
				<template slot="empty" slot-scope="scope">
					<i class="no_data"></i>
					<i class="no_bor"></i>
					<span>暂无数据，请选择...</span>
				</template>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { updateHotWord, queryHotWordList } from "@/api/index.js";
	import { BIMsg } from "../../assets/js/tools.js";
	
	export default {
		components: {

		},
		data() {
			return {
				tableData: [],
				tableObj: null,
				newDate: "",
				active: -1,
				preventConflict: true, //解决失去焦点和回车事件的冲突
			}
		},
		computed: {
			...mapState(["hotWord"]),
		},
		watch: {
			hotWord: {
				handler(val, olval) {
					//多次点击只执行一次
					//console.log('获取表或者实体里面的数据', val);
					this.tableObj = val
					this.queryHotWordListAjax()
				},
				deep: true
			}
		},
		methods: {
			//删除热词
			deletes(index, id) { 
				//console.log(i,id)
				for(var i = 0; i < this.tableData.length; i++) {
					var tables = this.tableData[i]
					if(tables.id == id) {
						tables.aliasNames.splice(index, 1)
						return;
					}
				}
			},
			//显示input框
			show(index) { 
				//console.log(index);//全体的index
				this.tableData[index].toggle = false
				this.active = index
				setTimeout(() => {
					this.$refs.newDate.focus() //input  框获取焦点
				}, 200)
			},
			changeFolder(e) { //input宽中的属性
				if(this.preventConflict) {
					//console.log(e)
					if(e.type == 'keyup') {
						this.preventConflict = false
						setTimeout(() => {
							this.preventConflict = true
						})
					}
					//console.log(this.newDate);
					if(this.newDate != '') {
						this.tableData[this.active].aliasNames.push({
							"aliasName": this.newDate,
						})
						this.newDate = '';
					}
					this.tableData[this.active].toggle = true
				}
			},
			queryHotWordListAjax() {
				//获取热词接口
				var types = "";
				var objectIds = "";
				var objArr = []
				if(this.tableObj.entityId) { //点击实体
					types = "ENTITY_CLASS";
					objectIds = this.tableObj.entityId;

				} else if(this.tableObj.id) { //点击表
					types = "TABLE";
					objectIds = this.tableObj.id;
				}
				queryHotWordList({
					"userId": 1,
					"type": types, //热词类型，取值范围TABLE、ENTITY_CLASS。TABLE表示表名，ENTITY_CLASS表示实体类
					"objectId": objectIds //对象id,type为TABLE时，传入tableId；type为ENTITY_CLASS时 ，传入entityId。
				}).then(data => {
					//console.log('获取热词列表', data)
					var subAttr = data.data.subAttr || []
					if(types == "TABLE") { //表
						var tables = {
							"id": this.tableObj.id,
							"idName": this.tableObj.tableName,
							"typeName": "表",
							"type": "TABLE",
							"aliasNames": data.data.aliasNames,
							"toggle": true,
						}
						objArr.push(tables)
						//var subAttr = data.data.subAttr || []
						var column = this.tableObj.column
						for(var i = 0; i < column.length; i++) {
							var columns = column[i];
							var columnObj = {
								"id": columns.id,
								"idName": columns.columnName,
								"typeName": "列",
								"type": "COLUMN",
								"aliasNames": [],
								"toggle": true,
							}
							for(var s = 0; s < subAttr.length; s++) {
								var subAttrs = subAttr[s]
								if(subAttrs.objectId == columns.id) {
									columnObj.aliasNames = subAttrs.aliasNames
								}
							}
							objArr.push(columnObj)
						}
						//console.log(objArr)
						this.tableData = objArr
					} else if(types == "ENTITY_CLASS") { //实体
						var entitys = {
							"id": this.tableObj.entityId,
							"idName": this.tableObj.entityName,
							"typeName": "实体",
							"type": "ENTITY_CLASS",
							"aliasNames": data.data.aliasNames,
							"toggle": true,
						}
						objArr.push(entitys)
						//var subAttr = data.data.subAttr || []
						var includeTables = this.tableObj.includeTable
						for(var n = 0; n < includeTables.length; n++) {
							var attrs = includeTables[n].attr
							for(var t = 0; t < attrs.length; t++) {
								var attrName = attrs[t]
								var attrNameObj = {
									"id": attrName.columnId,
									"idName": attrName.attrName,
									"typeName": "属性",
									"type": "ENTITY_PROPERTITY",
									"aliasNames": [],
									"toggle": true,
								}
								for(var s = 0; s < subAttr.length; s++) {
									var subAttrs = subAttr[s]
									if(subAttrs.objectId == attrName.columnId) {
										attrNameObj.aliasNames = subAttrs.aliasNames
									}
								}
								objArr.push(attrNameObj)
							}
						}
						//console.log(objArr)
						this.tableData = objArr
					}
				}).catch(err => {
					console.log(err)
				})
			},
			addHot() {
				//console.log('保存热词', this.tableData)
				var upsertWords = []
				for(var i = 0; i < this.tableData.length; i++) {
					var tab = this.tableData[i]
					var tabObj = {
						"type": tab.type,
						"objectId": tab.id,
						"list": []
					}
					for(var j = 0; j < tab.aliasNames.length; j++) {
						var alias = tab.aliasNames[j]
						//console.log(alias)
						tabObj.list.push(alias.aliasName)
					}
					upsertWords.push(tabObj)
				}
				//console.log(upsertWords)
				updateHotWord({
					"userId": 1,
					"deleteRefIds": "", //删除热词关联id集合。删除时必填。
					"upsertWords": upsertWords, //新建或者更新热词集合。新建和更新时必填。
				}).then(data => {
					//console.log(data)
					BIMsg({
						message: "添加成功",
						type: 'success'
					})
				}).catch(err => {
					console.log(err)
				})
			},
			cancelFn(){
				//console.log($('.is_active'));
				this.queryHotWordListAjax()
			}
		},
		created() {

		},
		mounted() {
			//this.queryHotWordListAjax()
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.hot_word_content {
		min-height: calc(100vh - 230px);
		border-radius: 20px;
		background: #FFF;
		width: 100%;
		.header {
			height: 133px;
			padding: 0 40px;
			position: relative;
			.add_cancel_none {
				position: absolute;
				z-index: 100;
				right: 40px;
				top: 25px;
				button+button {
					margin-left: 16px;
				}
			}
		}
		.hot_table {
			display: flex;
			box-sizing: border-box;
			padding: 0 40px;
			.el_table {
				flex: 1;
			}
		}
		.aliasNames {
			float: left;
			max-width: 120px;
			margin-right: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			cursor: pointer;
			font-size: 14px;
			position: relative;
			span {
				display: block;
				margin-right: 20px;
				margin-left: 5px;
				max-width: 120px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			i {
				display: none;
				position: absolute;
				right: 0px;
				top: 3px;
				font-size: 17px;
				cursor: pointer;
			}
			&:hover {
				>i {
					display: inline-block;
				}
			}
		}
	}
	
	.el-icon-circle-plus {
		float: left;
		line-height: 23px;
		font-size: 17px;
		cursor: pointer;
	}
	
	.theme-blue{
		.hot_word_content{
			.aliasNames:hover{
				>span{
					color: $configure-list;
				}
			}
		}
	}
	.theme-red{
		.hot_word_content{
			.aliasNames:hover{
				>span{
					color: $configure-list-red;
				}
			}
		}
	}
	.theme-green{
		.hot_word_content{
			.aliasNames:hover{
				>span{
					color: $configure-list-green;
				}
			}
		}
	}
</style>