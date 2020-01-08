<template>
	<div class="writingReport bgcolor-fa">
		<h4>文字报告</h4>
		<ol>
			<li v-for="(item, index) in writingReport" :key="index">{{item}}</li>
		</ol>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data: function() {
			return {
				writingReport: [
					'4月19日到达开封的客流中飞机前往的占比45.49%，火车占34.47%。',
					'在2016年8月旅游收到达到最高点为500123194元。1月是最低点，为3214123元。',
					'旅游客源前三名深圳，广州和大理。',
					'旅游收入占比为国内收入94.94%。',
					'旅游消费主要餐饮，酒店，古维等。',
					'旅游人数在2016年7月达到最高点，为500万人次。'
				],
			}
		},
		props: {

		},
		computed: {

		},
		watch: {

		},
		methods: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.writingReport {
		box-sizing: border-box;
		height: 100%;
		border: 1px solid #eeeeee;
		padding: 2px;
		color: #20334a;
		display: flex;
		flex-direction: column;
		h4 {
			line-height: 1;
			padding: 6px 12px 14px;
			font-size: 16px;
			font-weight: bold;
		}
		ol {
			flex: 1;
			height: 0;
			overflow: auto;
			padding: 0 12px;
			li {
				list-style: decimal;
				list-style-position: inside;
				line-height: 32px;
				font-size: 14px;
			}
		}
	}
</style>