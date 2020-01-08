<template>
	<div class="mapr_content">
		<div class="from">
			<p class="mapr_name">
				<label class="mapr_name_common">
					数据连接名称
				</label>
				<input type="text" />
			</p>
			<div class="mapr_two">
				<p class="mapr_name mapr_padd">
					<label class="mapr_name_common">
						数据库类型
					</label>
					<input type="text" />
				</p>
				<p class="mapr_name">
					<label class="mapr_name_common mapr_width">
						驱动
					</label>
					<input type="text" />
				</p>
			</div>
			<div class="mapr_two">
				<p class="mapr_name mapr_padd">
					<label class="mapr_name_common">
						用户名
					</label>
					<input type="text" />
				</p>
				<p class="mapr_name">
					<label class="mapr_name_common mapr_width">
						密码
					</label>
					<input type="text" />
				</p>
			</div>
			<div class="mapr_two">
				<p class="mapr_name mapr_padd">
					<label class="mapr_name_common">
						端口号
					</label>
					<input type="text" />
				</p>
				<p class="mapr_name">
					<label class="mapr_name_common mapr_width">
						数据库名称
					</label>
					<input type="text" />
				</p>
			</div>
			<p class="mapr_name">
				<label class="mapr_name_common">
					数据库字符集
				</label>
				<input type="text" />
			</p>
			<div class="mapr_two">
				<p class="mapr_name mapr_padd">
					<label class="mapr_name_common">
						最大连接数
					</label>
					<input type="text" />
				</p>
				<p class="mapr_name"></p>
			</div>
		</div>
		<!--<div class="option">
			<button class="test">测试连接</button>
			<button class="next">下一步</button>
		</div>-->
	</div>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {

		},
		created() {
			
		},
		mounted() {

		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.mapr_content{
		width:100%;
		height:100%;
		.from{
			width: 919px;
			padding-top: 152px;
			margin: auto;
			.mapr_name{
				flex: 1;
				display: flex;
				justify-content: space-between;
				height: 26px;
				line-height: 26px;
				margin-bottom: 30px;
				.mapr_name_common{
					width: 99px;
					text-align: left;
					font-size:14px;
					color:$search-input-color;
				}
				input{
					flex: 1;
					height: 24px;
					font-size: 14px;
					background: #f2f4f5;
					color: rgba(119, 119, 119, 0.75);
					border:1px solid  #e6e6e6;
					border-radius:2px;
					padding-left: 10px;
				}
			}
			.mapr_two{
				display: flex;
				justify-content:space-between;
				.mapr_padd{
					padding-right: 95px;
				}
				.mapr_width{
					width: 84px;
				}
			}
		}
		.option{
			margin-top: 46px;
			text-align: center;
			button{
				width: 100px;
				height: 32px;
				line-height: 32px;
				font-size: 16px;
				border-radius: 20px;
				text-align: center;
			}
			.test{
				margin-right: 60px;
				color:#FFFFFF;
			}
			.next{
				color:#4a6c98;
			}
		}
	}
	
	
	.theme-red{
		
	}
	.theme-blue{
		.test{
				background: url(../../assets/imgs/blue/test_blue.png);
				background-size:100% 100% ;
		}
		.next{
				background: url(../../assets/imgs/blue/next_blue.png);
				background-size:100% 100% ;
		}
	}
	.theme-green{
		
	}
</style>