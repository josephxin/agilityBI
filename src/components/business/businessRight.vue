<template>
	<div class="business_right_content">
		<div class="brc_linked">
			<div class="jtk-bootstrap jtk-bootstrap-wide">
				<div class="jtk-page-container">
					<div class="jtk-container">
						<script type="jtk" id="tmplTable">
							<div class="table node" style="left:${left}px;top:${top}px;">
								<div class="name">
									<span>${name}</span>
								</div>
								<ul class="table-columns">
									<r-each in="columns">
										<r-tmpl id="tmplColumn" />
									</r-each>
								</ul>
							</div>
						</script>
            <!-- table column template -->
            <script type="jtk" id="tmplColumn">
							<li class="table-column table-column-type-${datatype}" primary-key="${primaryKey}" data-port-id="${id}">
								<div><span>${id}</span></div>
								<jtk-source port-id="${id}" scope="${datatype}" filter=".table-column-delete, .table-column-delete-icon, span, .table-column-edit, .table-column-edit-icon" filter-exclude="true"  class="cover"/>
								<jtk-target port-id="${id}" scope="${datatype}" />
							</li>
						</script>
						<!--左边的圆-->
						<script type="jtk" id="tmplStart">
							<div style="left:${left}px;top:${top}px;width:${w}px;height:${h}px;" class="flowchart-object flowchart-start ">
								<div style="position:relative">
									<svg:svg width="${w}" height="${h}">
										<svg:ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" class="outer" />
										<svg:ellipse cx="${w/2}" cy="${h/2}" rx="${(w/2) - 15}" ry="${(h/2) - 15}" class="inner" />
										<svg:text text-anchor="middle" x="${ w / 2 }" y="${ h / 2 }" dominant-baseline="central" class="haha">${name}</svg:text>
									</svg:svg>
								</div>
								<jtk-source port-type="start" filter=".outer" filter-negate="true" scope="${datatype}" port-id="${id}"></jtk-source>
							</div>
						</script>

						<div class="jtk-demo-main" id="jtk-demo-dbase_add">
							<div class="jtk-demo-canvas">

								<div class="add_cancel_none">
									<button class="add_none el-btn save">保存</button>
									<button class="cance_none el-btn cancel">取消</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '../../assets/js/jsplumbtoolkit.js'
	export default {
		components: {},
		data() {
			return {
				dataList: {
					"nodes": [{
							"id": "start",
							"type": "start",
							"name": "销售收入",
							"datatype": "varchar",
							"w": 140,
							"h": 140,
							"left": 0,
							"top": 50
						},{
							"id": "book",
							"name": "企业信息",
							"type": "table",
							"left": 200,
							"top": 100,
							"columns": [{
									"id": "企业ID",
									"name": "我是企业ID的名字",
									"datatype": "integer",
									"primaryKey": true
								},{
									"id": "企业名称",
									"datatype": "varchar"
								},{
									"id": "企业地址",
									"datatype": "varchar"
								},{
									"id": "主营业务",
									"datatype": "varchar"
								}]
						},{
							"id": "book_author",
							"name": "投资情况",
							"type": "table",
							"left": 400,
							"top": 100,
							"columns": [{
									"id": "投资方名称",
									"datatype": "integer"
								},{
									"id": "被投资方名称",
									"datatype": "integer"
								},{
									"id": "投资金额",
									"datatype": "integer"
								},{
									"id": "到账时间",
									"datatype": "integer"
								}]
						},{
							"id": "author",
							"name": "商业服务",
							"type": "table",
							"left": 600,
							"top": 100,
							"columns": [{
									"id": "代码",
									"datatype": "integer",
									"primaryKey": true
								},{
									"id": "名称",
									"datatype": "varchar"
								},{
									"id": "标志位",
									"datatype": "varchar"
								},{
									"id": "类别",
									"datatype": "varchar"
								}]
						},{
							"id": "publisher",
							"name": "部门信息",
							"type": "table",
							"left": 900,
							"top": 100,
							"columns": [{
									"id": "员工id",
									"datatype": "integer",
									"primaryKey": true
								},{
									"id": "员工名称",
									"datatype": "varchar"
								},{
									"id": "员工年龄",
									"datatype": "varchar"
								},{
									"id": "员工职位",
									"datatype": "varchar"
								},{
									"id": "所在门店",
									"datatype": "varchar"
								}]
						},{
							"id": "book_publisher",
							"name": "地区",
							"type": "table",
							"left": 100,
							"top": 400,
							"columns": [{
									"id": "地区代号",
									"datatype": "integer"
								},{
									"id": "省",
									"datatype": "integer"
								},{
									"id": "市",
									"datatype": "integer"
								},{
									"id": "县",
									"datatype": "integer"
								}]
						},{
							"id": "book_pdd",
							"name": "投资情况",
							"type": "table",
							"left": 300,
							"top": 400,
							"columns": [{
									"id": "投资方名字",
									"datatype": "integer"
								},{
									"id": "被投资方名称",
									"datatype": "integer"
								},{
									"id": "投资金额",
									"datatype": "integer"
								},{
									"id": "到账时间",
									"datatype": "integer"
								}]
						}],
					"edges": [{
							"source": "book.id",
							"target": "book_author.book_id"
						},{
							"source": "author.id",
							"target": "book_author.author_id"
						}]
				},
				exper:{},
				content:{},
				name:{},
				add:false,
			}
		},

		computed: {
			themeColor() {
				return this.$store.state.themeColor;
			},
		},
		watch: {

		},
		methods: {
			jsPlumbToolkits(dataList,typeLeft) {
				$(".jtk-lasso").remove();
				var _this = this;
				var falg = false;
				jsPlumbToolkit.ready(function() {
					var arrNode; //存储圆的父级找不到
					var idFunction = function(n) {
						return n.id;
					};
					var typeFunction = function(n) {
						return n.type;
					};
					var mainElement = document.querySelector("#jtk-demo-dbase_add"), //id 不能重名 否则会出问题
						//						addName = $(".add_and_no"),
						leftTermList = $(".term-list"),
						leftDataList = $(".term-list-content"),
						addName = document.querySelector(".add_cancel_none"),
						canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
						miniviewElement = mainElement.querySelector(".miniview"),
						controls = mainElement.querySelector(".controls");

					var toolkit = jsPlumbToolkit.newInstance({ //识别表格列
						idFunction: idFunction,
						typeFunction: typeFunction,

						edgeFactory: function(params, data, callback) { //边缘工厂
							callback(data);
						},
						portExtractor: function(data, node) { //识别端口节点  就是下面的子节点
							return data.columns || [];
						},
						portUpdater: function(data, node, ports) { //节点数据和端口数据同步
							if(data.type == "start") {
								arrNode = node
								//node  是父级
								//ports 是子级
							}
							return jsPlumb.extend(data, {
								columns: jsPlumbToolkitUtil.map(ports, function(p) {
									return p.data;
								})
							});
						},
						beforeConnect: function(source, target) { //限制连接
							return source !== target && source.getNode() !== target.getNode();
						}
					});
					var renderer = window.renderer = toolkit.render({
						container: canvasElement,
						doNotUpdateOriginalData:true,
						enableWheelZoom: false, //是否启用缩放
						view: {
							nodes: {
								"table": {
									template: "tmplTable"
								},
								"start": {
									template: "tmplStart"
								}
							},
							edges: {
								"common": {
									events: {
										"click": function(params) {
											toolkit.removeEdge(params.edge);
											refreshData()
										}
									},
									Anchors: ["Right", "Left"],
									anchor: ["Left", "Right"], // anchors for the endpoints   连接点是在哪个方向 端点的定点位置声明
									connector: "Flowchart", //  StateMachine connector type
									cssClass: "common-edge",
									paintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									}, // the endpoint's appearance
									hoverPaintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									},
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11,
											events: {
												click: function() {}
											}
										}],
										["Label", { //连线上的label
											location: 0.5,
											id: "label",
											cssClass: "aLabel",
										}]
									]
								},
								"default": { //端点的颜色样式？  一开始就连接的默认样式 或者叫连接上的默认样式？
									//template: "tmplColumn",
									anchor: ["Left", "Right"],
									Anchors: ["Right", "Left"],
									connector: "Flowchart",
									ConnectionsDetachable: false, //禁止鼠标拖动连线分离
									deleteEndpointsOnDetach: false, //禁止鼠标拖动连线分离
									detachable: false, //禁止鼠标拖动连线分离
									paintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									}, // the endpoint's appearance
									hoverPaintStyle: {
										fill: _this.themeColor,
										stroke: _this.themeColor
									},
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1, // no limit on connections
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11
										}] //在這加label默認顯示有刪除按鈕
									]

								}
							},
							ports: {
								"default": { //端点的颜色样式？  一开始就连接的默认样式 或者叫连接上的默认样式？
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
									ConnectionsDetachable: false, //禁止鼠标拖动连线分离
									deleteEndpointsOnDetach: false, //禁止鼠标拖动连线分离
									detachable: false, //禁止鼠标拖动连线分离
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

								},
								"start": {
									template: "tmplStart",
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
									}, // appearance when mouse hovering on endpoint or connection  鼠标经过线的样式
									ConnectionsDetachable: false, //禁止鼠标拖动连线分离
									deleteEndpointsOnDetach: false, //禁止鼠标拖动连线分离
									detachable: false, //禁止鼠标拖动连线分离
									edgeType: "common", // 从这个端口类型连接的连接的类型
									maxConnections: -1,
									allowLoopback: false,
									allowNodeLoopback: false,
									overlays: [
										["Arrow", {
											location: 1,
											visible: true,
											width: 11,
											length: 11
										}]
									]
								}
							},

						},
						//Absolute 绝对布局
						// Circular  圆；循环的
						//Hierarchical  分层机构，分层的
						// Spring  随机布局
						layout: {
							type: "Spring",
							parameters: {
								padding: [10, 10],
							},
							//							magnetize:true
						},
						events: {
							edgeAdded: function(params) { //拖动连线时所产生的开始端口和结束端口
								//console.log(params)
								if(params.addedByMouse) {
									toolkit.updateEdge(params.edge);
									refreshData() //sessionStorage
								}
							},
							canvasClick: function(e) {
								toolkit.clearSelection();
							},
							nodeMoveStart: function(node) {
								falg = true
								//移动前的节点
							},
							nodeMoveEnd: function(node) {
								if(falg) {
									//移动后的新位置
									refreshData()
								}
							},
							mouseout: function(params) {
								if(!params.getData && $('.jtk-drag-active').length > 0) {
									$('.table-column-type-' + params.scope).addClass('drop-hover')
								}
							},
							mouseup: function(params) {
								//console.log(params);
								$('.table-column').removeClass('drop-hover')
							},
						},
						consumeRightClick: false,
						zoomToFit: false
					});
					jsPlumb.on(addName, "tap", ".add_none", function() { //保存 所拿到的数据  拿到有连接点的数据  当前连接的原始数据
//						refreshData()
					});

//					jsPlumb.on(leftTermList, "tap", "ul li", function() {
//						//点击增加的样式但是只是增加不能改
//						var isname = this.innerText
//						//var a  = $(".flowchart-object .haha").html(isname) //只改name
//						$(".flowchart-object").css({
//							"display": "block"
//						})
//						//console.log(arrNode)
//						toolkit.updateNode(arrNode, { //好像可以改id
//							w: 140,
//							h: 140,
//							left: 0,
//							top: 50,
//							name: isname,
//						});
//					})
//					toolkit.load({
//						data: sessionStorage.getItem("jsPlumbData") ? JSON.parse(sessionStorage.getItem("jsPlumbData")) : _this.dataList
//					});
					toolkit.load({
						data:dataList
					});
					function refreshData() { //如果一个接口可以在这调用函数
						renderer.storePositionsInModel();
						var data = toolkit.exportData();
//						console.log(data)
						sessionStorage.setItem("jsPlumbData", JSON.stringify(data))
					}
				});
			},
			addList(approve){
				var _this = this;
				var commonObj = approve ? approve :{}; //点击所保存的数据
				$(document).on("click", ".business_title", function(){  //左边想、点击出来圆的
					var data = $(this).attr("data-item")
					var obj  = JSON.parse(data)
		    		$(".jtk-surface-canvas").remove()
		    		$(".jtk-surface-pan").remove()
		    		$(".jtk-lasso").remove()
		    		if(JSON.stringify(obj) != '{}'){
			    		if(commonObj.nodes){
			    			commonObj.nodes.map((item,index)=>{
			    				if(item.type == "start"){

			    				}else if(item.type == "table"){
			    					obj.nodes.push(item)
			    				}
			    			})
			    		}
		    		}
		    		commonObj = obj
					_this.jsPlumbToolkits(obj)
		    	})
				$(".term-list-content").on("click","p",function(){//左侧出来表的
		    		var data = $(this).attr("data-item")
					var obj  = JSON.parse(data)
		    		$(".jtk-surface-canvas").remove()
		    		$(".jtk-surface-pan").remove()
		    		$(".jtk-lasso").remove()
		    		if(JSON.stringify(obj) != '{}'){
			    		if(commonObj.nodes){
			    			commonObj.nodes.map((item,index)=>{
			    				if(item.type == "start"){
			    					obj.nodes.push(item)
			    				}else if(item.type == "table"){

			    				}
			    			})
			    		}
		    		}
		    		commonObj = obj
		    		_this.jsPlumbToolkits(obj)
		    	})
				this.jsPlumbToolkits(approve)
			},
		},
		created() {

		},
		mounted() {

			var leftCircle = $(".business_title")[0];
			var leftList = $(".term-list-content p")[0];
			var circleObj = JSON.parse($(leftCircle).attr("data-item"))
			var listObj =JSON.parse($(leftList).attr("data-item")) ;
			var obj = {}
			listObj.nodes.push(circleObj.nodes[0])
			this.addList(listObj);
			
		},

	}
</script>
<style type="text/css">
	@import url("../../assets/css/jsplumbtoolkit-defaults.css");
	@import url("../../assets/css/jsplumbtoolkit-demo.css");
	@import url("../../assets/css/app.css");
</style>
<style scoped lang="scss" rel="stylesheet/scss">
	.business_right_content {
		.brc_linked {
			min-height: calc(100vh - 230px);
			border-radius: 10px;
			background: $white;
			box-sizing: border-box;
		}
	}
</style>
