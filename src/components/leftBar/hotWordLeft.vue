<template>
	<div class="hot_word_left">
		<happy-scroll>
			<div class="hwl_item">
				<div class="hwl_title">
					<img class="" src="../../assets/imgs/hot-word.png" />
					<p>热词配置类表</p>
				</div>
			</div>
			
			<hot-foreign-key class="hwl_content"></hot-foreign-key>
			
			<collapse-entity :list="list" pageType="hotword" @event-click-entity="getHotWord"></collapse-entity>
		</happy-scroll>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import hotForeignKey from "@/components/hotWordContent/hotForeignKey"
	import collapseEntity from "@/components/collapse/collapseEntity"
	import { getDataForeignKey, getDataEntity } from "@/api/index.js";
	
	export default {
		components: {
			hotForeignKey,
			collapseEntity,
		},
		data() {
			return {
				list: [],
			}
		},
		computed: {
			
		},
		watch: {

		},
		methods: {
			getHotWord(data) {
				//console.log(data)
				this.$store.commit("changeHotWordEntityActive", data.index)
				this.$store.commit("changeHotWordTableActive", -1)
				this.$store.commit("changeHotWord", data.item)
			},
			//这里获取数据传入子级 渲染左侧菜单
			getForeignKeyAjax() {
				getDataForeignKey({ //获取数据库表结构和外键接口
					userId:this.$root.userId,
				}).then(data => {
					//console.log("获取到的表",data)
					if(data.message == "success") {
						this.$store.commit("changeForeignKeyList", data.data)
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getDataEntityAjax() { //获取实体接口
				getDataEntity({
					userId:this.$root.userId,
				}).then(data => {
					//console.log(data)
					if(data.message == "success") {
						this.list = data.data
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		created() {

		},
		mounted() {
			this.getForeignKeyAjax()
			this.getDataEntityAjax()
			
			// 重置当前实体下标为-1，不选中实体
			this.$store.commit("changeHotWordEntityActive", -1)
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.hot_word_left {
		height: 100%;
		.hwl_title {
			height: 111px;
			text-align: center;
			img {
				margin-top: 32px;
			}
			p {
				color: white;
				font-size: 14px;
				line-height: 24px;
			}
		}
		.hwl_content {
			margin-top: 6px;
		}
	}
	
	.theme-blue {
		.hot_word_left {
			padding: 6px;
			.hwl_title {
				background: url(../../assets/imgs/blue/bg_term.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-red {
		.hot_word_left {
			.hwl_title {
				background: url(../../assets/imgs/bg_red.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-green {
		.hot_word_left {
			.hwl_title {
				background: url(../../assets/imgs/bg_green.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>