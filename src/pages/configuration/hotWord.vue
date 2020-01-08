<template>
	<div class="hotWord">
		<left-bar>
			<hot-word-left></hot-word-left>
		</left-bar>
		<right-content>
			<hot-word-content></hot-word-content>
		</right-content>
	</div>
</template>

<script>
	import leftBar from 'components/leftBar'
	import rightContent from 'components/rightContent'
	import hotWordLeft from 'components/leftBar/hotWordLeft'
	import hotWordContent from "components/hotWordContent/hotWordContent"
	
	export default {
		components: {
			leftBar, 
			rightContent,
			hotWordLeft,
			hotWordContent
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
		created() {

		},
		mounted() {}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.hotWord{
		min-height: calc(100vh - 190px);
	}

</style>