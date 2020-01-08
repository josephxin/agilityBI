<template>
	<div class="relationExtraction">
		<div class="re_begin" v-show="!showProgress">
			<img :src="relationExtractionSrc" alt="" />
			<button class="begin_task opacity" @click="relatuinAjax">知识图谱构建</button>
			<p>此抽取过程中耗时较久，未完成之前系统不可查询，请您耐心等待</p>
		</div>
		<progress-bar v-if="showProgress" module-name="知识图谱构建进度" :progress="progress" @cancel-event="cancelKGBuildAjax"></progress-bar>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import axios from "axios"
	import progressBar from "@/components/other/progressBar"
	import { getDataRelationExtraction, getKGBuildProgress, cancelKGBuild } from "@/api/index.js"

	export default {
		components: {
			progressBar
		},
		data() {
			return {
				showProgress: false,
				progress: 0,
				missionId: '',
				relationExtractionSrc: '',
			}
		},
		computed: {
			...mapState(["themeColor", "requests"]),
		},
		watch: {
			themeColor: {
				handler(newValue, oldValue) {
					this.setrelationExtractionSrc(newValue)
				}
			},
		},
		methods: {
			//切换图片
			setrelationExtractionSrc(color) {
				this.relationExtractionSrc = require('@/assets/imgs/' + color + '/relation-extraction.png')
			},
			//点击知识图谱构建按钮，启动知识图谱构建
			relatuinAjax() {
				getDataRelationExtraction({
					"userId": this.$root.userId,
				}).then(data => {
					//console.log("启动知识图谱构建", data);
					if(data.message == 'success') {
						if(data.data.status) {
							this.missionId = data.data.missionId
							this.showProgress = true
							//查询图谱任务进度
							this.getKGBuildProgressAjax()
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
				})
			},
			//终止图谱任务
			cancelKGBuildAjax() {
				cancelKGBuild({
					"userId": this.$root.userId,
					"missionId": this.missionId,
				}).then(data => {
					//console.log("终止图谱任务", data)
					if(data.message == 'success') {
						if(data.data.status) {
							this.showProgress = false
							this.$message({
								type: 'success',
								duration: 1000,
								message: '成功终止知识图谱构建任务'
							});
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
				})
			},
			//查询图谱任务进度
			getKGBuildProgressAjax() {
				getKGBuildProgress({
					"userId": this.$root.userId,
					"missionId": this.missionId,
				}).then(data => {
					//console.log("查询图谱任务进度", data)
					if(data.message == 'success') {
						if(data.data.process != -2 && data.data.process != -1) {
							this.progress = data.data.process
							if(this.progress >= 100) {
								this.progress = 100
								this.$message({
									type: 'success',
									duration: 1000,
									message: '知识图谱构建成功！'
								});
								// 跳转页面
								this.$router.push({
									name: 'hotWord'
								});
							} else {
								setTimeout(() => {
									this.getKGBuildProgressAjax()
								}, 2000)
							}
						} else {
							this.$message({
								type: 'error',
								duration: 1000,
								message: data.data.process == -2 ? '任务id不存在' : '任务已取消'
							});
							this.progress = 0
						}
					} else {
						this.$message({
							type: 'error',
							duration: 1000,
							message: data.message
						});
						this.progress = 0
					}
				}).catch(err => {
					this.$message({
						type: 'error',
						duration: 1000,
						message: err
					});
					this.progress = 0
				})
			}
		},
		created() {

		},
		mounted() {
			this.setrelationExtractionSrc(this.themeColor)
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.relationExtraction {
		min-height: calc(100vh - 230px);
		margin: 20px 50px;
		background: #fff;
		border-radius: 10px;
		.re_begin {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-top: 123px;
			position: relative;
			.begin_task {
				width: 342px;
				height: 50px;
				margin-top: 54px;
				margin-bottom: 50px;
				text-align: center;
				line-height: 50px;
				border-radius: 20px;
				color: #ffffff;
				font-size: 18px;
				background: url(../../assets/imgs/red/begin_task.png) no-repeat;
				background-size: 100% 100%;
				cursor: pointer;
				user-select: none;
			}
			p {
				color: #a8a8a8;
				font-size: 12px;
				line-height: 1;
			}
		}
	}
	
	.theme-blue {
		.relationExtraction {
			.re_begin {
				.begin_task {
					background: url(../../assets/imgs/blue/begin_task.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
	
	.theme-green {
		.relationExtraction {
			.re_begin {
				.begin_task {
					background: url(../../assets/imgs/green/begin_task.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>