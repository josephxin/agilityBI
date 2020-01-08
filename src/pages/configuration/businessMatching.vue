<template>
	<div class="business-matching">
		<left-bar>
			<business-template-left></business-template-left>
		</left-bar>
		<right-content>
			<business-right />
		</right-content>
	</div>
</template>

<script>
	import leftBar from '@/components/leftBar'
	import businessTemplateLeft from '@/components/leftBar/businessTemplateLeft'
	import rightContent from '@/components/rightContent'
	import businessRight from '@/components/business/businessRight'
	export default {
		components: {
			leftBar,
			businessTemplateLeft,
			rightContent,
			businessRight
		},
		data: function() {
			return {
				
			}
		},
		computed: {
			
		},
		watch: {
			
		},
		methods:{
		    
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.business-matching{
	
}
</style>