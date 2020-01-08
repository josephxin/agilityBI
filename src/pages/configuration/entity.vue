<template>
	<div class="entity">
		<left-bar>
			<entity-left></entity-left>
		</left-bar>
		<right-content>
			<entity-content></entity-content>
		</right-content>
	</div>
</template>

<script>
	import leftBar from 'components/leftBar'
	import rightContent from 'components/rightContent'
	import entityLeft from 'components/leftBar/entityLeft'
	import entityContent from 'components/entity/entityContent'

	export default {
		components: {
			leftBar,
			rightContent,
			entityLeft,
			entityContent
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
			//实体配置
		},
		created() {

		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	
</style>