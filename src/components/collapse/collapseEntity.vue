<template>
	<el-collapse class="hot_word_entity" v-model="activeNames">
		<el-collapse-item title="实体列表" name="1">
			<ul class="elc_content">
				<li v-for="(item, index) in list" :key="index" class="transition" :class="{'is_active' : hotWordEntityActive == index}" :data-id = "item.entityId" @click="clickEntity(item, index)">
					<i class="iconfont icon-shitimoshi"></i> {{item.entityName}}
					<i class="iconfont icon-bi elc_left" @click.stop="changeName(item.entityName, index)" v-if="pageType=='entity'"></i>
					<i class="iconfont icon-unie639 elc_left" @click.stop="deleteName(item.entityId, index)" v-if="pageType=='entity'"></i>
				</li>
			</ul>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		components: {

		},
		data() {
			return {
				activeNames: ["1"],
			}
		},
		props: {
			list: {
				type: Array
			},
			pageType: {
				type: String
			}
		},
		computed: {
			...mapState(["hotWordEntityActive"]),
		},
		watch: {

		},
		methods: {
			clickEntity(item, index) {
				let data = {
					item,
					index
				}
				this.$emit('event-click-entity', data)
			},
			changeName(entityName, index){
				let data = {
					entityName,
					index
				}
				this.$emit('event-click-change', data)
			},
			deleteName(entityId, index){
				let data = {
					entityId,
					index
				}
				this.$emit('event-click-delete', data)
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.elc_content {
		>li {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			cursor: pointer;
			padding: 0 20px 1px;
			&:hover,
			&.is_active {
				.elc_left {
					display: inline-block;
				}
			}
			.iconfont {
				font-size: 14px;
				margin-right: 12px;
			}
			.elc_left {
				display: none;
				margin-left: 15px;
				margin-right: 0;
			}
		}
	}
	
	.theme-red {
		.elc_content {
			li {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
				&:hover,
				&.is_active {
					background-color: $bg-active-red;
				}
			}
		}
		
		.hot_word_entity {
			>.el-collapse-item {
				>div[role='tab'] {
					>.el-collapse-item__header {
						&.is-active {
							background: url(../../assets/imgs/red/bg_red_bar.jpg);
						}
					}
				}
			}
		}
	}
	
	.theme-green {
		.elc_content {
			li {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
				&:hover,
				&.is_active {
					background-color: $bg-active-green;
				}
			}
		}
		
		.hot_word_entity {
			>.el-collapse-item {
				>div[role='tab'] {
					>.el-collapse-item__header {
						&.is-active {
							background: url(../../assets/imgs/green/bg_green_bar.jpg);
						}
					}
				}
			}
		}
	}
</style>