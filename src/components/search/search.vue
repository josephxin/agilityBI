<template>
	<div class="search">
		<div class="search-content">
			<div class="search-content-top">
				<div class="main_seek">
					<input type="text" placeholder="请输入需要查询的内容" v-model.trim="$root.search" @keyup.enter="getSearchResult" />
					<span class="main_seek_btn" @click="getSearchResult">搜索一下</span>
				</div>
			</div>
			<div class="search-content-bottom">
				<ul class="main_word fl">
					<li class="main_word_hot">热词：</li>
					<li v-for="(item, index) in topSearch" :key="index">
						<a :title="item" class="transition" :class="{'main_word_warg': topActive==index}" @click="getHotSearchResult(item, index)">{{item}}</a>
					</li>
				</ul>
				<div class="main_quiz fr">
					<!--<router-link to="/" title="如何搜索?">如何搜索?</router-link>-->
					<router-link :to="{name:'mySeek'}" title="历史提过的问题">历史提过的问题</router-link>
				</div>
			</div>
			<div class="main_me" v-if='visibleSeekBtn'>
				<el-checkbox ref="checkboxs" v-model="checked" class="main_me_check">本页搜索</el-checkbox>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'
	import { handleEchartsData } from './js/echartsData.js'
	import { queryResult, getHotWords ,reportSearchHistorySave} from "@/api/index.js"

	export default {
		name: "search",
		components: {},
		data() {
			return {
				topActive: -1,
				topSearch: [],
				checked: false,
			}
		},
		computed: {
			//1列表选中项状态管理
			//2头部是否显示本页搜索
			...mapState(['listState', 'visibleSeekBtn']),
		},
		watch: {
			//监听列表选中项状态
			listState: {
				handler(newValue, oldValue) {
					this.topActive = -1
				}
			},
		},
		methods: {
			//输入框的事件
			getSearchResult() {
				if(this.checked) { //点击了本页搜索
					this.$store.commit('changeCurrPageSearch', this.$root.search)
					if(this.$root.search=='') {
						BIMsg({
							message: "重置成功！",
							type: 'info'
						})
					}
				} else {
					if(this.$root.search) {
						// 调接口，返回问题所匹配的图表，成功后把搜索内容存在缓存和vuex中
						this.$store.commit('changeListState')
						this.getAjax(this.$root.search)
					} else {
						BIMsg({
							message: "输入框内容不能为空！",
							type: 'info'
						})
					}
				}
			},
			//热词的点击事件
			getHotSearchResult(hotSearchContent, index) {
				//console.log(hotSearchContent, index)
				this.$store.commit('changeListState')
				setTimeout(() => {
					this.topActive = index
				}, 0)
				this.getAjax(hotSearchContent)
			},
			//获取数据
			getAjax(name, flag, index) {
				this.$store.commit('changeMySeekSwitch', false)    
				queryResult({
						"userId": this.$root.userId,
						"queryContent": name,
					})
					.then(data => {
						//console.log('获取问题详情原始数据', data)

						if(data.message == "success") {
							//处理数据
							/*第二个元素的取值： { "1":"面状地图", "2":"点状地图", "3":"热力图地图", "4":"横向堆积柱状图", "5":"竖向堆积柱状图", "6":"横向柱状图", "7":"竖向柱状图", "8":"横向百分比堆积柱状图", "9":"竖向百分比堆积柱状图", "10":"横向簇状柱状图", "11":"竖向簇状柱状图", "12":"瀑布图", "13":"漏斗图", "14":"折线图", "15":"普通面积图", "16":"堆积面积图", "17":"折线柱状混合图", "18":"河流图", "19":"饼状图", "20":"环形图", "21":"定角南丁格尔图", "22":"不定角南丁格尔图", "23":"散点图", "24":"关系图", "25":"箱形树状图", "26":"条形树状图", "27":"桑基图", "28":"旭日图", "29":"多行卡片图", "30":"标准卡片图", "31":"面状雷达图", "32":"线状雷达图" }*/
							var dataModule = data.data.module
							var echartsData = handleEchartsData(dataModule, this)
							//console.log("处理后的图表数组", echartsData)

							//解决跳转时数据获取不到的问题
							if(echartsData.length > 0) {
								echartsData = echartsData.splice(0, 6)
								this.$root.search = name
								this.$store.commit('changeReportName', name) //搜索的名字
								this.$store.commit('changeEchartsData', echartsData) //搜索回的数据
								this.$store.commit('changeCurrFolderId', 0) //调潍坊的接口，当前目录id变为0
								if(!flag) {
									this.$router.push({
										name: "chart",
										params: {
											id: '0'
										}
									});	
									setTimeout(()=>{
										// 为了记录本人的搜索历史
										this.$store.commit('changeMySeekSwitch', true)
									},0)
									//显示收藏按钮
									this.$store.commit('changeVisibleCollectBtn')
								}
								//传了第三参时，改变左侧报告列表的下标
								if(index) {
									this.$store.commit('changeReportActive', index)
								}
							} else {
								BIMsg({
									message: "此问题暂无数据",
								})
							}
						} else {
							if(flag) {
								this.$store.commit('changeEchartsData', []) //搜索回的数据
							}
							BIMsg({
								message: data.message,
							})
						}
					})
			},
		},
		created() {
			// 获取查询的热词
			getHotWords({})
				.then(data => {
					//console.log('获取查询的热词', data)
					if(data.message == 'success') {
						if(data.data.hotwords && data.data.hotwords.length > 0) {
							this.topSearch = data.data.hotwords
						} else {
							BIMsg({
								message: "暂无数据！",
								type: 'info'
							})
						}
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		mounted() {

		}
	};
</script>
<style scoped lang="scss" rel="stylesheet/scss">
	.search {
		background: url(../../assets/imgs/common/bg_search.jpg) no-repeat;
		background-size: 100% 100%;
		.search-content {
			margin: 0 auto;
			width: 888px;
			position: relative;
		}
	}
	
	.search-content-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 40px;
		padding-top: 29px;
		.main_seek {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: row;
			input {
				flex: 1;
				height: 40px;
				line-height: 40px;
				box-sizing: border-box;
				box-shadow: none;
				border: none;
				border: 1px solid $search-input-border;
				border-radius: 20px;
				padding-left: 22px;
				background-color: $search-input-bgcolor;
				color: $search-input-color;
				font-size: 16px;
				padding-right: 150px;
			}
			input:focus {
				outline: 0 !important;
			}
			.main_seek_btn {
				position: absolute;
				background: url("../../assets/imgs/blue/pageseek2.png");
				width: 142px;
				height: 40px;
				top: 0;
				right: 0;
				border-radius: 20px;
				font-size: 16px;
				line-height: 40px;
				text-align: center;
				color: $search-input-btn;
				cursor: pointer;
				user-select: none;
				&:hover {
					opacity: 0.8;
				}
			}
		}
	}
	
	.search-content-bottom {
		height: 47px;
		line-height: 47px;
		padding-bottom: 4px;
		.main_word {
			display: flex;
			width: 770px;
			overflow: auto;
			white-space: nowrap;
			li {
				margin-left: 35px;
				color: $search-hot-li;
				font-size: 12px;
				a {
					text-decoration: underline;
					font-size: 12px;
					color: $search-input-color;
				}
				a.main_word_warg {
					color: $search-blue;
				}
				a:hover {
					color: $search-blue
				}
			}
			.main_word_hot {
				margin-left: 0px;
			}
		}
		.main_quiz {
			a {
				text-decoration: underline;
				color: $search-blue;
				font-size: 14px;
				padding-right: 35px;
				&:last-of-type {
					padding-right: 0;
				}
			}
		}
	}
	
	.main_me {
		position: absolute;
		right: -111px;
		top: 38px;
		margin-left: 31px;
	}
	
	.theme-blue {
		.main_seek {
			input {
				border: 1px solid $search-input-border;
				background-color: $search-input-bgcolor;
				color: $search-input-color;
			}
			.main_seek_btn {
				background: url("../../assets/imgs/blue/pageseek2.png");
			}
		}
	}
	
	.theme-green {
		.main_seek {
			input {
				border: 1px solid $search-input-border-blue;
				background-color: $search-input-bgcolor-blue;
			}
			.main_seek_btn {
				background: url("../../assets/imgs/green/pageseek_green.png");
				width: 98px;
				border-radius: 0px 20px 20px 0px;
				/*background: #fac009;
				border:1px solid #e49804;*/
				color: #FFF;
				/*height: 36px;*/
			}
		}
		.main_quiz {
			a {
				color: $green-color;
			}
		}
		.main_word {
			li {
				a.main_word_warg {
					color: $green-color;
				}
				a:hover {
					color: $green-color;
				}
			}
			.main_word_hot {
				margin-left: 0px;
			}
		}
	}
	
	.theme-red {
		.main_seek {
			input {
				border: 1px solid $search-input-border-red;
				background-color: $search-input-bgcolor-red;
			}
			.main_seek_btn {
				width: 98px;
				border-radius: 0px 20px 20px 0px;
				background: url("../../assets/imgs/red/pageseek_red.png");
				/*background: #f45936;*/
				color: #FFF;
				/*border:1px solid #ca2a16;
				height: 36px;*/
			}
		}
		.main_quiz {
			a {
				color: $red-color;
			}
		}
		.main_word {
			li {
				a.main_word_warg {
					color: $red-color;
				}
				a:hover {
					color: $red-color;
				}
			}
			.main_word_hot {
				margin-left: 0px;
			}
		}
	}
</style>