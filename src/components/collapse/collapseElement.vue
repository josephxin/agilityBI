<template>
	<el-collapse class="collapse-element" v-model="activeNames" @change="handleChange">
		<el-collapse-item :name="1">
			<template slot="title">
				<p title="元素类型">元素类型</p>
			</template>
			<div class="element-type">
				<div :class="[item.type, {'active': elementTypeActive==index}]" v-for="(item, index) in elementType" :key="index" @click="selectShape(index, item.type)">
					<p>{{item.name}}</p>
				</div>
			</div>
		</el-collapse-item>

		<el-collapse-item :name="2">
			<template slot="title">
				<p title="元素设置">元素设置</p>
			</template>
			<div class="element-set">
				<p class="text-set">文字设置</p>
				<div class="text-set-tool">
					<el-select v-model="fontFamily" :filterable="true" placeholder="请选择" class="font-family border-background">
						<el-option v-for="item in fontFamilys" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class="font-related clearfix">
						<el-select class="font-size border-background fl" v-model="fontSize" placeholder="请选择">
							<el-option v-for="item in fontSizes" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<div class="font-weight-underline border-background fl">
							<i class="iconfont icon-B font-weight" :class="{'active': stateFontWeight=='bold'}" @click="changeFontWeight"></i>
							<i class="iconfont icon-xieti font-style" :class="{'active': stateFontStyle=='italic'}" @click="changeFontStyle"></i>
							<i class="iconfont icon-U font-underline" :class="{'active': stateFontUnderline=='underline'}" @click="changeFontUnderline"></i>
						</div>
						<div class="font-color border-background fr">
							<i class="iconfont icon-zitiyanse" ref="fontColor"></i>
							<el-color-picker class="input-color" show-alpha v-model="fontColor" :predefine="predefineColors">
							</el-color-picker>
						</div>
					</div>
				</div>
				<p class="line-set">线条设置</p>
				<div class="line-set-tool">
					<div class="border-background line-color">
						<i class="iconfont icon-bi" ref="lineColor"></i>
						<el-color-picker class="input-color" show-alpha v-model="lineColor" :predefine="predefineColors">
						</el-color-picker>
					</div>
					<div class="border-background line-weight">
						<i class="iconfont icon-xiancuxi1"></i>
						<el-select v-model="lineWidth" class="input-color">
							<el-option v-for="item in lineWidths" :key="item.value" :value="item.value">
								<i class="iconfont block-center" :class="item.label"></i>
							</el-option>
						</el-select>
					</div>
					<div class="border-background line-type">
						<i class="iconfont icon-xuxian"></i>
						<el-select v-model="lineType" class="input-color">
							<el-option v-for="item in lineTypes" :key="item.value" :value="item.value">
								<i class="iconfont block-center" :class="item.label"></i>
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
		</el-collapse-item>
	</el-collapse>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		components: {

		},
		props: {

		},
		data() {
			return {
				elementTypeActive: 0,
				fontFamily: 'Arial',
				fontFamilys: [{
					value: 'Arial',
					label: 'Arial'
				}, {
					value: '宋体',
					label: '宋体'
				}, {
					value: '黑体',
					label: '黑体'
				}, {
					value: '微软雅黑',
					label: '微软雅黑'
				}, {
					value: '楷体',
					label: '楷体'
				}, {
					value: '新宋体',
					label: '新宋体'
				}, {
					value: '仿宋',
					label: '仿宋'
				}, {
					value: '隶书',
					label: '隶书'
				}, {
					value: '华文仿宋',
					label: '华文仿宋'
				}, {
					value: '华文新魏',
					label: '华文新魏'
				}, {
					value: '华文楷体',
					label: '华文楷体'
				}, {
					value: '华文行楷',
					label: '华文行楷'
				}, {
					value: '华文细黑',
					label: '华文细黑'
				}, {
					value: '华文隶书',
					label: '华文隶书'
				}, {
					value: '华文琥珀',
					label: '华文琥珀'
				}, {
					value: '华文彩云',
					label: '华文彩云'
				}, {
					value: '幼圆',
					label: '幼圆'
				}, {
					value: '方正姚体',
					label: '方正姚体'
				}, {
					value: '方正舒体',
					label: '方正舒体'
				}],
				fontSize: 14,
				fontSizes: [{
						value: 14,
						label: 14
					},
					{
						value: 16,
						label: 16
					},
					{
						value: 18,
						label: 18
					},
					{
						value: 20,
						label: 20
					},
					{
						value: 22,
						label: 22
					},
					{
						value: 24,
						label: 24
					},
					{
						value: 26,
						label: 26
					},
					{
						value: 28,
						label: 28
					},
					{
						value: 30,
						label: 30
					},
					{
						value: 32,
						label: 32
					},
					{
						value: 34,
						label: 34
					},
					{
						value: 36,
						label: 36
					},
				],
				fontColor: '#ffffff',
				predefineColors: [
					'rgb(0,0,0)',
					'rgb(128,138,135)',
					'rgb(255,0,0)',
					'rgb(255,128,0)',
					'rgb(255,255,0)',
					'rgb(34,139,34)',
					'rgb(0,255,0)',
					'rgb(0,0,255)',
					'rgb(0,255,255)',
					'rgb(255,0,255)',
					'rgb(255, 192, 203)',

					'rgba(255, 0, 0, .5)',
					'rgba(255, 128, 0, .5)',
					'rgba(255,2 55, .5)',
					'rgba(34, 139, 34, .5)',
					'rgba(0, 255, 0, .5)',
					'rgba(0, 0, 255, .5)',
					'rgba(0, 255, 255, .5)',
					'rgba(255, 0, 255, .5)',
					'rgba(255, 192, 203, .5)',
				],
				lineColor: '#ffffff',
				lineWidth: 1,
				lineWidths: [{
						value: 1,
						label: 'icon-thickness-a'
					},
					{
						value: 2,
						label: 'icon-thickness-b'
					},
					{
						value: 4,
						label: 'icon-thickness-c'
					},
					{
						value: 6,
						label: 'icon-thickness-d'
					}
				],
				lineType: 'solid',
				lineTypes: [{
						value: 'dashed',
						label: 'icon-xuxian3'
					},
					{
						value: 'dotted',
						label: 'icon-xiaoxuxian'
					},
					{
						value: 'solid',
						label: 'icon--shixian'
					}
				],
				activeNames: [1],
				elementType: [{
						name: '矩形',
						type: 'rect',
					},
					{
						name: '椭圆形',
						type: 'ellipse',
					},
					{
						name: '水平线',
						type: 'hLine',
					},
					{
						name: '垂直线',
						type: 'vLine',
					},
					{
						name: '水平线',
						type: 'hLine2',
					},
					{
						name: '垂直线',
						type: 'vLine2',
					},
					{
						name: '图片',
						type: 'img',
					},
					{
						name: '链接按钮',
						type: 'linkBtn',
					},
					{
						name: '文本标签',
						type: 'textTag',
					},
					{
						name: '文本框',
						type: 'textbox',
					},
				]
			}
		},
		computed: {
			...mapState({
				domList: 'domList',
				stateLineColor: 'lineColor',
				stateLineWidth: 'lineWidth',
				stateLineType: 'lineType',
				stateFontFamily: 'fontFamily',
				stateFontSize: 'fontSize',
				stateFontWeight: 'fontWeight',
				stateFontStyle: 'fontStyle',
				stateFontUnderline: 'fontUnderline',
				stateFontColor: 'fontColor',
			}),
		},
		watch: {
			//监听v-model 里面的变量
			lineColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					if(newValue != null) {
						this.$store.commit('changeLineColor', newValue)
						this.$refs.lineColor.style.color = newValue
					} else {
						this.$store.commit('changeLineColor', '#ff0000')
						this.$refs.lineColor.style.color = '#ff0000'
					}
				}
			},
			lineWidth: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.$store.commit('changeLineWidth', newValue)
				}
			},
			lineType: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.$store.commit('changeLineType', newValue)
				}
			},
			fontSize: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.$store.commit('changeFontSize', newValue)
				}
			},
			fontFamily: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.$store.commit('changeFontFamily', newValue)
				}
			},
			fontColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					if(newValue != null) {
						this.$store.commit('changeFontColor', newValue)
						this.$refs.fontColor.style.color = newValue
					} else {
						this.$store.commit('changeFontColor', '#ff0000')
						this.$refs.fontColor.style.color = '#ff0000'
					}
				}
			},
			//监听vuex 里面的变量
			stateLineColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.lineColor = newValue
				}
			},
			stateLineWidth: {
				handler(newValue, oldValue) {
					this.lineWidth = newValue
				}
			},
			stateLineType: {
				handler(newValue, oldValue) {
					this.lineType = newValue
				}
			},
			stateFontFamily: {
				handler(newValue, oldValue) {
					this.fontFamily = newValue
				}
			},
			stateFontSize: {
				handler(newValue, oldValue) {
					this.fontSize = newValue
				}
			},
			stateFontColor: {
				handler(newValue, oldValue) {
					this.fontColor = newValue
				}
			},
		},
		methods: {
			handleChange(val) {
				//console.log(val, typeof val);
			},
			changeEcharts(obj) {
				//console.log(obj);
				//this.$store.commit('changeEcharts', obj)
			},
			getEchartsData(params, name) {
				//console.log(params, name);
			},
			selectShape(index, type) {
				//console.log(type);
				this.elementTypeActive = index
				this.$store.commit('changeElementType', type)
			},
			changeFontWeight() {
				if(this.stateFontWeight == 'bold') {
					this.$store.commit('changeFontWeight', 'normal')
				} else {
					this.$store.commit('changeFontWeight', 'bold')
				}
			},
			changeFontStyle() {
				if(this.stateFontStyle == 'italic') {
					this.$store.commit('changeFontStyle', 'normal')
				} else {
					this.$store.commit('changeFontStyle', 'italic')
				}
			},
			changeFontUnderline() {
				if(this.stateFontUnderline == 'underline') {
					this.$store.commit('changeFontUnderline', 'none')
				} else {
					this.$store.commit('changeFontUnderline', 'underline')
				}
			},
		},
		mounted() {
			this.lineColor = this.stateLineColor
			this.lineWidth = this.stateLineWidth
			this.lineType = this.stateLineType
			this.fontFamily = this.stateFontFamily
			this.fontSize = this.stateFontSize
			this.fontColor = this.stateFontColor
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	.element-type {
		overflow: hidden;
		>div {
			position: relative;
			float: left;
			margin-bottom: 12px;
			width: 111px;
			height: 78px;
			background-repeat: no-repeat;
			overflow: hidden;
			cursor: pointer;
			&:nth-of-type(2n) {
				float: right;
			}
			&:hover,
			&.active {
				opacity: .5;
			}
			&.rect {
				background-position: 21px 11px;
			}
			&.ellipse {
				background-position: -109px 11px;
			}
			&.hLine {
				background-position: 21px -79px;
			}
			&.vLine {
				background-position: -109px -79px;
			}
			&.hLine2 {
				background-position: 21px -168px;
			}
			&.vLine2 {
				background-position: -109px -168px;
			}
			&.img {
				background-position: 21px -259px;
			}
			&.linkBtn {
				background-position: -109px -259px;
			}
			&.textTag {
				background-position: 21px -349px;
			}
			&.textbox {
				background-position: -109px -349px;
			}
			>p {
				position: absolute;
				left: 0;
				bottom: 0;
				box-sizing: border-box;
				width: 100%;
				line-height: 1.2;
				text-align: center;
				color: white;
				font-size: 14px;
			}
		}
	}
	
	.theme-blue {
		.element-type {
			>div {
				background-image: url(../../assets/imgs/blue/elements.png);
				background-color: #298bdd !important;
				border-radius: 8px;
				>p {
					background-color: rgba(255, 255, 255, .2);
					border: 1px solid #66acea;
					border-bottom-left-radius: 8px;
					border-bottom-right-radius: 8px;
				}
			}
		}
		.border-background {
			border: 1px solid #2a99f2;
			background: linear-gradient(to bottom, rgba(19, 96, 180, 1), rgba(19, 96, 180, .2));
		}
		.text-set,
		.line-set {
			color: #81baf2;
		}
	}
	
	.theme-red {
		.element-type {
			>div {
				background-image: url(../../assets/imgs/red/elements.png);
				background-color: #b03928 !important;
				>p {
					background-color: rgba(0, 0, 0, .6);
				}
			}
		}
		.border-background {
			border: 1px solid #f77459;
			background-color: #e4624c;
		}
		.text-set,
		.line-set {
			color: white;
		}
		.collapse-element {
			.el-collapse-item__header {
				background: url(../../assets/imgs/red/bg_list_line.jpg) no-repeat left 52px;
				background-color: #d44d3b !important;
				&.is-active {
					background: url(../../assets/imgs/red/bg_red_bar.jpg);
				}
			}
		}
	}
	
	.theme-green {
		.element-type {
			>div {
				background-image: url(../../assets/imgs/green/elements.png);
				background-color: #1a6538 !important;
				>p {
					background-color: rgba(0, 0, 0, .6);
				}
			}
		}
		.border-background {
			border: 1px solid #1faf5d;
			background-color: #1d9551;
		}
		.text-set,
		.line-set {
			color: white;
		}
		.collapse-element {
			.el-collapse-item__header {
				background: url(../../assets/imgs/green/bg_list_line.jpg) no-repeat left 52px;
				background-color: #1d723e !important;
				&.is-active {
					background: url(../../assets/imgs/green/bg_green_bar.jpg);
				}
			}
		}
	}
	
	.element-set {
		padding: 0 5px;
		.text-set,
		.line-set {
			height: 33px;
			line-height: 33px;
		}
		.text-set-tool {
			.el-select {
				.el-input__inner {
					display: block;
					height: 22px;
					line-height: 22px;
					padding-right: 20px;
					border: none;
					border-radius: 12px;
					background-color: transparent;
					color: white;
					&::-webkit-input-placeholder {
						color: white;
					}
				}
				.el-select__caret{
					line-height: 22px;
					color: white;
				}
			}
			.font-family {
				margin-bottom: 19px;
				width: 100%;
				height: 24px;
			}
			.font-related {
				margin-bottom: 19px;
				height: 24px;
				.font-size {
					width: 57px;
					height: 100%;
				}
				.font-weight-underline {
					margin-left: 18px;
					width: 86px;
					height: 100%;
					line-height: 22px;
					padding-left: 12px;
					padding-right: 12px;
					>i {
						float: left;
						margin-right: 8px;
						font-size: 12px;
						cursor: pointer;
						&:last-of-type {
							margin-right: 0;
						}
						&.font-style {
							font-size: 18px;
						}
						&.active {
							color: #ffc000;
						}
					}
				}
				.font-color {
					position: relative;
					width: 57px;
					height: 100%;
					text-align: center;
					>i {
						font-size: 18px;
						line-height: 22px;
					}
				}
			}
		}
		.line-set-tool {
			margin-bottom: 19px;
			height: 24px;
			>div {
				position: relative;
				float: left;
				margin-right: 18px;
				width: 57px;
				height: 100%;
				line-height: 22px;
				text-align: center;
				cursor: pointer;
				&:last-of-type {
					margin-right: 0;
				}
				&.line-color {
					>i {
						font-size: 18px;
					}
				}
				&.line-weight {}
				>i {
					font-size: 12px;
				}
			}
		}
	}
	
	.collapse-element {
		.border-background {
			box-sizing: border-box;
			border-radius: 12px;
		}
		.input-color {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			cursor: pointer;
		}
		.block-center {
			display: block;
			text-align: center;
		}
	}
</style>