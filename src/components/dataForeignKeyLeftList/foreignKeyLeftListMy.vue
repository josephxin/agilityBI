<template>
	<div class="foreign_list">
		<ul class="ztree_foreign root">
			<li v-for="(item,itemIndex) in foreignKeyList" :key="itemIndex" class="clearfix">
				<div class="clearfix ztree_name ztree_border root_bg" @click.stop.prevent="shut($event,'1')" :title="item.host">
					{{item.host}}服务器
					<i class="ztree_foreign_right iconfont icon-zhankai"></i>
				</div>
				<ul>
					<li v-for="(baseItem,baseIndex) in item.database" :key="baseIndex">
						<div class="clearfix ztree_name ztree_border" @click.stop.prevent="shut($event,'2')" :title="baseItem.databaseName">
							<i style="padding-left:20px;" class="fontsSize iconfont icon-shuju"></i> {{baseItem.databaseName}}
							<i class="ztree_foreign_right iconfont icon-zhankai"></i>
						</div>
						<ul>
							<li v-for="(tableItem,tableIndex) in baseItem.table" :key="tableIndex" jtk-node-type="table" class="drag-li" :data="JSON.stringify(tableItem)">
								<div class="clearfix ztree_name ztree_border" @click.stop.prevent="shut($event,'3')" :title="tableItem.tableName">
									<i style="margin-left:40px;" class="fontsSize field_set"></i> {{tableItem.tableName}}
									<i class="ztree_foreign_right iconfont icon-zhankai"></i>
								</div>
								<ul>
									<li v-for="(columnItem,columnIndex) in tableItem.column" :key="columnIndex" class="column">
										<div class="clearfix ztree_name">
											<i class="none" style="padding-left:70px;"></i> {{columnItem.columnName}}
											<i class="ztree_foreign_right iconfont" :class="[columnItem.hasIn ? 'hasIn':'',columnItem.hasOut ? 'hasOut':'']"></i>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {

		},
		props: {

		},
		data() {
			return {
				active: -1,
				root: true,
			}
		},
		computed: {
			foreignKeyList() {
				return this.$store.state.foreignKeyList
			}
		},
		watch: {},
		methods: {
			shut(e, num) {
				var el = $(e.target)
				if(el.closest('.ztree_name').next().hasClass("vo")) { //子级显示隐藏的
					el.closest('.ztree_name').next().removeClass("vo")
				} else {
					el.closest('.ztree_name').next().addClass("vo")
				}

				if(el.children('.icon-zhankai').hasClass("trans")) { //三角形旋转
					el.children('.icon-zhankai').removeClass("trans")
				} else {
					el.children('.icon-zhankai').addClass("trans")
				}

				$(".ztree_name").removeClass("active")
				if(num == "1") { //第一层
					if(el.attr("tab") == "true") {
						el.removeClass("active")
						el.removeAttr("tab")
					} else {
						el.addClass("active")
						el.attr("tab", "true")
					}
				} else if(num == "2") {
					if(el.attr("tab") == "true") {
						el.removeClass("active")
						el.removeAttr("tab")
					} else {
						el.addClass("active")
						el.attr("tab", "true")
					}
				} else if(num == "3") {
					if(el.hasClass("active")) {
						el.removeClass("active")
					} else {
						el.addClass("active")
					}
				}
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.foreign_list {
		height: 100%;
		.ztree_foreign {
			ul {
				display: none;
			}
			ul.root {
				display: block;
			}
			ul.vo {
				display: block;
			}
			li {
				/*height: 50px;*/
				height: 100%;
				/*max-height: 50px;*/
				overflow: hidden;
				line-height: 50px;
				font-size: 14px;
				color: #fbeeec;
				cursor: pointer;
				box-sizing: border-box;
				/*transition:max-height 1s;*/
				i.none {
					float: left;
					height: 16px;
				}
				i.field_set {
					float: left;
					margin-top: 17px;
					margin-right: 5px;
					width: 16px;
					height: 16px;
					background: url(../../assets/imgs/field-set.png) no-repeat;
					background-size: 100% 100%;
				}
				i.icon-zhankai {
					position: absolute;
					right: 20px;
					top: 0;
					transform: rotate(-90deg);
					transition: transform .3s;
				}
				i.trans {
					transform: rotate(0deg);
					transition: transform .3s;
				}
				span {
					float: left;
					width: 140px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			li.vo {
				display: block;
			}
			li.column {
				background: #c84130;
			}
			.ztree_name {
				position: relative;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				max-width: 225px;
				padding: 0 40px 0 20px;
				i.fontsSize {
					float: left;
					font-size: 22px;
				}
			}
			.ztree_name.active,
			.ztree_name:hover {
				background: $configure-list-red-5;
			}
			.root_bg,
			.root_bg:hover,
			.root_bg.active {
				background: url(../../assets/imgs/red/bg_red_bar.jpg);
			}
		}
		.hasIn {
			display: inline-block;
			position: absolute;
			right: 20px;
			top: 0;
			width: 15px;
			height: 15px;
			line-height: 50px;
			margin-top: 16px;
			background: url(../../assets/imgs/hasIn.png) no-repeat;
			background-size: 100% 100%;
		}
		.hasOut {
			display: inline-block;
			position: absolute;
			right: 20px;
			top: 0;
			width: 15px;
			height: 15px;
			line-height: 50px;
			margin-top: 16px;
			background: url(../../assets/imgs/hasOut.png) no-repeat;
			background-size: 100% 100%;
		}
		.ztree_foreign_right {
			float: right;
		}
		.ztree_foreign_left {
			float: left;
		}
	}
	
	.theme-blue {
		.foreign_list {
			.ztree_foreign {
				.root_bg,
				.root_bg:hover,
				.root_bg.active {
					background: $configure-list-5;
				}
				li.column {
					background: $configure-list-3;
				}
				.ztree_border {
					border-bottom-color: transparent;
				}
				.ztree_name.active,
				.ztree_name:hover {
					background: $configure-list-5;
				}
			}
		}
	}
	
	.theme-green {
		.foreign_list {
			.ztree_foreign {
				.root_bg,
				.root_bg:hover,
				.root_bg.active {
					/*background:$configure-list-green;*/
					background: url(../../assets/imgs/green/bg_green_bar.jpg);
				}
				li.column {
					background: $configure-list-green-3;
				}
				.ztree_border {
					border-bottom-color: transparent;
				}
				.ztree_name.active,
				.ztree_name:hover {
					background: $configure-list-green;
				}
			}
		}
	}
</style>