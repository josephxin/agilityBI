<template>
	<div class="entity_jsplumb">
		<div class="jtk-bootstrap jtk-bootstrap-wide jtk_entity_jsplumb">
			<div class="jtk-page-container">
				<div class="jtk-container">
					<script type="jtk" id="tmplTable">
						<div class="table node">
							<div class="name">
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
						<li class="table-column table-column-type-${hasOut}" data-port-id="${id}">
							<!--table-column-type-${datatype}   -->
							<div class="entityJsplumb_input clearfix">
								<input type="checkbox" data-id="${id}" />
								<span></span>
							</div>

							<div title="${columnName}" class="column_name">${columnName}</div>
							<jtk-source port-id="${id}" scope="${hasOut}" filter=".entityJsplumb_input, .entityJsplumb_input input,.entityJsplumb_input span" filter-exclude="true" />
							<!--class="cover"-->
							<jtk-target port-id="${id}" scope="${hasIn}" />
						</li>
					</script>
					<div class="jtk-demo-main" id="jtk-demo-dbase-entity">
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
	import { mapState } from "vuex";
	import '../../assets/js/jsplumbtoolkit.js'
	import { BIMsg } from '../../assets/js/tools.js'
	
	export default {
		components: {},
		porps: {

		},
		data() {
			return {
				//toolkit: null,
				dataList: {},
				foreignKeys: [],
			}
		},
		computed: {
			...mapState(["themeColor", "foreignKeyList", "entityLeftList", "entityDataObj", "commonArr"]),
		},
		watch: {
			foreignKeyList: {
				handler(newValue, oldValue) {
					if(newValue) {
						setTimeout(() => {
							this.jsPlumbToolkitList()
						}, 0)
					}
				},
				deep: true
			},
			entityLeftList: {
				handler(newValue, oldValue) {
					//console.log("entityLeftList，监听中间部分数组的变化", newValue) 
					this.foreignKeys = [];
					this.$root.toolkit.clear()
					if(newValue.length==0){
						this.$store.commit("changeCommonArr", [])
						return;
					}
					
					var arrList = {
						"nodes": [],
						"edges": []
					}
					for(var i = 0; i < newValue.length; i++) {
						arrList.nodes.push($.extend(true, {
							"type": "table"
						}, newValue[i]));
					}
					this.$root.toolkit.load({
						data: arrList
					})
					// 处理外键的循环，为了连线
					for(var i = 0; i < newValue.length; i++) {
						var foreignKeys = newValue[i].foreignKey;
						for(var j = 0; j < foreignKeys.length; j++) {
							var foreignKey = foreignKeys[j];
							//console.log(foreignKey.foreignKeyId)
							if(this.foreignKeys.indexOf(foreignKey.foreignKeyId) == -1) {
								this.foreignKeys.push(foreignKey.foreignKeyId)
							} else {
								var params = {
									"source": foreignKey.mainTableId + "." + foreignKey.mainColumnId,
									"target": foreignKey.relTableId + "." + foreignKey.relColumnId,
									"data": {
										"foreignKeyId": foreignKey.foreignKeyId
									}
								}
								this.$root.toolkit.addEdge(params)
							}
						}
					} 
					// 得到右侧table数据，为了选中列
					setTimeout(() => {
						var includeTables = this.entityDataObj.includeTable
						var commonArr = []
						for(var i = 0; i < includeTables.length; i++) {
							var attrs = includeTables[i].attr;
							var tableId = includeTables[i].tableId;
							var tableName = includeTables[i].tableName;
							for(var j = 0; j < attrs.length; j++) {
								var columnId = attrs[j].columnId
								commonArr.push({
									'tableId': tableId,
									'tableName': tableName,
									'attrName': attrs[j].attrName,
									'columnId': columnId,
									'columnName': attrs[j].columnName,
									"toggle": true,
								})
								$('.table-columns input').each((index, item) => {
									//console.log(index, item)
									if($(item).data('id') == columnId) {
										$(item).attr('checked', true)
									}
								})
							}
						}
						// 为了显示右侧实体属性
						this.$store.commit("changeCommonArr", commonArr)
					}, 0)
				},
				deep: true
			}
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
					var mainElement = document.querySelector("#jtk-demo-dbase-entity"),
						//addName = $(".add_and_no"),
						//addName = document.querySelector(".add_cancel_none"),
						//entityName = $(".elc_content"),
						canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
						miniviewElement = mainElement.querySelector(".miniview");
						//controls = mainElement.querySelector(".controls");
					_this.$root.toolkit = jsPlumbToolkit.newInstance({ //识别表格列
						idFunction: idFunction,
						typeFunction: typeFunction,
						nodeFactory: function(type, data, callback, originalEvent) {
							if($(".elc_content li").hasClass("is_active")) {
								var obj = $.extend(true, {}, originalEvent.data)
								obj.left = data.left;
								obj.top = data.top;
								obj.type = data.type
								callback(obj);

								var tookitGetNodeList = []
								var tookitGetNode = _this.$root.toolkit.getNodes()
								for(var i = 0; i < tookitGetNode.length; i++) {
									tookitGetNodeList.push(tookitGetNode[i].data)
								}
								//_this.dataList.includeTable = tookitGetNodeListsss
								//console.log(_this.dataList)
								//_this.$store.commit("changeEntityListName",_this.dataList)
								_this.$store.commit("changeEntityRightList", tookitGetNodeList)

								var eventForeignKey = originalEvent.data.foreignKey
								//console.log('拖拽进来的外键数组：', eventForeignKey)
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
										_this.$root.toolkit.addEdge(params)

									}
								}

							} else {
								BIMsg({
									message: '请先选择实体！',
									type: 'info'
								})
								return false
							}

						},
						edgeFactory: function(params, data, callback) { //边缘工厂
							callback(data);
						},
						portExtractor: function(data, node) { //识别端口节点  就是下面的子节点
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

					var renderer = window.renderer = _this.$root.toolkit.render({
						container: canvasElement,
						enableWheelZoom: true, //是否启用缩放
						view: {
							nodes: {
								"table": {
									template: "tmplTable",
								}
							},
							edges: {
								"default": { //端点的颜色样式？  一开始就连接的默认样式 或者叫连接上的默认样式？
									anchor: ["Left", "Right"],
									Anchors: ["Right", "Left"],
									connector: "Flowchart",
									paintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									}, // the endpoint's appearance
									hoverPaintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									},
									ConnectionsDetachable: false, //禁止鼠标拖动连线分离
									deleteEndpointsOnDetach: false, //禁止鼠标拖动连线分离
									detachable: false, //禁止鼠标拖动连线分离
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1, // no limit on connections
									elementsDraggable: false,
									events: {
										"click": function(params) {
											_this.$root.toolkit.removeEdge(params.edge); //删除连线
											//refreshData()
										}

									},
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11,
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
									}, // the endpoint's appearance
									hoverPaintStyle: {
										fill: "",
										stroke: ""
									},
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1, // no limit on connections
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
											//返回false  无法连接
											return false
											/*var soure = params.connection.source.offsetParent.dataset.jtkNodeId
											var target = params.connection.target.offsetParent.dataset.jtkNodeId
											if(params.scope == "true" && soure != target) {
												return true
											} else {
												console.log(params)
												return false
											}*/

											// returning anything but true will cause the connection to be aborted.
										},
										"beforeDetach": function(params) {
											//console.log(params)
											// returning anything but true will cause the detach to be aborted.
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
							type: "Hierarchical",
							parameters: {
								padding: [20, 100]
							}
						},
						miniview: {
							container: miniviewElement
						},
						events: {
							edgeAdded: function(params) { //拖动连线时所产生的开始端口和结束端口
								//console.log(params)
								if(params.addedByMouse) {
									_this.$root.toolkit.updateEdge(params.edge);
									//refreshData()
								}
							},

							canvasClick: function(e) {
								_this.$root.toolkit.clearSelection();
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
							eventInfo.data = JSON.parse(obj)
							return el.getAttribute("jtk-node-type");
						},
						dataGenerator: function(type, draggedElement, eventInfo, eventLocation) {
							return {
								name: type
							};
						}
					});
					
					//实体配置页-复选框的点击事件
					jsPlumb.on(canvasElement, "click", ".table-columns li input", function() {
						var info = renderer.getObjectInfo(this);
						//console.log(info, this, $(this).is(':checked'));
						if(!$(this).is(':checked')) {
							for(var i = 0; _this.commonArr.length; i++) {
								if(_this.commonArr[i].columnId == info.id) {
									_this.commonArr.splice(i, 1)
									_this.$store.commit("changeCommonArr", _this.commonArr)
									return;
								}
							}
						} else {
							var tableId = info.obj.getNode().data.id
							var tableName = info.obj.getNode().data.tableName
							_this.commonArr.push({
								'tableId': tableId,
								'tableName': tableName,
								'attrName': info.obj.data.columnName,
								'columnId': info.id,
								'columnName': info.obj.data.columnName,
								"toggle": true,
							})
							_this.$store.commit("changeCommonArr", _this.commonArr)
						}
					});

					//console.log(renderer,renderer.Surface)
					function refreshData() { //如果一个接口可以在这调用函数
						renderer.storePositionsInModel();
						var data = _this.$root.toolkit.exportData();
						//console.log(data)
						//sessionStorage.setItem("entityJsPlumb", JSON.stringify(data))
					}
				});
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
	.entity_jsplumb {
		.jtk_entity_jsplumb{
			min-height: calc(100vh - 343px);
		}
		flex: 1;
		padding: 0 19px 30px 40px;
	}
</style>