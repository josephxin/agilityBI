<template>
	<div class="my_dynamic">
		<div class="my_dynamic_header">
			<h2>{{title}}</h2>
			<span>
				<router-link  :to="goto">查看更多>></router-link>
				<!--<router-link v-if="title == '我的收藏'" to="collect">查看更多>></router-link>
				<router-link v-if="title == '我的报告'" to="myReport">查看更多>></router-link>-->
			</span>
		</div>
		<div>
			<ul class="my_dynamic_content">
				<li v-for="(item,i) in list">
					<div class="mdc_container">
						<img :src="item.src" alt="" />
						<p>{{item.name}}</p>
						<div class="mdc_data">
							<span>创建时间：<em class="mdc_data_date">{{item.year}}</em><em>{{item.time}}</em></span>
							<span><i class="el-icon-download mdc_data_date"></i>{{item.download}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title:[String,Array],
			goto:[String]
		},
		data() {
			return {
				list:[{
					name:"2018年一月份银行新增客户画像报告",
					year:"2018-02-01",
					time:"12:12:12",
					download:"2600",
					src: require('../../assets/imgs/sousuo.png')
				},{
					name:"2018年一月份银行新增客户画像报告",
					year:"2018-02-01",
					time:"12:12:12",
					download:"2600",
					src: require('../../assets/imgs/sousuo.png')
					
				},{
					name:"2018年一月份银行新增客户画像报告",
					year:"2018-02-01",
					time:"12:12:12",
					download:"2600",
					src: require('../../assets/imgs/sousuo.png')
					
				},{
					name:"2018年一月份银行新增客户画像报告",
					year:"2018-02-01",
					time:"12:12:12",
					download:"2600",
					src: require('../../assets/imgs/sousuo.png')
					
				}]
			}
		},
		methods: {

		},
		computed: {
		},
		watch: {
		},
		created(){
		},
		mounted() {
			
		}
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.my_dynamic{
		height: 389px;
		.my_dynamic_header{
			display: flex;
			height: 79px;
			line-height: 79px;
			justify-content: space-between;
			h2{
				font-size: 20px;
				font-weight: bold;
				color:#333333;
			}
			span{
				>a{
					text-decoration:underline;
					color:$red-color;
				}
			}
		}
		.my_dynamic_content{
			display: flex;
			align-items: flex-start;
			justify-content:space-between;
			>li{
				width:23%;
				height: 290px;
				background: #fff;
				border-radius: 10px;
				box-sizing: border-box;
				cursor: pointer;
				.mdc_container{
					padding: 15px;
					height: 100%;
					widows: 100%;
					box-sizing: border-box;
					img{
						height: 205px;
						width: 100%;
					}
					p{
						font-size:16px;
						font-weight: bold;
						line-height: 1;
						color: #37261f;
						margin-top:15px;
						margin-bottom: 12px;
					}
					.mdc_data{
						display: flex;
						justify-content: space-between;
						line-height: 1;
						color: #999;
						font-size: 12px;
						.mdc_data_date{
							margin-right: 5px;
						}
					}
				}
			}
			
		}
	}
</style>