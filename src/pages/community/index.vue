<template>
	<div class="community">
		<div class="content">
			<div class="clearfix main_sum">
				<div class="main_echarts">
					<div class="main_hed">
						<h2>推荐社区</h2>
						<btn :item="item" @click.native="item.fn"></btn>
					</div>
				</div>
			</div>
			<div class="clearfix community_wrap">
				<ul>
					<li v-for="(item, index) in dataList">
						<span class="circle">
              <i class="iconfont" :class="item.icon"></i>
            </span>
						<span class="txt">{{item.name}}</span>
						<div class="med_checkbox">
							<input type="radio" name="community-radio" class="med_real" :key="item.index" :value="item.index" v-model="selected" />
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import btn from '@/components/buttons/btn'
	import { BIMsg } from "@/assets/js/tools.js";
	import { getCommunity, saveCommunity } from "@/api/index.js"

	export default {
		components: {
			btn
		},
		data() {
			return {
				item: {
					name: '保存',
					iconName: 'icon-7',
					fn: () => {
						this.saveFn()
					}
				},
				dataList: [{
						index: "1",
						name: "工商社区",
						icon: "icon-1"
					},
					{
						index: "2",
						name: "财务社区",
						icon: "icon-qiandai"
					},
					{
						index: "3",
						name: "金融社区",
						icon: "icon-19"
					},
					{
						index: "4",
						name: "文化社区",
						icon: "icon-jiaoyupeixun"
					},
					{
						index: "5",
						name: "保险社区",
						icon: "icon-baoxianxiaoshou1"
					},
					{
						index: "6",
						name: "能源社区",
						icon: "icon-jiayouzhan"
					},
					{
						index: "7",
						name: "健康社区",
						icon: "icon-2jiankangzhishi"
					},
					{
						index: "8",
						name: "电商社区",
						icon: "icon-shangdian"
					},
					{
						index: "9",
						name: "教育社区",
						icon: "icon-jiaoyu"
					},
					{
						index: "10",
						name: "工业社区",
						icon: "icon-qiyegongchangjianzhu2"
					},
					{
						index: "11",
						name: "物流社区",
						icon: "icon-wuliu2"
					},
					{
						index: "12",
						name: "银行社区",
						icon: "icon-yinhangqia"
					},
					{
						index: "13",
						name: "农业社区",
						icon: "icon-zhiwu"
					},
					{
						index: "14",
						name: "地理社区",
						icon: "icon-diliweizhi"
					},
					{
						index: "15",
						name: "气象社区",
						icon: "icon-qixiangzhan"
					},
					{
						index: "16",
						name: "房产社区",
						icon: "icon-ai-home"
					},
					{
						index: "17",
						name: "环境社区",
						icon: "icon-huanjing"
					}
				],
				selected: '4',
			};
		},
		computed: {},
		watch: {},
		methods: {
			saveFn() {
				//console.log('保存当前社区', this.selected);
				//用户保存社区
				saveCommunity({
					'str': this.selected
				}).then(data => {
					console.log('用户保存社区', data)
					if(data.code == 200) {
						BIMsg({
							type: 'success',
							message: '社区保存成功！'
						})
					} else {
						BIMsg({
							type: 'error',
							message: '社区保存失败！'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
		},
		created() {
			//获取所有社区
			getCommunity().then(data => {
				//console.log('获取所有社区', data)
				if(data.code == 200) {
					this.dataList = data.data.communityList
					this.selected = data.data.communityType ? data.data.communityType : '4'
				} else {
					BIMsg({
						type: 'error',
						message: '获取社区失败！'
					})
				}
			}).catch(err => {
				console.log(err)
			})
		},
		mounted() {

		}
	};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.community {
		height: 100%;
		.content {
			padding-top: 12px;
			padding-bottom: 74px;
			margin: 0 50px;
			.community_wrap {
				background: #fff;
				padding: 20px;
				ul {
					li {
						position: relative;
						display: inline-block;
						margin: 30px 20px;
						width: 160px;
						border: 1px solid #f0f0f0;
						border-radius: 3px;
						.circle {
							display: block;
							width: 110px;
							height: 110px;
							border-radius: 100%;
							margin: 30px auto 0;
							background: #f45936;
							i.iconfont {
								line-height: 110px;
								font-size: 76px;
								color: #fff;
								display: block;
								margin: auto;
								text-align: center;
							}
						}
						.txt {
							display: block;
							text-align: center;
							margin: 20px 0;
						}
						.med_checkbox {
							position: absolute;
							top: 5px;
							right: 5px;
							width: 30px;
							height: 30px;
							border-radius: 50%;
							background: #ffffff;
							cursor: pointer;
							.med_real {
								width: 30px;
								height: 30px;
								background: url(../../assets/imgs/unselected.png);
								background-size: 100% 100%;
								-webkit-appearance: none;
								outline: none;
								cursor: pointer;
							}
							input[type="radio"]:checked {
								background: url(../../assets/imgs/pitch_on_blue.png);
								background-size: 100% 100%;
							}
						}
					}
					li:hover {
						border: 1px solid #ed4d2b;
						box-shadow: 0 0 20px rgba(255, 48, 0, 0.2);
					}
				}
			}
		}
		.main_sum {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
		}
		.main_echarts {
			flex: 1;
			.main_hed {
				display: flex;
				justify-content: space-between;
				h2 {
					flex: 1;
					height: 80px;
					line-height: 80px;
					font-weight: 700;
					font-size: 20px;
					color: #333333;
				}
				button {
					margin-top: 24px;
				}
			}
		}
	}
	
	.theme-red {
		.community .content .community_wrap ul li .circle {
			background: url(../../assets/imgs/sq_bg_all.png) no-repeat -228px -33px;
		}
		.community .content .community_wrap ul li:hover {
			border: 1px solid #ed4d2b;
			box-shadow: 0 0 20px rgba(255, 48, 0, 0.2);
		}
	}
	
	.theme-blue {
		.community .content .community_wrap ul li .circle {
			background: url(../../assets/imgs/sq_bg_all.png) no-repeat -448px -33px;
		}
		.community .content .community_wrap ul li:hover {
			border: 1px solid #00a8ff;
			box-shadow: 0 0 20px rgba(0, 168, 255, 0.2);
		}
	}
	
	.theme-green {
		.community .content .community_wrap ul li .circle {
			background: url(../../assets/imgs/sq_bg_all.png) no-repeat -8px -34px;
		}
		.community .content .community_wrap ul li:hover {
			border: 1px solid #41bf7a;
			box-shadow: 0 0 20px rgba(65, 191, 122, 0.2);
		}
	}
</style>