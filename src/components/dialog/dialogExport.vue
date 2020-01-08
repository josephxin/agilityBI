<template>
	<el-dialog title="导出设置" :visible.sync="$root.dialogExportSet" class="dialogExportSet">
		<div class="el-dialog-content">
			<!--<div class="selectReportPeriod clearfix">
					<span class="fl">选择报告周期</span>
					<el-radio-group v-model="reportPeriod" class="fl">
						<el-radio :label="item.label" v-for="(item, index) in reportPeriodList" :key="index">{{item.label}}</el-radio>
					</el-radio-group>
				</div>-->
			<div class="selectExportFormat clearfix">
				<span class="fl">选择导出格式</span>
				<el-radio-group v-model="exportFormat" class="fl">
					<el-radio :label="item.label" v-for="(item, index) in exportFormatList" :key="index">{{item.label}}</el-radio>
				</el-radio-group>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<button class="dialog-confirm" type="button" :disabled="$root.btnDisable" @click="exportConfirmFn(exportFormat)">确 定</button>
		</div>
	</el-dialog>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		components: {

		},
		data() {
			return {
				/*reportPeriod: '日报',
				reportPeriodList: [{
						label: '日报'
					},
					{
						label: '周报'
					},
					{
						label: '月报'
					},
					{
						label: '季报'
					},
					{
						label: '年报'
					},
				],*/
				exportFormat: 'png图片',
				exportFormatList: [{
						label: 'word文档'
					},
					{
						label: 'png图片'
					},
					{
						label: 'PDF文件'
					},
				],
			};
		},
		computed: {

		},
		watch: {
			
		},
		methods: {
			//点击导出对话框中的确定按钮
			exportConfirmFn(exportFormat) {
				this.$root.btnDisable = true
				this.$emit('confirm-export', exportFormat)
			},
		},
		mounted() {

		}
	};
</script>

<style lang="scss" rel="stylesheet/scss">
	// 导出设置
	.dialogExportSet {
		.el-dialog-content {
			padding-left: 75px;
		}
		.dialog-footer {
			text-align: center;
			padding-bottom: 10px;
		}
	}
	
	.selectReportPeriod,
	.selectExportFormat {
		line-height: 24px;
		>span {
			margin-right: 20px;
		}
	}
	
	.selectReportPeriod {
		margin-bottom: 40px;
	}
</style>