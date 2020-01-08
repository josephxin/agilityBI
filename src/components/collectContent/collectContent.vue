<template>
	<ul class="main_echarts_drawing clearfix">
		<li v-for="(item, index) in contentCollectList" :key="index">
			<div class="med_border" @click="goChart(item)">
				<img :src="img" v-if="!item.reportUrl" />
				<img :src="item.reportUrl" class="img_true" v-if="item.reportUrl" />
				<div class="med_explain" :title="item.reportName">{{item.reportName}}</div>
				<div class="med_checkbox">
					<input type="checkbox" :value="item.id" class="med_real" v-model="contentCollectCheckList" @click.stop="check($event)" />
				</div>
			</div>
		</li>
		<div class="no_time" v-if="contentCollectList.length <= 0">
			<i class="no_data"></i>
			<i class="no_bor"></i>
			<span>暂无数据...</span>
		</div>
	</ul>
</template>

<script>
	export default {
		props: {
			contentCollectList: [Array],
			contentCollectCheckList: [Array],
			type: [String]
		},
		data() {
			return {
				img: localStorage.getItem("theme") ? require('../../assets/imgs/placeholder_' + localStorage.getItem("theme") + '.png') : require('../../assets/imgs/placeholder_blue.png'),
			}
		},
		computed: {
			themeColor() {
				return this.$store.state.themeColor
			}
		},
		watch: {
			themeColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					if(newValue == "red") {
						this.img = require('../../assets/imgs/placeholder_red.png')
					} else if(newValue == "blue") {
						this.img = require('../../assets/imgs/placeholder_blue.png')
					} else if(newValue == "green") {
						this.img = require('../../assets/imgs/placeholder_green.png')
					}
				},
				deep: true
			}
		},
		methods: {
			goChart(item) {
				//console.log('报告原始信息', item);
				var id = '0';
				this.$store.commit('changeReportName', item.reportName)
				switch(this.type) {
					case 'collect':
						id = '1'
						this.$store.commit('changeReportId', item.id)
						this.$store.commit('changeCurrFolderId', 0)
						break;
					case 'myReport':
						id = '2'
						this.$store.commit('changeReportId', item.reportId)
						this.$store.commit('changeCurrFolderId', item.folderId)
						break;
					case 'mySeek':
						id = '3'
						this.$store.commit('changeReportId', 0)
						this.$store.commit('changeCurrFolderId', 0)
						break;
				}

				this.$router.push({
					name: 'chart',
					params: {
						id: id
					}
				})
			},
			check(e) {
				if(e.target.checked == true) {
					if(this.contentCollectCheckList.indexOf(e.target.value) == -1) {
						this.contentCollectCheckList.push(Number(e.target.value))
					}
				} else {
					var item = e.target.value;
					for(let i = 0; i < this.contentCollectCheckList.length; i++) {
						if(this.contentCollectCheckList[i] == item) {
							this.contentCollectCheckList.splice(i, 1);
							i--;
						}
					}
				}
				this.$emit("update:contentCollectCheckList", this.contentCollectCheckList)
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.main_echarts_drawing {
		min-height: calc(100vh - 393px);
		position: relative;
		.no_time {
			width: 300px;
			height: 164px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -150px;
			margin-top: -82px;
			text-align: center;
		}
		li {
			position: relative;
			float: left;
			width: 19%;
			box-sizing: border-box;
			border: 8px solid #FFF;
			border-radius: 10px;
			height: 230px;
			margin-bottom: 20px;
			margin-right: 1%;
			background: #f0f0f0;
			-webkit-transition: background .3s;
			-moz-transition: background .3s;
			-ms-transition: background .3s;
			-o-transition: background .3s;
			transition: background .3s;
			.med_explain {
				position: absolute;
				bottom: -1px;
				left: -1px;
				width: 100%;
				height: 51px;
				font-size: 16px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				border-bottom-right-radius: 10px;
				border-bottom-left-radius: 10px;
				cursor: pointer;
				font-weight: 600;
				line-height: 50px;
				text-indent: 20px;
				padding-right: 2px;
				transition: all .5s;
			}
			.med_border {
				position: absolute;
				top: -8px;
				left: -8px;
				width: 100%;
				height: 100%;
				border-radius: 10px;
				padding: 7px;
				border: 1px solid transparent;
				cursor: pointer;
				img {
					display: block;
					margin: 40px auto 0;
				}
				img.img_true {
					margin: 0;
					width: 100%;
					height: 100%;
				}
				.med_checkbox {
					position: absolute;
					top: -10px;
					right: -12px;
					width: 28px;
					height: 28px;
					border-radius: 50%;
					background: #FFFFFF;
					.med_real {
						width: 28px;
						height: 28px;
						background: url(../../assets/imgs/unselected.png);
						background-size: 100% 100%;
						-webkit-appearance: none;
						outline: none;
						cursor: pointer;
					}
					input[type=checkbox]:checked {
						background: url(../../assets/imgs/pitch_on_blue.png);
						background-size: 100% 100%;
					}
				}
			}
		}
		li:hover {
			.med_explain {
				border-bottom-right-radius: 10px;
				border-bottom-left-radius: 10px;
			}
		}
		li:nth-child(5n) {
			margin-right: 0;
		}
	}
	
	.theme-blue {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: $home-recommend-color;
		}
		li:hover {
			.med_explain {
				background: rgba(11, 83, 172, .6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $search-li-border!important;
			}
		}
	}
	
	.theme-red {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: #37261f;
		}
		li:hover {
			.med_explain {
				background-color: rgba(72, 61, 54, 0.6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $configure-list-red !important;
			}
		}
	}
	
	.theme-green {
		.med_explain {
			background: rgba(255, 255, 255, .6);
			color: #1c4e1d;
		}
		li:hover {
			.med_explain {
				background-color: rgba(90, 161, 120, 0.6);
				color: #FFF;
			}
			.med_border {
				border: 1px solid $configure-list-green!important;
			}
		}
	}
</style>