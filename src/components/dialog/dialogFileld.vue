<template>
	<div class="zTree_dialog_content">
		<div class="zdc_content_tree">
			<el-tree class="zdc_project-tree" show-checkbox unselectable="on" :render-content="renderContent" :data="data" :props="defaultProps" :expand-on-click-node="true" @node-click="handleNodeClick" @check="clickCheckbox"></el-tree>
		</div>
		<div class="zdc_content_tab">
			<el-table :data="tableData3" stripe border height="385" @selection-change="handleSelectionChange">
				<el-table-column type="selection" align="center" :resizable="false"></el-table-column>
				<el-table-column prop="date" align="center" label="字段" :resizable="false" show-overflow-tooltip></el-table-column>
				<el-table-column prop="name" align="center" label="类型" :resizable="false" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				data: [{
					label: '数据库',
					className: "first-level",
					children: [{
							label: 'SAS（战级变量）',
							className: "second-level",
							children: [{
									label: '（1#主变）（1#主变）（1#主变）（1#主变）（1#主变）（1#主变）（1#主变）（1#主变）',
									className: "third-level"
								},
								{
									label: '（1#主变高压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变中压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变低压侧）',
									className: "third-level"
								},
								{
									label: '（金乐线）',
									className: "third-level"
								},
								{
									label: '（金桥线）',
									className: "third-level"
								},
								{
									label: '（站级变量）',
									className: "third-level"
								}
							]
						},
						{
							label: 'D1（金接线）',
							className: "second-level",
							children: [{
									label: '（1#主变）',
									className: "third-level"
								},
								{
									label: '（1#主变高压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变中压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变低压侧）',
									className: "third-level"
								},
								{
									label: '（金乐线）',
									className: "third-level"
								},
								{
									label: '（金桥线）',
									className: "third-level"
								},
								{
									label: '（站级变量）',
									className: "third-level"
								}
							]
						},
						{
							label: '金页线',
							className: "second-level",
							children: [{
									label: '（1#主变）',
									className: "third-level"
								},
								{
									label: '（1#主变高压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变中压侧）',
									className: "third-level"
								},
								{
									label: '（1#主变低压侧）',
									className: "third-level"
								},
								{
									label: '（金乐线）',
									className: "third-level"
								},
								{
									label: '（金桥线）',
									className: "third-level"
								},
								{
									label: '（站级变量）',
									className: "third-level"
								}
							]
						}
					]
				}],
				tableData3: [{
					date: '2016-05-03',
					name: '王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1王小虎1',
				}, {
					date: '2016-05-02',
					name: '王小虎2',
				}, {
					date: '2016-05-04',
					name: '王小虎3',
				}, {
					date: '2016-05-01',
					name: '王小虎4',
				}, {
					date: '2016-05-08',
					name: '王小虎5',
				}, {
					date: '2016-05-06',
					name: '王小虎6',
				}, {
					date: '2016-05-07',
					name: '王小虎7',
				}, {
					date: '2016-05-07',
					name: '王小虎8',
				}, {
					date: '2016-05-07',
					name: '王小虎9',
				}, {
					date: '2016-05-07',
					name: '王小虎10',
				}, {
					date: '2016-05-07',
					name: '王小虎11',
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				leftAllChecked: [], //左侧所有选中的对象组成的数组
				multipleSelection: [], //右侧所有选中的对象组成的数组
			}
		},
		methods: {
			clickCheckbox(currentChecked, allChecked) {
				//console.log(currentChecked, allChecked);
				this.leftAllChecked = allChecked.checkedNodes
			},
			handleNodeClick(data) {
				//console.log(data);
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				//console.log(node, data, store)
				if(data.className == 'first-level') {
					return(
						<span class="custom-tree-node">
	            <i class="iconfont icon-shuju"></i>
	            <span style="font-weight: bold;" title={node.label}>{node.label}</span>
	          </span>
					);
				} else if(data.className == 'second-level') {
					return(
						<span class="custom-tree-node">
	            <i class="iconfont icon-wenjianjia"></i>
	            <span style="font-weight: bold; font-size: 12px;" title={node.label}>{node.label}</span>
	          </span>
					);
				} else {
					return(
						<span class="custom-tree-node">
	            <span style="font-size: 12px;" title={node.label}>{node.label}</span>
	          </span>
					);
				}
			},
			handleSelectionChange(val) {
				//console.log(val);
				this.multipleSelection = val
			}
		},
		computed: {

		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style lang="scss">
	.el-table tr {
		height: 35px;
	}
	
	.el-table td,
	.el-table th {
		padding: 0;
	}
	
	.el-table {
		.is-leaf {
			&:first-of-type {
				border-right: none;
			}
			&:nth-of-type(3) {
				border-right: none;
			}
		}
	}
	
	.el-table__row {
		td {
			&:first-of-type {
				border-right: none;
			}
			&:last-of-type {
				border-right: none;
			}
		}
	}
	
	.el-table__body {
		tr:last-of-type {
			td {
				border-bottom: none;
			}
		}
	}
	
	.theme-blue {
		.el-table--enable-row-hover .el-table__body tr:hover>td {
			background-color: $configure-list-1;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
		.el-table__body tr.current-row>td,
		.el-table__body tr.hover-row.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped>td,
		.el-table__body tr.hover-row>td {
			background-color: $configure-list-1;
		}
	}
	
	.theme-red {
		.el-table--enable-row-hover .el-table__body tr:hover>td {
			background-color: $configure-list-red-1;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
		.el-table__body tr.current-row>td,
		.el-table__body tr.hover-row.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped>td,
		.el-table__body tr.hover-row>td {
			background-color: $configure-list-red-1;
		}
	}
	
	.theme-green {
		.el-table--enable-row-hover .el-table__body tr:hover>td {
			background-color: $configure-list-green-1;
		}
		.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
		.el-table__body tr.current-row>td,
		.el-table__body tr.hover-row.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped.current-row>td,
		.el-table__body tr.hover-row.el-table__row--striped>td,
		.el-table__body tr.hover-row>td {
			background-color: $configure-list-green-1;
		}
	}
	
	.zTree_dialog_content {
		display: flex;
		height: 385px;
		.zdc_content_tree {
			box-sizing: border-box;
			width: 316px;
			border: 1px solid #ebeef5;
			border-right: none;
			padding: 18px;
			overflow: auto;
		}
		.zdc_content_tab {
			flex: 1;
			overflow: auto;
		}
	}
</style>