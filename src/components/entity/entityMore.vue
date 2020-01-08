<template>
	<div class="entity_more">
		<div class="entity_top">
			<el-form :rules="rules" :label-position="labelPosition" label-width="80px" :model="formEntity" ref="formEntity" size="mini" class="clearfix">
				<el-form-item label="实体主键" prop="majorKeyName">
					<el-select v-model="formEntity.majorKeyName" placeholder="请选择表" :popper-append-to-body="false" @change="changeMajorKeyName">
						<el-option v-for="(item,index) in opMajorKeyName" :key="index" :value="item.id" :label="item.tableName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="majorKeyField" class="column_id">
					<el-select v-model="formEntity.majorKeyField" placeholder="请先选择表" :popper-append-to-body="false" @change="changeMajorKeyField">
						<el-option v-for="(item,index) in opMajorKeyField" :key="index" :value="item.id" :label="item.columnName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="字面量" prop="literalName">
					<el-select v-model="formEntity.literalName" placeholder="请选择表" :popper-append-to-body="false" @change="changeLiteralName">
						<el-option v-for="(item,index) in opLiteralName" :key="index" :value="item.id" :label="item.tableName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="literalField" class="column_id">
					<el-select v-model="formEntity.literalField" placeholder="请先选择表" :popper-append-to-body="false" @change="changeLiteralField">
						<el-option v-for="(item,index) in opLiteralField" :key="index" :value="item.id" :label="item.columnName">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<div class='entity_buttom'>
			<el-table :data="tableData" height="calc(100vh - 455px)">
				<el-table-column label="实体属性名" width="117" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.toggle" style="margin-right: 10px">{{ scope.row.attrName }}</span>
						<el-input size="mini" v-model="newDate" ref="newDate" v-if="!(scope.row.toggle)" @blur="changeFolder($event,scope.row.attrName)" @keyup.enter.native="changeFolder($event,scope.row.attrName)"></el-input>
						<i class="iconfont icon-bi" style="cursor:pointer" @click="show(scope.$index,scope.row.attrName)" v-if="scope.row.toggle"></i>
					</template>
				</el-table-column>
				<el-table-column label="表名" width="117" align="center" prop="tableName"></el-table-column>
				<el-table-column label="列名" align="center" prop="columnName"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { UpdataEntity } from "@/api/index.js";
	import { BIMsg } from '../../assets/js/tools.js'

	export default {
		components: {},
		data() {
			return {
				labelPosition: 'left',
				formEntity: {
					majorKeyName: "", //实体主键名
					majorKeyField: "", //实体主键字段
					literalName: "", //字面量名
					literalField: "", //字面量字段
				},
				rules: {
					majorKeyField: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}],
					literalField: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}]
				},
				opMajorKeyName: [], //实体主键
				opMajorKeyField: [], //实体主键字段的list
				opLiteralName: [], //实体主键名的list
				opLiteralField: [], //实体主键字段的list,

				tableData: [],
				active: -1,
				newDate: "",
				preventConflict: true, //解决失去焦点和回车事件的冲突
				entityName: "", //实体名
				majorId: "", //实体主键列id
				literalId: "", //字面量列id
				attrObj: [], //实体属性名所在的列id  和 名
			}
		},
		computed: {
			...mapState(["entityListName", "entityRightList", "entityDataObj", "commonArr", "entityId", "entityUpdata"]),
		},
		watch: {
			entityListName: { //点击时实体自带的数组，或者自己新增的（一般是空的）
				handler(newValue, oldValue) {
					//console.log(newValue)//获取到表数据
					this.$refs.formEntity.clearValidate()
					this.opMajorKeyName = newValue; //实体主键
					this.opLiteralName = newValue //字面量
					//选中实体先判断表有没有
				},
				deep: true
			},
			entityRightList: { //拖拽往jsplumb 增加的数据的数组
				handler(newValue, oldValue) {
					//console.log(newValue) //获取到表数据
					//新增表也有以前的表
					this.opMajorKeyName = newValue

					this.opLiteralName = newValue
				},
				deep: true
			},
			entityDataObj: {
				handler(newValue, oldValue) {
					//console.log('实体对象，用于控制连线', newValue)
					this.entityName = newValue.entityName; //实体名字有的话就加
					if(newValue.entityId) {
						this.formEntity.majorKeyName = newValue.entityPrimaryTableId
						this.changeMajorKeyName(newValue.entityPrimaryTableId)
						this.formEntity.majorKeyField = newValue.entityPrimaryColumnId

						this.formEntity.literalName = newValue.literalTableId
						this.changeLiteralName(newValue.literalTableId)
						this.formEntity.literalField = newValue.literalColumnId

						this.literalId = newValue.literalColumnId //实体字面量列id
						this.majorId = newValue.entityPrimaryColumnId //实体主键列id
					} else {
						this.opMajorKeyName = [] //实体主键
						this.opMajorKeyField = []
						this.opLiteralName = [] //字面量的
						this.opLiteralField = []
						this.$refs.formEntity.resetFields() //重置表单
					}
				},
				deep: true
			},
			commonArr: {
				handler(newValue, oldValue) {
					//console.log('监听右侧实体属性数组的变化', newValue) //获取到表数据
					this.tableData = newValue
				},
				deep: true
			}
		},
		methods: {
			changeMajorKeyName(val) { //根据实体主键id来查询列
				//console.log(val)
				this.opMajorKeyField = [];
				this.formEntity.majorKeyField = "";
				this.opMajorKeyName.map((item, i) => {
					if(item.id == val) {
						this.opMajorKeyField = item.column
					}
				})
			},
			changeLiteralName(val) { //根据字面量id 来查询列
				this.opLiteralField = [];
				this.formEntity.literalField = "";
				this.opLiteralName.map((item, i) => {
					if(item.id == val) {
						this.opLiteralField = item.column
					}
				})
			},
			changeMajorKeyField(val) { //实体主键获取的列id
				//console.log(val)
				this.majorId = val
			},
			changeLiteralField(val) { //实体字面量获取的列id
				//console.log(val)
				this.literalId = val
			},
			show(index, name) { //显示input框
				this.tableData[index].toggle = false
				this.newDate = name
				this.active = index
				setTimeout(() => {
					this.$refs.newDate.focus() //input  框获取焦点
				})
			},
			changeFolder(e, name) {
				if(this.preventConflict) {
					//console.log(e)
					if(e.type == 'keyup') {
						this.preventConflict = false
						setTimeout(() => {
							this.preventConflict = true
						})
					}
					if(this.newDate != '' && this.newDate != name) {
						this.tableData[this.active].attrName = this.newDate
					}
					this.tableData[this.active].toggle = true
					//console.log(this.tableData)
				}
			},
			//父件触发的 保存
			addEntity() {
				if(this.entityName == '') {
					BIMsg({
						message: '请选择一个实体或者新建实体，然后拖入数据表！',
						type: 'info'
					})
					return;
				}
				this.$refs.formEntity.validate((valid) => {
					if(valid) {
						//console.log(this.formEntity.majorKeyName, this.formEntity.literalName);
						var flag = false;
						var flag2 = false;
						if(this.commonArr.length == 0) {
							BIMsg({
								message: '请至少选则一个列，没有选择列的数据表不会保存！',
							})
							return;
						}
						$.each(this.commonArr, (index, item) => {
							if(item.tableId == this.formEntity.majorKeyName) {
								flag = true;
								return false;
							}
						});
						$.each(this.commonArr, (index, item) => {
							if(item.tableId == this.formEntity.literalName) {
								flag2 = true;
								return false;
							}
						});
						if(flag == false) {
							BIMsg({
								message: '实体主键所在的表必须有选中的列！',
							})
							return;
						}
						if(flag2 == false) {
							BIMsg({
								message: '字面量所在的表必须有选中的列！',
							})
							return;
						}

						this.attrObj = []
						for(var i = 0; i < this.tableData.length; i++) {
							//console.log(this.attrObj)
							var news = this.tableData[i]
							this.attrObj.push({
								"columnId": news.columnId, //实体属性所属列id
								"attrName": news.attrName //实体属性列名称
							})
						}
						//console.log("我上传的实体属性名", this.attrObj)
						UpdataEntity({
							"userId": this.$root.userId, //用户id
							"entityId": this.entityId, //实体id，新增实体时，此字段放置null或者空字符串；修改实体时，此字段必填。
							"entityName": this.entityName, //	实体名称
							"attr": this.attrObj,
							"literalColumnId": this.literalId, //实体字面量列id
							"entityPrimaryColumnId": this.majorId //实体主键列id
						}).then(data => {
							//console.log('保存实体', data, this.entityId)
							if(data.data.status) {
								this.$store.commit("changeEntityUpdata", !this.entityUpdata) // 更新实体id
								if(this.entityId == '') {
									this.$store.commit("changeEntityId", data.data.entity.entityId) // 更新实体id
								}
								BIMsg({
									message: '保存成功',
								})
							}
						}).catch(err => {
							BIMsg({
								message: err,
							})
						})
					} else {
						BIMsg({
							message: '该实体未配置主键或字面量',
						})
					}
				})
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.entity_more {
		width: 352px;
		min-height: calc(100vh - 343px);
		margin-right: 40px;
		.entity_top {
			margin-bottom: 18px;
		}
		.entity_buttom {}
	}
</style>