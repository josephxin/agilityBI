<template>
	<div class="chart-list">
		<div v-for="(item, index) in templateList" :key="index" @click="selectTemplate(item.type, item.idx, index)">
			<img class="template" :src="item.src" v-show="templateActive!=index" />
			<img class="template-selected" :src="item.srcSelected" v-show="templateActive==index" />
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				templateList: [{
						src: require('../../assets/imgs/common/template7.png'),
						srcSelected: require('../../assets/imgs/common/template7-selected.png'),
						type: 'six-left',
						idx: 5
					},
					{
						src: require('../../assets/imgs/common/template8.png'),
						srcSelected: require('../../assets/imgs/common/template8-selected.png'),
						type: 'six-right',
						idx: 5
					},
					{
						src: require('../../assets/imgs/common/template6.png'),
						srcSelected: require('../../assets/imgs/common/template6-selected.png'),
						type: 'five',
						idx: 4
					},
					{
						src: require('../../assets/imgs/common/template5.png'),
						srcSelected: require('../../assets/imgs/common/template5-selected.png'),
						type: 'four',
						idx: 3
					},
					{
						src: require('../../assets/imgs/common/template3.png'),
						srcSelected: require('../../assets/imgs/common/template3-selected.png'),
						type: 'three-left',
						idx: 2
					},
					{
						src: require('../../assets/imgs/common/template4.png'),
						srcSelected: require('../../assets/imgs/common/template4-selected.png'),
						type: 'three-right',
						idx: 2
					},
					{
						src: require('../../assets/imgs/common/template1.png'),
						srcSelected: require('../../assets/imgs/common/template1-selected.png'),
						type: 'two-v',
						idx: 1
					},
					{
						src: require('../../assets/imgs/common/template2.png'),
						srcSelected: require('../../assets/imgs/common/template2-selected.png'),
						type: 'two-h',
						idx: 1
					},
				],
			}
		},
		computed: {
			templateActive() {
				return this.$store.state.templateActive
			},
			chartArr() {
				return this.$store.state.chartArr
			},
		},
		watch: {

		},
		methods: {
			selectTemplate(type, idx, index) {
				//console.log(type, idx, index)
				// 当前模板如果和右侧图表的个数不匹配，则切换不了并且显示提示框
				if(this.chartArr.length == idx) {
					this.$store.commit('changeTemplateActive', index)
					this.$store.commit('changeLayoutType', type)
				} else {
					this.$message({
						type: 'error',
						duration: 1000,
						message: '布局类型切换失败，与当前图表数量不匹配！'
					});
				}
			}
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.chart-list {
		>div {
			cursor: pointer;
			&+div {
				margin-top: 20px !important;
			}
			&:hover {
				.template {
					display: none !important;
				}
				.template-selected {
					display: block !important;
				}
			}
		}
	}
	
	.theme-blue {
		.chart-list {
			min-height: calc(100vh - 306px);
		}
	}
</style>