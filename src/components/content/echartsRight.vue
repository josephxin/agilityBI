<template>
	<div id="content" ref="content">
		<header v-if="visibleHeader">
			<span :title="reportName">{{reportName}}</span>
			<div class="btn-wrap">
				<btn v-for="(item, index) in buttons" :key="index" :item="item" @click.native="item.fn"></btn>
			</div>
		</header>
		<div class="interspace" v-if="!visibleHeader"></div>
		<layout-type></layout-type>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import btn from '@/components/buttons/btn'
	import layoutType from '@/components/template/layoutType'

	export default {
		components: {
			btn,
			layoutType
		},
		props: {
			buttons: {
				type: Array
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(["reportName", "visibleHeader"])
		},
		watch: {
			
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	#content {
		box-sizing: border-box;
		min-height: calc(100vh - 210px);
		padding: 0 46px 40px;
		border-radius: 8px;
		background-color: white;
		>header {
			display: flex;
			height: 82px;
			>span {
				display: block;
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 82px;
				font-size: 20px;
				color: black;
				font-weight: bold;
			}
			>.btn-wrap {
				margin-top: 25px;
				>button {
					float: left;
					margin-right: 26px;
					&:last-of-type {
						margin-right: 0;
					}
				}
			}
		}
	}
	.interspace{
		height: 40px;
	}
</style>