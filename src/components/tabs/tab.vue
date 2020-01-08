<template>
	<div class="tab">
		<div class="tab-header">
			<div v-for="(item, index) in tabs" :key="index">
				<div :class="{'active': active==index}" @click="active=index">{{item.name}}</div>
			</div>
		</div>
		<div class="tab-content">
			<div class="tab-pane" v-for="(item, index) in tabs" :key="index" v-if="active==index">
				<component :is="item.tag" :echartsList="item.data"></component>
			</div>
		</div>
	</div>
</template>

<script>
	import collapse from '@/components/collapse/collapse'
	import pageSet from '@/components/other/pageSet'
	import pageLayout from '@/components/other/pageLayout'

	export default {
		data() {
			return {
				active: 0
			}
		},
		props: {
			tabs: {
				type: Array
			}
		},
		computed: {

		},
		components: {
			collapse,
			pageSet,
			pageLayout
		},
		methods: {

		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.tab {
		padding-bottom: 54px;
		.tab-header {
			background-color: $tab-background;
			height: 60px;
			border-bottom: 1px solid $left-bar-border-bottom;
			display: flex;
			>div {
				flex: 1;
				width: 0;
				>div {
					margin: 0 auto;
					width: 50px;
					height: 58px;
					line-height: 58px;
					text-align: center;
					border-bottom: 2px solid transparent;
					font-size: 15px;
					color: white;
					cursor: pointer;
					&.active {
						border-bottom: 2px solid $tab-border-bottom;
					}
				}
			}
		}
		.tab-content {
			border-top: 1px solid $left-bar-border-top;
			padding: 12px 20px 0;
			.tab-pane {
				color: white;
			}
		}
	}
</style>