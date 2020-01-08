<template>
	<div class="configuration">
		<ul class="configuration-list">
			<li class="fl" v-for="(item, index) in configurationList" :key="index">
				<div class="img-wrap fl" :class="{'active': configurationName==item.name}" @click="goPage(item.name)">
					<img class="img" :src="item.src" />
					<img class="img-selected" :src="item.srcSelected" />
				</div>
				<img class="img-arrow fl" src="../assets/imgs/step-arrow.png" v-if="(configurationList.length-1)!=index" />
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "configuration",
		components: {},
		data: function() {
			return {
				configurationList: []
			}
		},
		computed: {
			...mapState(["themeColor", "configurationName"]),
		},
		watch: {
			themeColor: {
				handler(newValue, oldValue) {
					this.setConfigurationList(newValue)
				}
			},
		},
		methods: {
			goPage(name) {
				this.$store.commit('changeConfigurationName', name)
				this.$router.push({
					name: name
				});
			},
			setConfigurationList(color) {
				//console.log(color)
				this.configurationList = [{
						name: 'dataMatching',
						src: require('../assets/imgs/' + color + '/step1.png'),
						srcSelected: require('../assets/imgs/' + color + '/step1-selected.png')
					},
					{
						name: 'dataStructureAnalysis',
						src: require('../assets/imgs/' + color + '/step2.png'),
						srcSelected: require('../assets/imgs/' + color + '/step2-selected.png')
					},
					{
						name: 'foreignKey',
						src: require('../assets/imgs/' + color + '/step3.png'),
						srcSelected: require('../assets/imgs/' + color + '/step3-selected.png')
					},
					{
						name: 'entity',
						src: require('../assets/imgs/' + color + '/step4.png'),
						srcSelected: require('../assets/imgs/' + color + '/step4-selected.png')
					},
					{
						name: 'relationExtraction',
						src: require('../assets/imgs/' + color + '/step5.png'),
						srcSelected: require('../assets/imgs/' + color + '/step5-selected.png')
					},
					{
						name: 'hotWord',
						src: require('../assets/imgs/' + color + '/step6.png'),
						srcSelected: require('../assets/imgs/' + color + '/step6-selected.png')
					},
				]
			},
		},
		created() {

		},
		mounted() {
			this.setConfigurationList(this.themeColor)
		}
	};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.configuration {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 1689px;
		height: 140px;
		background: url(../assets/imgs/red/configuration_bg.png);
	}
	
	.configuration-list {
		overflow: hidden;
		/*min-width: 1689px;*/
		>li {
			.img-wrap {
				/*width: 170px;*/
				background: url(../assets/imgs/configuration_white.png) no-repeat 0 97px;
				background-size: 100%;
				cursor: pointer;
				&:hover,
				&.active {
					.img {
						display: none;
					}
					.img-selected {
						display: block;
					}
				}
				img {
					width: 100%;
					height: 100%;
				}
				.img-selected {
					display: none;
				}
			}
			.img-arrow {
				margin-top: 87px;
			}
		}
	}
	
	.theme-blue {
		.configuration {
			background: url(../assets/imgs/blue/configuration_bg.png);
		}
	}
	.theme-green {
		.configuration {
			background: url(../assets/imgs/green/configuration_bg.png);
		}
	}
</style>