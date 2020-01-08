<template>
	<div class="listigature_padd">
		<div class="listigature_padd_name">
			<!--<span>aduience</span>-->
			<div class="add_cancel_none">
				<button class="add_none el-btn save">保存</button>
				<button class="cance_none el-btn cancel">取消</button>
			</div>
		</div>
		<div class="jtk-bootstrap jtk-bootstrap-wide jtk_listigature_padd">
			<div class="jtk-page-container">
				<div class="jtk-container">
					<script type="jtk" id="tmplTable">
						<div class="table node">

							<div class="name" title="${tableName}">
								<i class="iconfont icon-guanbi table-i-delete"></i>
								<span>${tableName}</span>
							</div>
							<ul class="table-columns">
								<r-each in="column">
									<r-tmpl id="tmplColumn" />
								</r-each>
							</ul>
						</div>
					</script>
					<script type="jtk" id="tmplColumn">
						<li class="table-column table-column-type-${hasOut} clearfix" data-port-id="${id}">
							<!--table-column-type-${datatype}   -->
							<div class="table-hasIn-${hasIn}">
							</div>
							<div class="table-name" title="${columnName}">${columnName}</div>
							<div class="table-hasOut-${hasOut}">
							</div>
							<jtk-source port-id="${id}" scope="${hasOut}" filter=".table-column" filter-exclude="true" />
							<jtk-target port-id="${id}" scope="${hasIn}" />
						</li>
					</script>
					<div class="jtk-demo-main" id="jtk-demo-dbase">
						<div class="jtk-demo-canvas">
							<!-- miniview -->
							<div class="miniview"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/js/jsplumbtoolkit.js'
	import { getDataForeignKeyUpdate } from "@/api/index.js";
	import { BIMsg } from "../../assets/js/tools.js";

	export default {
		porps: {

		},
		data() {
			return {
				dataList: [{
					"nodes": [],
					"edges": []
				}],
				removerId: [],
				foreignKeys: [],
				toolkit:null,
			}
		},
		components: {},
		computed: {
			themeColor() {
				return this.$store.state.themeColor;
			},
			foreignKeyList() {
				return this.$store.state.foreignKeyList
			}
		},
		watch: {
			foreignKeyList: {
				handler(newValue, oldValue) {
					//等左侧渲染完后再加载右侧的jsPlumb
					if(newValue) {
						setTimeout(() => {
							this.jsPlumbToolkitList()
						}, 0)
					}
				},
				deep: true
			},
		},
		methods: {
			jsPlumbToolkitList() {
				var _this = this;
				var falg = false;
				
				$(".jtk-lasso").remove(); //分配给鼠标的套索 每次进入都会增加 ，先删除一遍
				jsPlumbToolkit.ready(function() {
					var idFunction = function(n) {
						return n.id
					};
					var typeFunction = function(n) {
						return n.type;
					};
					var mainElement = document.querySelector("#jtk-demo-dbase"),
						//addName = $(".add_and_no"),
						addName = document.querySelector(".add_cancel_none"),
						canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
						miniviewElement = mainElement.querySelector(".miniview"),
						controls = mainElement.querySelector(".controls");
					_this.toolkit = jsPlumbToolkit.newInstance({ //识别表格列
						idFunction: idFunction,
						typeFunction: typeFunction,
						nodeFactory: function(type, data, callback, originalEvent) {
							//console.log(type,data,callback,originalEvent,originalEvent.data)
							var obj = $.extend(true, {}, originalEvent.data)
							obj.left = data.left;
							obj.top = data.top;
							obj.type = data.type
							callback(obj);
							//console.log(originalEvent.data)
							var eventForeignKey = originalEvent.data.foreignKey
							for(var f = 0; f < eventForeignKey.length; f++) {
								var eventForeignKeys = eventForeignKey[f];
								//console.log(eventForeignKeys)
								if(_this.foreignKeys.indexOf(eventForeignKeys.foreignKeyId) == -1) {
									_this.foreignKeys.push(eventForeignKeys.foreignKeyId)
								} else {
									var params = {
										"source": eventForeignKeys.mainTableId + "." + eventForeignKeys.mainColumnId,
										"target": eventForeignKeys.relTableId + "." + eventForeignKeys.relColumnId,
										"data": {
											"foreignKeyId": eventForeignKeys.foreignKeyId
										}
									}
									//console.log(params)
									_this.toolkit.addEdge(params)

								}
							}
							//"source":foreignKey[f].mainTableId +"."+foreignKey[f].mainColumnId,
							//		"target" :foreignKey[f].relTableId +"."+foreignKey[f].relColumnId,
							//toolkit.addEdge(params)
							refreshData()
						},
						edgeFactory: function(params, data, callback) { //边缘工厂
							callback(data);
						},
						portExtractor: function(data, node) { //识别端口节点  就是下面的子节点
							//console.log(data,node,"识别端口节点")
							return data.column || [];
						},
						portUpdater: function(data, node, ports) { //节点数据和端口数据同步
							return jsPlumb.extend(data, {
								column: jsPlumbToolkitUtil.map(ports, function(p) {
									return p.data;
								})
							});
						},
						beforeConnect: function(source, target) { //限制连接
							return source !== target && source.getNode() !== target.getNode();
						},
						portDataProperty: "column"
					});

					var renderer = window.renderer = _this.toolkit.render({
						container: canvasElement,
						enableWheelZoom: true, //是否启用缩放
						view: {
							nodes: {
								"table": {
									template: "tmplTable",
								}
							},
							edges: {
								"default": { //端点的颜色样式  一开始就连接的默认样式 或者叫连接上的默认样式
									anchor: ["Left", "Right"],
									Anchors: ["Right", "Left"],
									connector: "Flowchart",
									paintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									},
									hoverPaintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									},
									ConnectionsDetachable: false, //禁止鼠标拖动连线分离
									deleteEndpointsOnDetach: false, //禁止鼠标拖动连线分离
									detachable: false, //禁止鼠标拖动连线分离
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1, // no limit on connections
									events: {
										"click": function(params) {
											//console.log(params.edge)
											if(params.edge.data.foreignKeyId) {
												_this.removerId.push(params.edge.data.foreignKeyId)
											}
											_this.toolkit.removeEdge(params.edge); //删除连线
											refreshData()
										}

									},
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11,
										}],
										["Label", { //连线上的label
											location: 0.5,
											id: "label",
											cssClass: "aLabel",
										}]
									]
								}
							},
							ports: {
								"default": { //端点的颜色样式？  一开始就连接的默认样式 或者叫连接上的默认样式？
									template: "tmplColumn",
									anchor: ["Left", "Right"],
									Anchors: ["Right", "Left"],
									paintStyle: {
										fill: "",
										stroke: ""
									},
									hoverPaintStyle: {
										fill: "",
										stroke: ""
									},
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1, // no limit on connections
									//									dropOptions: { //用于配置元素的drop行为 就是鼠标点击和划入是如果能连接就显示背景
									//										hoverClass: "drop-hover"
									//									},
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11
										}]
									],
									allowLoopback: false, // 布尔值，指示是否可以对此类型的节点（从节点到它自己的连接）进行“环回”连接。默认为true。请注意，如果您有一个节点上有一些端口，则仍可以从其中一个端口创建到该节点的连接。为了防止这种情况，使用allowNodeLoopback:false。
									allowNodeLoopback: false, // 布尔值，指示是否可以在给定节点上的任何连接点之间建立“环回”连接。例如，您可能有一个本身可连接到其他节点的节点，其上可以单独连接的端口。将此参数设置为false可防止从该节点到其自身或其任何端口或从其任何端口到其他某个端口建立的任何连接。
									interceptors: {
										"beforeDrop": function(params) {
											var soure = params.connection.source.offsetParent.dataset.jtkNodeId
											var target = params.connection.target.offsetParent.dataset.jtkNodeId
											if(params.scope == "true" && soure != target) {
												return true
											} else {
												//console.log(params)
												return false
											}
										},
										"beforeDetach": function(params) {
											//										 	console.log(params)
										}
									},
								}
							}
						},
						//Absolute  绝对布局
						// Circular  圆；循环的
						//Hierarchical  分层机构，分层的
						// Spring  随机布局
						layout: {
							type: "Spring",
							parameters: {
								padding: [20, 100]
							}
						},
						miniview: {
							container: miniviewElement
						},
						events: {
							edgeAdded: function(params) { //拖动连线时所产生的开始端口和结束端口
								//								console.log(params)
								if(params.addedByMouse) {
									_this.toolkit.updateEdge(params.edge);
									refreshData()
								}
							},

							canvasClick: function(e) {
								_this.toolkit.clearSelection();
							},
							nodeMoveStart: function(node) {
								falg = true
								//移动前的节点
							},
							nodeMoveEnd: function(node) {
								if(falg) {
									//移动后的新位置
									refreshData()
									//移动后节点位置 	
								}
							},
							mouseout: function(params) {
								//								console.log(params, params.scope, params.getData);
								if(!params.getData && $('.jtk-drag-active').length > 0 && params.scope == "true") {
									//$('.table-column-type-' + "false").addClass('drop-hover')
								}
							},
							mouseup: function(params) {
								//console.log(params);
								//$('.table-column').removeClass('drop-hover')
							},
						},
						consumeRightClick: false,
						zoomToFit: false
					});
					renderer.registerDroppableNodes({ //拖拽
						droppables: $(".drag-li"),
						dragOptions: {
							zIndex: 50000,
							cursor: "move",
							clone: true
						},
						typeExtractor: function(el, eventInfo, isNativeDrag, eventLocation) {
							var obj = $(el).attr("data") //在这里获取到了数据
							//			            	console.log(obj)
							eventInfo.data = JSON.parse(obj)
							return el.getAttribute("jtk-node-type");
						},
						dataGenerator: function(type, draggedElement, eventInfo, eventLocation) {
							//			            	console.log(type)
							return {
								name: type
							};
						}
					});
					//删除功能
					jsPlumb.on(canvasElement, "click", ".table-i-delete", function() {
						var info = renderer.getObjectInfo(this);
						//console.log(info)
						_this.$confirm('你确定要删除该表吗？, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
							customClass: "change_Box",
						}).then(() => {
							_this.toolkit.removeNode(info.id);
						}).catch((err) => {
							console.log(err)
						});

					});
					jsPlumb.on(addName, "tap", ".add_none", function() { //保存 所拿到的数据  拿到有连接点的数据  当前连接的原始数据  
						var list = refreshData()
						//console.log(list)
						//调用接口
						_this.UpdataAjax(list.edges)
					});
					jsPlumb.on(addName, "tap", ".cance_none", function() { //取消重新加载数据
						_this.toolkit.clear()
					});

					_this.toolkit.load({
						data: _this.dataList
					});

					function refreshData() { //如果一个接口可以在这调用函数
						renderer.storePositionsInModel();
						var data = _this.toolkit.exportData();
						var oldArr = data.edges
						var allArr = []
						$.each(oldArr, function(i, v) {
							var flag = true;
							if(allArr.length > 0) {
								$.each(allArr, function(n, m) {
									if(allArr[n].source == oldArr[i].source && allArr[n].target == oldArr[i].target) {
										flag = false;
									};
								});
							};
							if(flag) {
								allArr.push(oldArr[i]);
							};
						});
						data.edges = allArr
						return data
						//	                	sessionStorage.setItem("jsPlumbDataTwo", JSON.stringify(data))
					}
				});
			},
			UpdataAjax(data) {
				//console.log(data)
				//console.log(this.removerId)
				$.unique(this.removerId)
				var arr = []
				for(var i = 0; i < data.length; i++) {
					if(!data[i].data.foreignKeyId) {
						var arrObj = {}
						arrObj.mainColumnId = data[i].source.split(".")[1]
						arrObj.relColumnId = data[i].target.split(".")[1]
						arr.push(arrObj)
					}
				}
				getDataForeignKeyUpdate({
					"userId": this.$root.userId,
					"upsertKeys": arr, //新增（修改）的外键列表
					"deleteKeyIds": $.unique(this.removerId), //删除外键id列表

				}).then(data => {
					//console.log(data)
					BIMsg({
						message: "保存成功",
						type: 'success'
					})
				}).catch(err => {
					console.log(err)
				})

			},

		},
		mounted() {
		},
	}
</script>

<style>
	@import url("../../assets/css/jsplumbtoolkit-defaults.css");
	@import url("../../assets/css/jsplumbtoolkit-demo.css");
	@import url("../../assets/css/app.css");
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	.listigature_padd {
		position: relative;
		min-height: calc(100vh - 343px);
		border-radius: 10px;
		background: white;
		.jtk_listigature_padd {
			min-height: calc(100vh - 343px);
		}
		.listigature_padd_name {
			height: 83px;
			line-height: 83px;
			padding: 0 40px;
			span {
				font-size: 20px;
				font-weight: 700;
				color: #333333;
			}
		}
		.add_cancel_none {
			position: absolute;
			z-index: 100;
			right: 40px;
			top: 0;
		}
	}
</style>