<template>
	<div class="page-set">
		<div class="item">
			<h5>类型</h5>
			<ul>
				<li v-for="(item, index) in typeList" :key="index" :class="{'active': active==index}" @click="changeType(index)">{{item}}</li>
			</ul>
		</div>
		<div class="item">
			<h5>屏幕大小</h5>
			<div>
				<span>高度</span>
				<input type="number" name="height" v-model="screenHeight" />
			</div>
			<div>
				<span>宽度</span>
				<input type="number" name="width" v-model="screenWidth" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				typeList: ['PC端', '移动端', '大屏', '长图'],
				active: 0,
				screenHeight: 1920,
				screenWidth: 1080,
			}
		},
		props: {

		},
		computed: {

		},
		components: {

		},
		methods: {
			changeType(index){
				this.active=index
			}
		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.page-set {
		.item {
			overflow: hidden;
			>h5 {
				height: 56px;
				line-height: 56px;
				font-size: 13px;
				color: $font-green;
			}
			>ul {
				overflow: hidden;
				padding: 0 3px;
				>li {
					float: left;
					margin-bottom: 17px;
					width: 108px;
					height: 26px;
					line-height: 26px;
					border: 1px solid $li-border;
					background-color: $tab-background;
					text-align: center;
					font-size: 12px;
					color: $white;
					cursor: pointer;
					&:nth-of-type(2n) {
						float: right;
					}
					&:hover,
					&.active {
						background-color: $li-hover;
					}
				}
			}
			>div{
				margin-bottom: 22px;
				height: 28px;
				color: $white;
				>span{
					float: left;
					line-height: 28px;
					font-size: 12px;
				}
				>input{
					float: right;
					box-sizing: border-box;
					width: 206px;
					height: 28px;
					border: 1px solid $li-border;
					background-color: $tab-background;
					color: $white;
					padding-left: 10px;
					padding-right: 8px;
					font-size: 12px;
				}
			}
		}
	}
</style>