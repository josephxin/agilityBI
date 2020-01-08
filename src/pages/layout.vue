<template>
	<div id='layout' ref="layout">
		<div class="header-wrap">
			<header-bar></header-bar>
			<search-bar v-if="visibleSearch" ref="search"></search-bar>
			<configuration v-if="!visibleSearch"></configuration>
		</div>
		<div class="main-wrap" id="main-wrap">
			<router-view v-if="isRouterAlive"></router-view>
		</div>
	</div>
</template>

<script>
	import HeaderBar from "../components/Header";
	import SearchBar from "../components/search/search.vue";
	import configuration from "../components/configuration";
	import { mapState } from "vuex";

	export default {
		components: {
			HeaderBar,
			SearchBar,
			configuration,
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(["themeColor", "visibleSearch", "isRouterAlive"]),
		},
		watch: {
			themeColor: {
				handler(newValue, oldValue) {
					newValue ? this.setTheme() : null;
				}
			},
			visibleSearch: { //初始化渲染dom时监听不到变化，所以需要在mounted里初始化执行一次
				handler(newValue, oldValue) {
					//console.log(newValue);
					var mainWrap = document.getElementById("main-wrap")
					if(newValue) {
						mainWrap.style.paddingTop = '170px'
						mainWrap.style.minHeight = 'calc(100vh - 170px)'
					} else {
						mainWrap.style.paddingTop = '190px'
						mainWrap.style.minHeight = 'calc(100vh - 190px)'
					}
				},
				deep: true
			},
		},
		methods: {
			setTheme() {
				const target = document.getElementsByTagName('body')[0];
				//console.log(target);
				const localStorageCls = localStorage.getItem("theme") ?
					localStorage.getItem("theme") :
					"blue";
				target.className = this.themeColor ? "theme-" + this.themeColor : `theme-${localStorageCls}`;
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.setTheme();
				var name = this.$route.name
				var mainWrap = document.getElementById("main-wrap")
				//console.log(this.visibleSearch, name);
				//控制头部搜索框与配置流程相互切换
				if(name == 'dataMatching' || name == 'dataStructureAnalysis' || name == 'foreignKey' || name == 'entity' || name == 'relationExtraction' || name == 'hotWord' || name == 'templateMatching') {
					mainWrap.style.paddingTop = '190px'
					mainWrap.style.minHeight = 'calc(100vh - 190px)'
				} else {
					mainWrap.style.paddingTop = '170px'
					mainWrap.style.minHeight = 'calc(100vh - 170px)'
				}
			});
		}
	};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	#layout {
		min-height: 100%;
		min-width: 1295px;
		.header-wrap {
			background: $white;
			position: fixed;
			width: 100%;
			min-width: 1295px;
			z-index: 999;
		}
		.main-wrap {
			min-height: calc(100vh - 170px);
		}
	}
</style>