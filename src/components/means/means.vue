<template>
	<div class="main_sp">
		<h2 class="clearfloat clearfix">
			<b>{{moduleName}}</b>
  			<span @click="changeList(moduleName)"><i class="iconfont icon-huanyihuan"></i><label class="transition">换一批</label></span>
  		</h2>
		<div class="main_sp_rank">
			<span>排名</span>
			<span>{{frequency}}</span>
		</div>
		<ul>
			<li v-for="(item, index) in items" :key="index">
				<a :title="item.queryContent" class="transition" :class="{'active': rightActive==index}" @click="getResult(item.queryContent, index)">{{item.queryContent}}</a>
				<span>{{item.count}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { getHotQueries, getCollect } from "@/api/index.js"

	export default {
		name: "means",
		props: {
			moduleName: String,
			frequency:String
		},
		data() {
			return {
				rightActive: -1,
				items: [],
				HotspotPage: 1,
				CollectPage: 1
			}
		},
		computed: {
			...mapState(['listState']),
		},
		watch: {
			//监听列表选中项状态
			listState: {
				handler(newValue, oldValue) {
					this.rightActive = -1
				}
			}
		},
		methods: {
			// 点击换一换按钮
			changeList(name) {
				//请求接口
				if(name == '热搜') {
					if(this.items.length < 5) {
						if(this.HotspotPage == 1) {
							return;
						} else {
							this.HotspotPage = 1
						}
					} else {
						this.HotspotPage++;
					}
					this.getAjax()
				} else if(name == "收藏") {
					if(this.items.length < 5) {
						if(this.CollectPage == 1) {
							return;
						} else {
							this.CollectPage = 1
						}
					} else {
						this.CollectPage++;
					}
					this.getAjax()
				}
			},
			// 点击热搜或者收藏中的报告，获取数据并且跳到图表页
			getResult(searchContent, index) {
				//console.log(searchContent);
				this.$store.commit('changeListState')
				setTimeout(() => {
					this.rightActive = index
				}, 0)
				this.$parent.$parent.$refs.search.getAjax(searchContent)
			},
			// 换一换,请求接口
			getAjax() {
				if(this.moduleName == "热搜") {
					getHotQueries({
							pageLineCount: 5, //每页的条数
							page: this.HotspotPage, //页码
						})
						.then(data => {
							//console.log("热搜", data)
							if(data.message == 'success') {
								this.items = data.data.list;
								if(this.items.length==0){
									if(this.HotspotPage==1){
										return;
									}
									this.HotspotPage=1
									this.getAjax()
								}
							}
						})
						.catch(err => {
							console.log(err)
						})
				} else if(this.moduleName == "收藏") {
					getCollect({
							page: this.CollectPage,
							size: 5
						})
						.then(data => {
							//console.log("收藏", data)
							//当返回数据为空时，跳回第一页
							if(data.code == 200) {
								//还要转
								var list = data.data.list
								if(list.length==0){
									if(this.CollectPage==1){
										this.items = []
										return;
									}
									this.CollectPage=1
									this.getAjax()
								}else{
									var arr=[]
									for(let i = 0; i < list.length; i++) {
										var obj = {
											"queryContent": list[i].reportName,
											"id": list[i].id,
											"count": list[i].storeCount
										}
										arr.push(obj)
									}
									this.items=arr
								}
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			}
		},
		created() {
			//请求接口
			this.getAjax()
		},
		mounted() {

		}
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.main_sp {
		width: 472px;
		height: 327px;
		border-bottom: 1px solid #c8ced3;
		&:last-of-type {
			border-bottom: none;
		}
		h2 {
			position: relative;
			height: 80px;
			font-weight: 700;
			line-height: 80px;
			font-size: 20px;
			color: #333333;
			span {
				float: right;
				cursor: pointer;
				font-size: 14px;
				color: #7b828d;
				label {
					font-weight: normal;
					font-stretch: normal;
					font-size: 14px;
					line-height: 47px;
					letter-spacing: 0px;
					cursor: pointer;
					color: rgba(32, 51, 74, 0.7)
				}
				i {
					vertical-align: middle;
					margin-right: 4px;
					font-size: 20px;
					color: $home-change-color;
				}
			}
			span:hover {
				label {
					color: $home-change-color;
				}
			}
		}
		.main_sp_rank {
			display: flex;
			justify-content: space-between;
			-webkit-justify-content: space-between;
			width: 100%;
			height: 25px;
			text-align: top;
			color: #89939f;
			span {
				font-size: 16px;
				color: #89939f;
			}
		}
		ul {
			padding-bottom: 15px;
			li {
				display: flex;
				width: 100%;
				height: 41px;
				justify-content: space-between;
				-webkit-justify-content: space-between;
				line-height: 41px;
				font-size: 16px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				a {
					font-size: 16px;
					max-width: 400px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				span {
					font-size: 16px;
					color: #919191;
				}
				a:hover,
				a.active {
					text-decoration: underline;
					cursor: pointer;
					color: $whole-hover-color;
				}
			}
			li:nth-child(1) {
				span {
					color: #fb3c32;
				}
			}
			li:nth-child(2) {
				span {
					color: #ff6e17;
				}
			}
			li:nth-child(3) {
				span {
					color: #ffa200;
				}
			}
		}
	}
	/*dd2911
	 * #00a949
	 * */
	
	.theme-red {
		h2 {
			color: #333333;
			span {
				color: #dd2911;
				label {
					color: rgba(32, 51, 74, 0.7)
				}
				i {
					color: #dd2911;
				}
			}
			span:hover {
				label {
					color: #dd2911;
				}
			}
		}
		ul {
			li {
				a:hover,
				a.active {
					color: #dd2911;
				}
			}
		}
	}
	
	.theme-blue {
		h2 {
			color: #333333;
			span {
				color: #7b828d;
				label {
					color: rgba(32, 51, 74, 0.7)
				}
				i {
					color: #2c74ca;
				}
			}
			span:hover {
				label {
					color: $home-change-color;
				}
			}
		}
		ul {
			li {
				a {
					color: #20334a;
				}
				span {
					color: #919191;
				}
				a:hover,
				a.active {
					color: $whole-hover-color;
				}
			}
		}
	}
	
	.theme-green {
		h2 {
			color: #333333;
			span {
				color: #00a949;
				label {
					color: rgba(32, 51, 74, 0.7)
				}
				i {
					color: #00a949;
				}
			}
			span:hover {
				label {
					color: #00a949;
				}
			}
		}
		ul {
			li {
				a:hover,
				a.active {
					color: #00a949;
				}
			}
		}
	}
</style>