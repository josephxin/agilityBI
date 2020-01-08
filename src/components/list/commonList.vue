<template>
	<div class="common_list">
		<div class="common_list_title">
			<p>{{this.title}}</p>
			<div class="common_list_btn" v-if="types == 'matchingList'">
				<router-link to="dataMatching">
					<span class="add_match"><i class="iconfont icon-plus-creat"></i>新建数据源</span>
				</router-link>
				<span class="delete_match" v-if="data.length"><i class="iconfont icon-unie639"></i>删除</span>
			</div>
			<div class="common_list_btn" v-if="types == 'AssociationList'">
				<span class="add_relation" @click="dialogData = true"><i class="iconfont icon-tianjiawenjian"></i>添加</span>
			</div>
			<div class="common_list_btn" v-if="types == 'businessList'">
				<router-link to="listligature">
					<span class="add_business"><i class="iconfont icon-guanlian"></i>关联</span>
				</router-link>
				<router-link to="businessMatching">
					<span class="add_relation" v-if="data.length"><i class="iconfont icon-tianjiawenjian"></i>添加</span>
				</router-link>
			</div>
		</div>
		<div class="common_list_content clearfix">
			<div class="clc_table">
				<el-table :data="data" style="width: 100%;border:1px solid #E6E6E6" align="center">
					<el-table-column v-if="selsetShow" type="selection" align="center">
					</el-table-column>
					<el-table-column v-for="(item,index) in tableTitle" :key="index" :prop="item.prop" :label="item.label" align="center">
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope" align="center">
							<a size="mini" @click="handleEdit(scope.$index, scope.row)" class="table_color">修改</a>
							<a size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</a>
						</template>
					</el-table-column>
					<template slot="empty" slot-scope="scope">
						<i class="no_data"></i>
						<i class="no_bor"></i>
						<span>暂无数据源，请添加...</span>
					</template>
				</el-table>

			</div>
			<pagination :total="total" v-if="data.length>0" />
		</div>
		<!--数据关联列表的添加-->
		<el-dialog title="选择字段" :visible.sync="dialogData" width="919px">
			<dialog-field />
			<div class="again">
				<el-button type="primary" @click="dialogData = false" class='test'>保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '@/components/pagination/pagination'
	import dialogField from '@/components/dialog/dialogFileld'
	import { getDataMatchField } from "@/api/index.js"

	export default {
		components: {
			pagination,
			dialogField
		},
		props: {
			types: {
				type: String
			},
			title: {
				type: String
			},
			data: {
				type: Array
			},
			total: {
				type: Number
			},
			tableTitle: {
				type: Array
			},
			selsetShow: {
				type: Boolean
			}
		},
		data() {
			return {
				dialogData: false,
				tableName: [

				],
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			handleEdit(index, row) {
				if(this.types == 'AssociationList') {
					//console.log(1)
				} else if(this.types == "matchingList") {
					//console.log(2)
					//console.log(row)
					this.getMatchFieldAjax(row)
				}
			},
			handleDelete(index, row) {
				//console.log(index, row);
			},
			getMatchFieldAjax(obj){
				/*getDataMatchField({
					id:obj.id,
					table_schema:obj.name
				})
				.then(data=>{
					console.log(data)
				})
				.catch(err=>{
					
				})*/
			}
		},
		created() {
			this.getMatchFieldAjax()
		},
		mounted() {

		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.common_list{
		.el-table__empty-block{
			min-height: 240px;
		}
	}
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	.common_list {
		padding: 32px 50px;
		.common_list_title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 25px;
			p {
				margin-top: 14px;
				font-size: 20px;
				color: #333;
				font-weight: bold;
			}
			.common_list_btn {
				margin-top: 10px;
				span {
					display: inline-block;
					box-sizing: border-box;
					width: 100px;
					height: 32px;
					border-radius: 20px;
					text-align: center;
					line-height: 32px;
					cursor: pointer;
					i {
						width: 14px;
						height: 14px;
						font-size: 14px;
						margin-right: 5px;
					}
				}
				.add_match {
					width: 130px;
					margin-right: 25px;
				}
				.add_business {
					margin-right: 25px;
				}
			}
		}
		.common_list_content {
			min-height: calc(100vh - 383px);
			background: #FFFFFF;
			border-radius: 10px;
			padding: 30px 40px;
			.clc_table {
				min-height: 240px;
				a {
					font-size: 14px;
					text-decoration: underline;
					margin-right: 15px;
					margin-left: 15px;
					color: #ea641a;
				}
				.table_color {
					color: $blue-color
				}
			}
			.no_data {
				display: block;
				width: 78px;
				height: 78px;
				background: url(../../assets/imgs/no_data.png) no-repeat;
				margin: auto;
			}
			.no_bor {
				display: block;
				width: 129px;
				height: 6px;
				margin: 20px auto 39px;
				background: #e9ebee;
			}
		}
		.again {
			text-align: center;
			padding-bottom: 28px;
			margin-top: 30px;
			button {
				width: 100px;
				height: 32px;
				line-height: 32px;
				font-size: 16px;
				border-radius: 20px;
				text-align: center;
				/*background: url(../../assets/imgs/blue/test_blue.png);*/
			}
		}
	}
	
	.theme-red {
		.common_list {
			.common_list_title {
				.common_list_btn {
					span {
						background-color: #fff3ef;
						color: #dd2a12;
						border: 1px solid #dd2a12!important;
					}
				}
			}
		}
	}
	
	.theme-blue {
		.common_list {
			.common_list_title {
				.common_list_btn {
					span {
						background: url(../../assets/imgs/blue/btn_bg.png) no-repeat;
						background-size: 100% 100%;
						color: #4a6c98;
					}
					.add_match {
						background: url(../../assets/imgs/blue/btn_bg_add.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}
	}
	
	.theme-green {
		.common_list {
			.common_list_title {
				.common_list_btn {
					span {
						background-color: #effdf5;
						color: #009540;
						border: 1px solid #009540!important;
					}
				}
			}
		}
	}
</style>