<template>
	<div class="produce-report-left">
		<happy-scroll>
			<div class="report-item" :class="{'open': active==index}" v-for="(item, index) in items" :key="index">
				<div class="report-title" :class="{'active': active==index}" @click="showList(index)">
					<i class="iconfont report-title-icon" :class="item.iconName"></i>
					<p>{{item.title}}</p>
					<div class="arrow" v-if="themeColor!='blue'">
						<i class="iconfont icon-zhankai" v-show="active!=index"></i>
						<i class="iconfont icon-zhankai-copy" v-show="active==index"></i>
					</div>
				</div>
				<div class="report-list">
					<div>
						<!--条件渲染-报告-->
						<div class="report-list-content" v-if="item.title=='报告'">
							<p :class="{'active': reportActive==index}" :title="item.reportName" v-for="(item, index) in reportList" :key="index" @click="showReportContent(index, item)">{{item.reportName}}</p>
						</div>

						<!--条件渲染-模板-->
						<template-type v-if="item.title=='模板'"></template-type>

						<!--条件渲染-元素-->
						<collapse-element v-if="item.title=='元素'"></collapse-element>
					</div>
				</div>
			</div>
		</happy-scroll>
	</div>
</template>

<script>
	import collapseTwo from '@/components/collapse/collapseTwo'
	import collapseElement from '@/components/collapse/collapseElement'
	import templateType from '@/components/other/templateType'
	import { mapState } from "vuex";

	export default {
		components: {
			collapseTwo, //没用到
			collapseElement,
			templateType,
		},
		data() {
			return {
				active: 0,
				items: [{
						title: '报告',
						iconName: 'icon-baogao',
					},
					{
						title: '模板',
						iconName: 'icon-moban',
					},
					{
						title: '元素',
						iconName: 'icon-yuansu',
					}
				],
				routeId: '0',
			}
		},
		computed: {
			...mapState(['themeColor', 'reportActive', 'reportList']),
		},
		watch: {

		},
		methods: {
			showList(index) {
				if(index == this.active) {
					this.active = -1
				} else {
					this.active = index
				}
				if(this.active == 2) {
					this.$store.commit('changeCanvasWrap', true)
				} else {
					this.$store.commit('changeCanvasWrap', false)
				}
			},
			//点击一条报告
			showReportContent(index, obj) {
				//console.log(obj)
				// 点击报告列表项时清空制作报告页元素数组
				this.$store.commit('changeDomList', [])
				this.routeId = this.$route.params.id
				if(this.routeId == '0' || this.routeId == '3') {
					// 调接口
					this.$parent.$parent.$parent.$refs.search.getAjax(obj.reportName, true, index)
				} else if(this.routeId == '1' || this.routeId == '2') {
					this.$store.commit('changeReportActive', index)
					this.$store.commit('changeReportId', obj.reportId)
					if(this.routeId == '1') {
						// 调接口
						this.$store.dispatch('getStoreInfo', obj.reportId)
					} else if(this.routeId == '2') {
						// 调接口
						this.$store.dispatch('getReportInfo', obj.reportId)
						this.$store.commit('changeCurrFolderId', obj.folderId)
					}
				}
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.produce-report-left {
		height: 100%;
		.report-item {
			.report-title-icon {
				color: white;
				font-size: 18px;
			}
			.report-list {
				width: 100%;
				max-height: 0;
				transition: all .3s;
				overflow: hidden;
				user-select: none;
				.report-list-content {
					padding: 10px 0;
					>p {
						height: 49px;
						line-height: 49px;
						color: white;
						font-size: 14px;
						cursor: pointer;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			&.open .report-list {
				max-height: 3000px;
				transition: all .5s;
			}
		}
	}
	/*蓝色主题*/
	
	.theme-blue {
		.produce-report-left {
			box-sizing: border-box;
			padding: 6px;
			.report-item {
				margin-bottom: 11px;
				.report-title {
					width: 270px;
					height: 81px;
					text-align: center;
					cursor: pointer;
					user-select: none;
					background-image: url(../../assets/imgs/blue/report_title.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					&.active {
						background-image: url(../../assets/imgs/blue/report_title_light.png);
						background-repeat: no-repeat;
						background-size: 100% 100%;
					}
					>.report-title-icon {
						display: inline-block;
						margin-top: 21px;
						line-height: 1;
					}
					>p {
						color: white;
						font-size: 14px;
					}
				}
				.report-list {
					width: 270px;
					>div {
						margin-top: 7px;
						padding: 7px 14px;
						border-radius: 13px;
						background-image: url(../../assets/imgs/blue/bg_term_list.png);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						.report-list-content {
							>p {
								&.active,
								&:hover {
									color: #1f9eff;
								}
							}
						}
					}
				}
			}
		}
	}
	
	.theme-red,
	.theme-green {
		.produce-report-left {
			.report-item {
				.report-title {
					height: 80px;
					padding: 0 20px;
					cursor: pointer;
					user-select: none;
					>.report-title-icon {
						float: left;
						line-height: 80px;
					}
					>p {
						float: left;
						margin-left: 10px;
						line-height: 80px;
						color: white;
						font-size: 16px;
					}
					>.arrow {
						float: right;
						line-height: 79px;
						color: white;
					}
				}
				.report-list {
					.el-collapse-item__header {
						padding: 0 20px;
					}
					.el-collapse-item__wrap {
						padding: 21px 20px 19px;
					}
				}
			}
		}
	}
	/*红色主题*/
	
	.theme-red {
		.produce-report-left {
			background-color: #c6402e;
			.report-item {
				.report-title {
					background-image: url(../../assets/imgs/bg_red.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				.report-list {
					.report-list-content {
						>p {
							padding: 0 20px 1px;
							background-image: url(../../assets/imgs/red/bg_list_line.jpg);
							background-position: left bottom;
							background-repeat: no-repeat;
							background-color: #d44d3b !important;
							&.active,
							&:hover {
								background: url(../../assets/imgs/red/bg_red_bar.jpg);
							}
						}
					}
				}
			}
		}
	}
	/*绿色主题*/
	
	.theme-green {
		.produce-report-left {
			background-color: #196b3a;
			.report-item {
				.report-title {
					background-image: url(../../assets/imgs/bg_green.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
				.report-list {
					.report-list-content {
						>p {
							padding: 0 20px 1px;
							background-image: url(../../assets/imgs/green/bg_list_line.jpg);
							background-repeat: no-repeat;
							background-position: left bottom;
							background-color: #1d733f !important;
							&.active,
							&:hover {
								background-image: url(../../assets/imgs/green/bg_green_bar.jpg);
							}
						}
					}
				}
			}
		}
	}
</style>