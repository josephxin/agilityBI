<template>
	<button type="button" class="el-btn" :class="item.className">
		<i class="iconfont" :class="item.iconName"></i>
		{{item.name}}
	</button>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			}
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			
		},
		mounted() {

		}
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.edit-data-source{
		position: absolute;
		top: 20px;
		right: 40px;
	}
</style>