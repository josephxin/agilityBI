<template>
	<div class="help">
		<div class="placeholder">
			正在开发中，敬请期待...
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			
			};
		},
		methods: {
			 
		}
	};
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.help {
		position: relative;
		height: calc(100vh - 170px);
		.placeholder {
			position: absolute;
			width: 500px;
			height: 100px;
			font-size: 40px;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			color: #CCCCCC;
		}
	}
	
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
	
	.el-tag-input {
		min-width: 20px;
		background-color: transparent;
	}
	
	.box {
		width: 200px;
		height: 200px;
		background-color: red;
	}
</style>