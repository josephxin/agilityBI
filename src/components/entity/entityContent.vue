<template>
	<div class="entity_right">
		<div class="entity_right_title">
			<span>{{ entityDataObj.entityName }}</span>
			<div class="add_cancel_none">
				<button class="add_none el-btn save" @click="add_preservation">保存</button>
				<button class="cance_none el-btn cancel" @click="cancel_preservation">取消</button>
			</div>
		</div>
		<div class="entity_right_jsplumb">
			<entity-js-plumb></entity-js-plumb>
			<entity-more ref="entityMore"></entity-more>
		</div>
	</div>
</template>

<script>
	import entityJsPlumb from "components/entity/entityJsPlumb"
	import entityMore from "components/entity/entityMore"
	
	export default {
		components: {
			entityJsPlumb,
			entityMore
		},
		data() {
			return {

			}
		},
		computed: {
			entityDataObj() {
				return this.$store.state.entityDataObj
			}
		},
		watch: {
			entityDataObj(newValue, oldValue) {
				//console.log(newValue)
			},
		},
		methods: {
			//增加
			add_preservation() { 
				this.$refs.entityMore.addEntity()
			},
			cancel_preservation() {
				$('.is_active').trigger('click')
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.entity_right {
		min-height: calc(100vh - 230px);
		background: #FFF;
		border-radius: 20px;
		position: relative;
		.entity_right_title {
			height: 83px;
			line-height: 83px;
			padding: 0 40px;
			span {
				font-size: 20px;
				font-weight: 700;
				color: #333333;
			}
		}
		.add_cancel_none {
			top: 0;
		}
		.entity_right_jsplumb {
			display: flex;
			justify-content: space-between;
		}
	}
</style>