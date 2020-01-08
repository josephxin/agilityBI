<template>
	<!-- "do" means (D)ata(O)verview -->
	<div class="rootWrap">
		<div class="root" style="opacity: 0;" do-root>
			<!-- Group1 -->
			<div class="group" style="left: 86px; top: 121px;">
				<div class="rect01" style="left: 0px; top: 0px;" do-item-id="g1_1">
					<div class="name01">农业部</div>
					<div class="numeric01">1024</div>
				</div>
				<div class="rect01" style="left: 0px; top: 108px;" do-item-id="g1_2">
					<div class="name01">市政府</div>
					<div class="numeric01">1024</div>
				</div>
				<div class="rect01" style="left: 0px; top: 216px;" do-item-id="g1_3">
					<div class="name01">市农委</div>
					<div class="numeric01">1024</div>
				</div>
				<div class="rect01" style="left: 0px; top: 324px;" do-item-id="g1_4">
					<div class="name01">外厅局</div>
					<div class="numeric01">1024</div>
				</div>
				<div class="rect01" style="left: 0px; top: 432px;" do-item-id="g1_5">
					<div class="name01">区县农业局</div>
					<div class="numeric01">1024</div>
				</div>
				<div class="ellipsis01 rect01" style="left: 0px; top: 540px;" do-item-id="g1_e">
					... ...
				</div>
			</div>

			<!-- Group2 -->
			<div class="group" style="left: 366px; top: 111px;">
				<!--left: 279px-->
				<div class="rect02" style="left: 0px; top: 0px;" do-item-id="g2_1">
					<div class="name02">猪舍温度</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="rect02" style="left: 0px; top: 74px;" do-item-id="g2_2">
					<div class="name02">猪舍湿度</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="rect02" style="left: 0px; top: 148px;" do-item-id="g2_3">
					<div class="name02">猪舍气体</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="rect02" style="left: 0px; top: 222px;" do-item-id="g2_4">
					<div class="name02">生猪数量</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="rect02" style="left: 0px; top: 296px;" do-item-id="g2_5">
					<div class="name02">生猪体温</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="rect02" style="left: 0px; top: 370px;" do-item-id="g2_6">
					<div class="name02">生猪体重</div>
					<div class="numeric02">1024</div>
				</div>
				<div class="ellipsis02 rect02" style="left: 0px; top: 444px;" do-item-id="g2_e">
					... ...
				</div>
			</div>

			<!-- Node -->
			<div class="node01" style="left: 650px; top: 399px;" do-item-id="n1">
				数据汇聚
			</div>
			<div class="node01" style="left: 1038px; top: 399px;" do-item-id="n2">
				知识图谱
			</div>
			<div class="node01" style="left: 1325px; top: 399px;" do-item-id="n3">
				数据服务
			</div>

			<!-- Core -->
			<div class="group" style="left: 612px; top: 398px; width: 595px;">
				<!--left: 1114px; top: 326px; width: 613px-->
				<div style="text-align: center; color: #333; line-height: 1; font-size: 30px; font-weight: bold;" do-item-id="c_t">
					大数据平台
				</div>
				<div class="core-numeric01" do-item-id="c_1">
					<span>2</span>
					<span>3</span>
					<span>1</span> ,
					<span>7</span>
					<span>8</span>
					<span>9</span> ,
					<span>3</span>
					<span>4</span>
					<span>5</span>
					<small>条</small>
				</div>
				<!--<div class="core-numeric02" do-item-id="c_2">
					<span>9</span>
					<span>9</span>
					<span>9</span> ,
					<span>9</span>
					<span>9</span>
					<span>9</span> ,
					<span>9</span>
					<span>9</span>
					<span>9</span>
					<small>KB</small>
				</div>-->
			</div>

			<!-- Group4 -->
			<div class="group" style="left: 1593px; top: 111px;">
				<!--left: 2077px-->
				<div class="rect03" style="left: 0px; top: 0px;" do-item-id="g4_1">
					<div class="name03">监测预警</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 74px;" do-item-id="g4_2">
					<div class="name03">质量分级</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 148px;" do-item-id="g4_3">
					<div class="name03">质量追溯</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 222px;" do-item-id="g4_4">
					<div class="name03">生猪物流</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 296px;" do-item-id="g4_5">
					<div class="name03">企业征信</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 370px;" do-item-id="g4_6">
					<div class="name03">生猪保险</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="rect03" style="left: 0px; top: 444px;" do-item-id="g4_7">
					<div class="name03">进出口情报</div>
					<div class="numeric03">1024</div>
				</div>
				<div class="ellipsis03 rect03" style="left: 0px; top: 518px;" do-item-id="g4_e">
					... ...
				</div>
			</div>

			<!-- Edges -->
			<div do-source-id="g1_1" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g1_2" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g1_3" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g1_4" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g1_5" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g1_e" do-target-id="n1" do-middle-offset-x="50"></div>

			<div do-source-id="g1_1" do-target-id="g2_1"></div>
			<div do-source-id="g1_1" do-target-id="g2_2"></div>
			<div do-source-id="g1_1" do-target-id="g2_3"></div>
			<div do-source-id="g1_1" do-target-id="g2_4"></div>
			<div do-source-id="g1_1" do-target-id="g2_5"></div>
			<div do-source-id="g1_1" do-target-id="g2_6"></div>
			<div do-source-id="g1_1" do-target-id="g2_e"></div>

			<div do-source-id="g2_1" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_2" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_3" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_4" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_5" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_6" do-target-id="n1" do-middle-offset-x="50"></div>
			<div do-source-id="g2_e" do-target-id="n1" do-middle-offset-x="50"></div>

			<div do-source-id="n2" do-target-id="n3"></div>

			<div do-source-id="n3" do-target-id="g4_1"></div>
			<div do-source-id="n3" do-target-id="g4_2"></div>
			<div do-source-id="n3" do-target-id="g4_3"></div>
			<div do-source-id="n3" do-target-id="g4_4"></div>
			<div do-source-id="n3" do-target-id="g4_5"></div>
			<div do-source-id="n3" do-target-id="g4_6"></div>
			<div do-source-id="n3" do-target-id="g4_7"></div>
			<div do-source-id="n3" do-target-id="g4_e"></div>

			<!--编辑数据源-按钮-->
			<btn :item="editDataSourceBtn" @click.native="editDataSourceFn"></btn>

			<!--编辑资源库-对话框-->
			<el-dialog title="选择字段" :visible.sync="$root.dialogEditResource" class="dialogEditResource">
				<dialog-field class="el-dialog-content"></dialog-field>
				<div slot="footer" class="dialog-footer">
					<button class="dialog-confirm" type="button" @click="saveFn">保存</button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import ChartLib from '@/../static/chart-library.min.js';
	import btn from '@/components/buttons/btn'
	import dialogField from '@/components/dialog/dialogFileld'

	/**
	 * 数据概览中央复合组件，采用控制器管辖各部件。
	 * @author Molay
	 */
	export default {
		components: {
			btn,
			dialogField
		},
		data: function() {
			return {
				editDataSourceBtn: {
					name: '编辑数据源',
					className: 'edit-data-source',
					iconName: 'icon-bi'
				}
			};
		},
		methods: {
			editDataSourceFn() {
				//console.log('editDataSourceFn', this);
				//this.$root.dialogEditResource = true
				this.$router.push({
					name: 'dataMatching'
				})
			},
			saveFn() {
				this.$root.dialogEditResource = false
			}
		},
		mounted() {
			//console.log(ChartLib); //{DataOverview: ƒ, TWEEN: o, Timer: ƒ, WaterMap: ƒ}

			let me = this;

			////
			// 创建中央组件控制器，绑定视图中的数值填充区域。
			////

			let viewport = me.$el.children[0];
			//console.log(me.$el, me.$el.children[0]);
			let app = new ChartLib.DataOverview({
				viewport: viewport,
			});
			me._app = app;
			//console.log(app)
			// 为核心区特殊数值内容区绑定处理器
			app.registerFormatter('c_1', function(element, value) {
				//console.log(element, value)
				var str = Math.round(value).toLocaleString();
				var arr = str.split('');
				var arr2 = arr.map(o => o === ',' ? o : ('<span>' + o + '</span>'));
				var str2 = '<small>数据总量</small>\n' + arr2.join('') + '\n<small>条</small>';
				//console.log(value, str, arr, arr2, str2)
				return str2;
			});
			/*app.registerFormatter('c_2', function(element, value) {
				return Math.round(value).toLocaleString().split('')
					.map(o => o === ',' ? o : ('<span>' + o + '</span>'))
					.join('\n') + '\n<small>KB</small>';
			});*/

			app.startRender();
			app.appear(1000);

			// 将所有数值内容区的数值均重置为0。
			// 需要注意App.set用法有三种：
			// 1、app.set(value) 将所有数值内容区均设置为此值。
			// 2、app.set(key, value) 将指定key的数值内容区设置为value。
			// 3、app.set([{key:key1,value:value1}]) or app.set({key1:value1}) 批量设置数值内容区的值。
			app.set(0);

			viewport.style.opacity = '';

			////
			// 填充本地静态数据，正式对接时应更换为接口。
			////
			let autoIncrement = 0;
			let testTimer = new ChartLib.Timer(2000);
			//console.log(testTimer)
			testTimer.on('timer', e => {
				// 转换思路提供的接口数据，映射至数值内容区。
				let indexData = require('@/json/getIndexData.json');
				const map = {
					//
					'SJLY-环保部': 'g1_1',
					'SJLY-省政府': 'g1_2',
					'SJLY-环保厅': 'g1_3',
					'SJLY-外厅局': 'g1_4',
					'SJLY-市县环保局': 'g1_5',
					'SJLY-互联网': 'g1_5',
					//
					'WLWSJ-水环境': 'g2_1',
					'WLWSJ-气环境': 'g2_2',
					'WLWSJ-土壤环境': 'g2_3',
					'WLWSJ-声环境': 'g2_4',
					'WLWSJ-污染源综合环境': 'g2_5',
					'WLWSJ-核与辐射': 'g2_6',
					//
					'SJYY-水环境分析': 'g4_1',
					'SJYY-气环境分析': 'g4_2',
					'SJYY-土环境分析': 'g4_3',
					'SJYY-污染源环境监督': 'g4_4',
					'SJYY-污染源监测': 'g4_5',
					'SJYY-环境应急': 'g4_6',
					'SJYY-公众服务': 'g4_7',
					//
					'SJHJ-数据总条数': 'c_1',
					'SJHJ-数据容量': 'c_2'
				};
				let data = [];
				let coreData = [];

				indexData.data.map(d => {
					let value = Number(d.SJL) + autoIncrement;
					let okey = d.TYPE + '-' + d.NAME;
					let key = map[okey];
					if(key)
						data.push({
							key, //缩写：key: key
							value
						});
					else if(d.TYPE === 'SJHJ')
						coreData.push({
							key: d.NAME,
							value
						});
				});
				data.push({
					key: 'core',
					value: coreData
				});
				//console.log(data, coreData)
				app.set(data);

				autoIncrement += Math.round(Math.random() * 20);
			});
			testTimer.start();
			me._testTimer = testTimer;

			// 隐藏第二个canvas
			$('canvas')[1].style.display = 'none';
		},
		beforeDestroy: function() {
			let me = this;
			if(me._testTimer) {
				me._testTimer.reset();
				me._testTimer = null;
			}
			me._app.stopRender();
			me._app = null;
		}
	}
</script>

<style lang="scss" scoped>
	.dialogEditResource{
		
	}
	.rootWrap {
		padding: 20px 50px;
		min-width: 1814px;
	}
	
	.root {
		position: relative;
		margin: 0 auto;
		width: 1814px; //1888px
		height: 928px; //1020px
		background: url(../../assets/imgs/red/dataSourceBg.png) no-repeat 0 191px;
		background-size: 100%;
		background-color: white;
		border-radius: 8px;
		font-family: "Microsoft YaHei", "微软雅黑";
		overflow: hidden;
	}
	
	.group {
		position: absolute;
	}
	
	.rect01,
	.rect02,
	.rect03 {
		position: absolute;
		box-sizing: border-box;
		width: 149px;
		border: 1px solid #ffbcb1;
		border-radius: 2px;
		background-color: #fcecec;
	}
	
	.rect01 {
		height: 68px;
	}
	
	.rect02 {
		height: 54px;
	}
	
	.rect03 {
		height: 54px;
	}
	
	.ellipsis01,
	.ellipsis02,
	.ellipsis03 {
		font-weight: bold;
		font-size: 22px;
		text-align: center;
		color: $red-color;
	}
	
	.ellipsis01 {
		line-height: 55px;
	}
	
	.ellipsis02 {
		line-height: 41px;
	}
	
	.ellipsis03 {
		line-height: 41px;
	}
	
	.node01 {
		position: absolute;
		width: 124px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-image: url(../../assets/imgs/red/dataSourceShape.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		color: $search-input-color;
		font-weight: bold;
		font-size: 18px;
	}
	
	.name01,
	.name02,
	.name03 {
		color: $search-input-color;
		text-align: center;
		line-height: 1;
	}
	
	.name01 {
		padding-top: 10px;
		font-weight: bold;
		font-size: 16px;
	}
	
	.name02 {
		padding-top: 8px;
		font-size: 14px;
		text-decoration: underline;
	}
	
	.name03 {
		padding-top: 8px;
		font-size: 14px;
	}
	
	.numeric01,
	.numeric02,
	.numeric03 {
		font-weight: bold;
		color: $red-color;
		text-align: center;
		line-height: 1;
	}
	
	.numeric01 {
		padding-top: 11px;
		font-size: 22px;
	}
	
	.numeric02 {
		padding-top: 5px;
		font-size: 18px;
	}
	
	.numeric03 {
		padding-top: 5px;
		font-size: 18px;
	}
</style>

<style lang="scss">
	.core-numeric01 {
		text-align: center;
		font-weight: bold;
		margin-top: 42px;
		font-size: 40px;
		line-height: 1;
		span {
			color: $red-color;
		}
		small {
			font-size: 16px;
			color: $search-input-color;
		}
	}
	
	.core-numeric02 {
		color: #00ffb4;
		font-size: 22px; //42
		text-align: center;
		font-weight: bold;
		margin-top: 28px;
		span {
			display: inline-block;
			width: 25px; //38
			height: 40px; //64
			border: 1px solid #00ffb4;
			border-radius: 4px;
			background-color: #0e2164;
			line-height: 40px;
		}
		small {
			font-size: 13px; //20
		}
	}
</style>