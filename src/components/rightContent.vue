<template>
	<div class="right-content" ref="rightContent">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		props: {

		},
		computed: {
			flagLeftBar() {
				return this.$store.state.flagLeftBar
			},
			marginLeft() {
				return this.$store.state.marginLeft
			},
		},
		watch: {
			//监听左侧侧边栏的宽度变化
			flagLeftBar: {
				handler(newValue, oldValue) {
					//console.log(newValue);
					var left;
					if(newValue) {
						left = this.marginLeft
					} else {
						left = 6
					}
					this.$refs.rightContent.style.marginLeft = left + 'px'
				}
			},
		},
		methods: {
			
		},
		mounted() {
			this.$refs.rightContent.style.marginLeft = this.marginLeft + 'px'
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.right-content {
		box-sizing: border-box;
		padding: 20px;
		transition: .3s;
	}
</style>