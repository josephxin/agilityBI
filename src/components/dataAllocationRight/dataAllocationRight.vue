<template>
	<div class="data-allocation-right">
		<transition name="fade2" mode="out-in">
			<component :is="dataMatch.tag" ref="mydata"></component>
		</transition>

		<div>
			<div class="option">
				<button class="test el-btn save" :plain="true" @click="open">测试连接</button>
				<button class="next el-btn cancel" @click="addMatch" :disabled="disState">保存</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import mysql from '@/components/dataAllocationRight/mysqlData'
	import mapr from '@/components/dataAllocationRight/maprData'
	import execl from '@/components/dataAllocationRight/execlFile'
	import web from '@/components/dataAllocationRight/webData'
	//	import {BIMsg} from '../../assets/js/tools.js'
	//	import {postDataAllocationRight,getDataAllocationRight} from "@/api/index.js"
	
	export default {
		components: {
			mysql,
			mapr,
			execl,
			web
		},
		data() {
			return {
				disState: true, //按钮无法点击
				databaseId: '',// 数据库id，子组件需要用
			}
		},
		props: {
			
		},
		computed: {
			...mapState(["dataMatch"]),
		},
		methods: {
			open() {
				this.$refs.mydata.$emit('mysqldata', 'ruleForm');
			},
			addMatch() {
				this.$refs.mydata.$emit('mysqldataAdd');
			}
		},
		watch: {
			dataMatch: {
				handler(newValue, oldValue) {
					if(newValue) {
						this.disState = true;
					}
				},
				deep: true
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.data-allocation-right {
		background: $white;
		border-radius: 10px;
		min-height: calc(100vh - 230px);
		.option {
			margin-top: 46px;
			text-align: center;
			padding-bottom: 46px;
			button {
				&[disabled] {
					cursor: not-allowed;
					opacity: .5;
				}
			}
			.test {
				margin-right: 60px;
				color: #FFFFFF;
			}
			.option_link {
				text-decoration: underline;
				margin-left: 20px;
			}
		}
	}
	
	.theme-red {
		.option_link {
			color: $red-color;
		}
	}
	
	.theme-blue {
		.option_link {
			color: $blue-color;
		}
	}
	
	.theme-green {
		.option_link {
			color: $green-color;
		}
	}
</style>