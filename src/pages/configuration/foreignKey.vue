<template>
	<div class="foreign_key">
		<left-bar>
			<foreign-key-left></foreign-key-left>
		</left-bar>
		<right-content>
			<listligature></listligature>
		</right-content>
	</div>
</template>

<script>
	import leftBar from 'components/leftBar'
	import rightContent from 'components/rightContent'
	import foreignKeyLeft from "components/leftBar/foreignKeyLeft"
	import listligature from "@/components/list/listligature"
	export default {
		components: {
			foreignKeyLeft,
			leftBar, 
			rightContent,
			listligature
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
	.foreign_key{
		
	}
</style>