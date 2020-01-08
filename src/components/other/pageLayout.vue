<template>
	<div class="page-layout">
		<div class="item" v-for="(item, index) in items" :key="index" :class="{'active': active==index}" @click="changeLayout(index)">
			<div>
				<div>
					<div v-for="(obj, i) in item.first" :key="i"></div>
				</div>
				<div>
					<div v-for="(obj, i) in item.second" :key="i"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				items: [
					{
						first: [1],
						second: [1],
					},
					{
						first: [1, 2],
						second: [1],
					},
					{
						first: [1, 2],
						second: [1, 2],
					},
					{
						first: [1],
						second: [1, 2],
					},
				],
				active: 0,
			}
		},
		props: {
			
		},
		computed: {

		},
		components: {
			
		},
		methods: {
			changeLayout(index){
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
	.page-layout {
		padding-top: 8px;
	}
	.item {
		margin-bottom: 20px;
		box-sizing: border-box;
		width: 244px;
		height: 140px;
		border: 6px solid white;
		background-color: $canvas-background-light;
		cursor: pointer;
		&:last-of-type {
			margin-bottom: 0;
		}
		&:hover, &.active {
			border: 6px solid $tab-border-bottom;
		}
		>div{
			margin-top: 12px;
			margin-left: 49px;
			width: 133px;
			height: 104px;
			>div{
				display: flex;
				margin-bottom: 4px;
				height: 50px;
				&:last-of-type{
					margin-bottom: 0;
				}
				>div{
					flex: 1;
					margin-right: 7px;
					border: 1px solid $div-border;
					background-color: white;
					&:last-of-type {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>