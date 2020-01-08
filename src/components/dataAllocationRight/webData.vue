<template>
	<div class="web">
		<div>
			<p class="web_link">
				<label class="web_link_name">
						网址
					</label>
				<input type="text" placeholder="https://www.baidu.com/" />
				<a href="https://www.baidu.com/" target="showHere">
					<span class="web_link_look">解析</span>
				</a>
			</p>
		</div>
		<div class="web_msg">
			<div class="web_left">
				<p class="web_site">
					<label class="web_site_name">
							文件地址
						</label>
					<input type="text" placeholder="" />
				</p>
				<p class="web_site">
					<label class="web_site_name">
							获取深度
						</label>
					<input type="text" placeholder="" />
				</p>
				<p class="web_site web_site_show">
					<label class="web_site_name">
							获取深度
						</label>
					<textarea></textarea>
				</p>
				<p class="web_site">
					<label class="web_site_name">
							更新频率
						</label>
					<input type="text" placeholder="" />
				</p>
			</div>
			<div class="web_right">
				<div class="right_img" v-show="true">
					<img src="../../assets/imgs/common/web_show.png" alt="" />
					<span>网页显示区</span>
				</div>

				<iframe id="show-iframe" name="showHere" scrolling="no" frameborder="0" style="padding: 0px; width: 100%; height: 100%;"></iframe>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				iframeState: false

			}
		},
		computed: {

		},
		methods: {

		},
		watch: {

		},
		created() {

		},
		mounted() {
			//		    const oIframe = document.getElementById('show-iframe');
			//		    const deviceWidth = document.documentElement.clientWidth;
			//		    const deviceHeight = document.documentElement.clientHeight;
			//		    oIframe.style.width = deviceWidth + 'px';
			//		    oIframe.style.height = deviceHeight + 'px';
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.web {
		min-height: 100%;
		padding-top: 51px;
		width: 1000px;
		margin: auto;
		.web_link {
			display: flex;
			justify-content: space-between;
			height: 30px;
			line-height: 30px;
			margin-bottom: 30px;
			.web_link_name {
				width: 70px;
				text-align: left;
				line-height: 30px;
				font-size: 14px;
				color: #333;
			}
			input {
				flex: 1;
				height: 24px;
				border: 1px solid #e6e6e6;
				background: #f2f4f5;
				padding-left: 9px;
				margin-top: 2px;
			}
			.web_link_look {
				display: block;
				width: 70px;
				height: 30px;
				margin-left: 12px;
				/*color: #4a6c98;*/
				border-radius: 15px;
				text-align: center;
				line-height: 30px;
			}
		}
		.web_msg {
			display: flex;
			justify-content: space-between;
			.web_left {
				width: 215px;
				.web_site {
					display: flex;
					justify-content: space-between;
					height: 26px;
					line-height: 26px;
					margin-bottom: 30px;
					.web_site_name {
						width: 70px;
						text-align: left;
						font-size: 14px;
						color: #333;
					}
					input {
						flex: 1;
						width: 134px;
						height: 24px;
						border: 1px solid #e6e6e6;
						background: #f2f4f5;
						padding-left: 9px;
					}
				}
				.web_site_show {
					height: 302px;
					textarea {
						flex: 1;
						outline: none;
						box-sizing: border-box;
						height: 302px;
						resize: none;
						background: #f2f4f5;
						border-color: #e6e6e6;
						padding-left: 9px;
					}
				}
			}
			.web_right {
				flex: 1;
				margin-left: 20px;
				height: 472px;
				border: 1px solid #e6e6e6;
				background: #f2f4f5;
				position: relative;
				.right_img {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					width: 92px;
					height: 117px;
					text-align: center;
					img {
						width: 92px;
						height: 92px;
					}
					span {
						margin-top: 13px;
						font-size: 14px;
						color: rgba(74, 108, 152, 0.75);
					}
				}
			}
		}
	}
	
	.theme-red {
		.web_link_look {
			background: url(../../assets/imgs/red/look_red.png);
			background-size: 100% 100%;
			color: $red-color;
		}
	}
	
	.theme-blue {
		.web_link_look {
			background: url(../../assets/imgs/blue/next_blue.png);
			background-size: 100% 100%;
			color: $blue-color;
		}
	}
	
	.theme-green {
		.web_link_look {
			background: url(../../assets/imgs/green/look_green.png);
			background-size: 100% 100%;
			color: $green-color;
		}
	}
</style>