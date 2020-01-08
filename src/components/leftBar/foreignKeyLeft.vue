<template>
	<div class="foreign_key_left">
		<happy-scroll>
			<div class="fkl_item">
				<div class="fkl_title">
					<img class="" src="../../assets/imgs/data_foreign.png" />
					<p>数据库外键设置</p>
				</div>
			</div>
			<div class="fkl_content">
				<foreign-key-left-list></foreign-key-left-list>
			</div>
		</happy-scroll>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import foreignKeyLeftList from "@/components/dataForeignKeyLeftList/foreignKeyLeftList"
	import { getDataForeignKey } from "@/api/index.js";

	export default {
		components: {
			foreignKeyLeftList
		},
		data() {
			return {
				dataList: [],
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			//这里获取数据传入子级 渲染左侧菜单
			//
			getForeignKeyAjax() {
				getDataForeignKey({ //获取数据库表结构和外键接口
					userId: this.$root.userId,
				}).then(data => {
					//console.log("左侧表的数据",data)
					if(data.message == "success") {
						this.$store.commit("changeForeignKeyList", data.data)
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
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.foreign_key_left {
		height: 100%;
		.fkl_title {
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
	}
	
	.theme-blue {
		.foreign_key_left {
			padding: 6px;
			.fkl_title {
				background: url(../../assets/imgs/blue/report_title.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.fkl_content {
			margin-top: 7px;
			border-radius: 13px;
		}
	}
	
	.theme-red {
		.foreign_key_left {
			.fkl_title {
				background: url(../../assets/imgs/bg_red.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	
	.theme-green {
		.foreign_key_left {
			.fkl_title {
				background: url(../../assets/imgs/bg_green.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>