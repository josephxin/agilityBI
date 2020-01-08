;
(function () {
    jsPlumbToolkit.ready(function () {
		//debugger
// ------------------------ toolkit setup ------------------------------------

        // This function is what the toolkit will use to get an ID from a node.
        var idFunction = function (n) {
//      	console.log(n)
            return n.id;
        };

        // This function is what the toolkit will use to get the associated type from a node.
        var typeFunction = function (n) {
//      	console.log(n)
            return n.type;
        };

        // get the various dom elements
        var mainElement = document.querySelector("#jtk-demo-dbase"),
            canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
            miniviewElement = mainElement.querySelector(".miniview"),
//          nodePalette = mainElement.querySelector(".node-palette"), //左侧的li的
            controls = mainElement.querySelector(".controls");

        // Declare an instance of the Toolkit, and supply the functions we will use to get ids and types from nodes.
        var toolkit = jsPlumbToolkit.newInstance({  //识别表格列
            idFunction: idFunction,
            typeFunction: typeFunction,
            nodeFactory: function (type, data, callback) {
                data.columns = [];
                jsPlumbToolkit.Dialogs.show({
                    id: "dlgName",
                    title: "Enter " + type + " name:",
                    onOK: function (d) {
                        data.name = d.name;
                        // if the user entered a name...
                        if (data.name) {
                            if (data.name.length >= 2) {
                                // generate an id: replace spaces with underscores, and make lower case
                                data.id = data.name.replace(" ", "_").toLowerCase();
                                callback(data);
                            }
                            else
                                alert(type + " names must be at least 2 characters!");
                        }
                        // else...do not proceed.
                    }
                });
            },
            edgeFactory: function (params, data, callback) {
                // you must hit the callback if you provide the edgeFactory.
                callback(data);
                // unless you want to return false, to abandon the edge
                //return false;
            },
            //
            // For a given Node, return the parts of its dataset that we want to configure as Ports.
            // This is called when the data is being loaded. It is an optional argument to the newInstance
            // method.
            //
            portExtractor: function (data, node) {
                return data.columns || [];
            },
            //
            // Called after a port is updated, removed or added. Gives us an opportunity to keep the node's backing data
            // up to date with the ports and their data.
            //
            portUpdater:function(data, node, ports) {
                return jsPlumb.extend(data, {
                    columns:jsPlumbToolkitUtil.map(ports, function(p) { return p.data; })
                });
            },
            //
            // Prevent connections from a column to itself or to another column on the same table.
            //
            beforeConnect:function(source, target) {
                return source !== target && source.getNode() !== target.getNode();
            }
        });

// ------------------------ / toolkit setup ------------------------------------

// ------------------------- dialogs -------------------------------------

        jsPlumbToolkit.Dialogs.initialize({
            selector: ".dlg"
        });

// ------------------------- / dialogs ----------------------------------


// ------------------------ rendering ------------------------------------

        // Instruct the toolkit to render to the 'canvas' element. We pass in a model of nodes, edges and ports, which
        // together define the look and feel and behaviour of this renderer.  Note that we can have 0 - N renderers
        // assigned to one instance of the Toolkit..
        //指导工具包呈现给“画布”元素。我们传递一个节点，边和端口的模型，
		//一起定义这个渲染器的外观和行为。注意，我们可以有0-N渲染器
		//分配给工具包的一个实例。
        var renderer = window.renderer = toolkit.render({
            container: canvasElement,
            enableWheelZoom:false, //是否启用缩放
            view: {
                // Two node types - 'table' and 'view'
                nodes: {
                    "table": {
                        template: "tmplTable"
                    },
                },
                // Three edge types  - '1:1', '1:N' and 'N:M',
                // sharing  a common parent, in which the connector type, anchors
                // and appearance is defined.
                //三种边缘类型，“1:1”，“1:N”和“N:M”，
				//共享一个共同的父类，其中连接器类型、锚点
				//外观是定义的。
                edges: {
                    "common": {
                    	 Anchors: ["Right", "Left"],
                        anchor: [ "Left", "Right" ], // anchors for the endpoints   连接点是在哪个方向 端点的定点位置声明
                        connector: "Flowchart",  //  StateMachine connector type
                        cssClass:"common-edge",
                       	paintStyle: { fill: "red" ,stroke:"red"},		// the endpoint's appearance
                        hoverPaintStyle: { fill:"red" ,stroke:"red"},
                        overlays:[
                         	["Arrow", {  
					            location: 1,
					            visible: true,
					            width: 11,
					            length: 11,
					            events: {
					                click: function () {
					                }
					            }
					        }],
					        [ "Label", {//连线上的label
				                location: 0.5,
				                id: "label",
				                cssClass: "aLabel",
				            }]
                        ]
                    },
                },
                // There is only one type of Port - a column - so we use the key 'default' for the port type
                // Here we define the appearance of this port,
                // and we instruct the Toolkit what sort of Edge to create when the user drags a new connection
                // from an instance of this port. Note that we here we tell the Toolkit to create an Edge of type
                // 'common' because we don't know the cardinality of a relationship when the user is dragging. Once
                // a new relationship has been established we can ask the user for the cardinality and update the
                // model accordingly.
                //只有一种类型的端口——一列——所以我们使用端口类型的键“缺省值”
				//这里我们定义了这个端口的外观，
				//我们指示工具箱，当用户拖动一个新的连接时，要创建什么样的边缘
				//来自这个港口的一个实例。注意，我们在这里告诉工具箱创建一个类型的边缘
				//“常见”，因为当用户拖拽时，我们不知道关系的基数。一次
				//一种新的关系已经建立，我们可以询问用户的基数，并更新
				//相应的模型。
                ports: {
                    "default": {  //端点的颜色样式？  一开始就连接的默认样式 或者叫连接上的默认样式？
//                      template: "tmplColumn",
                        anchor: [ "Left", "Right" ],
                         Anchors: ["Right", "Left"],
                        paintStyle: { fill: "" },		// the endpoint's appearance
                        hoverPaintStyle: { fill:"" }, // appearance when mouse hovering on endpoint or connection  鼠标经过线的样式
                        edgeType: "common", // the type of edge for connections from this port type 从这个端口类型连接的连接的类型
                        maxConnections: -1, // no limit on connections
                        dropOptions: {  //drop options for the port. here we attach a css class.  用于配置元素的drop行为 就是鼠标点击和划入是如果能连接就显示背景
                            hoverClass: "drop-hover"
                        },
                        allowLoopback: false,   // do not allow loopback connections from a port to itself.
                        allowNodeLoopback:false, // do not allow connections from this port to any other port on the same node.
//                      events: {
//                          "dblclick": function () {
//                              console.log(arguments);
//                          }
//                      },
                        overlays:[
                         	["Arrow", {  
					            location: 1,
					            visible: true,
					            width: 11,
					            length: 11,
					            events: {
					                click: function () {
					                	console.log(1)
					                }
					            }
					        }]
                        ]
                    }
                }
            },
            // Layout the nodes using a 'Spring' (force directed) layout. This is the best layout in the jsPlumbToolkit
            // for an application such as this.
            layout: {
                type: "Spring",
                parameters: {
                    padding: [20, 20]
                }
            },
//          miniview: {
//              container: miniviewElement
//          },
            // Register for certain events from the renderer. Here we have subscribed to the 'nodeRendered' event,
            // which is fired each time a new node is rendered.  We attach listeners to the 'new column' button
            // in each table node.  'data' has 'node' and 'el' as properties: node is the underlying node data,
            // and el is the DOM element. We also attach listeners to all of the columns.
            // At this point we can use our underlying library to attach event listeners etc.
            events: {
//                 This is called by the Toolkit when a new Port is added to a Node. In this application, that occurs
//                 when the user adds a new column to a table. It is instigated by the application code preparing the
//                 JS data for a new column, and then calling toolkit.portAdded(node, portData); Note that the
//                 application also adds the data to the backing model itself.
//                 In this application, the portElement was rendered by the 'tmplColumn' template, and it is an LI.
//                 the nodeElement was rendered by 'tmplTable', and it has a UL inside of it to which we want to attach
//                 the column's LI.
                portAdded: function (params) {
//              	console.log(params)
                    params.nodeEl.querySelectorAll("ul")[0].appendChild(params.portEl);
                },
                edgeAdded: function (params) {
//              	console.log(params)
                    // Check here that the edge was not added programmatically, ie. on load.
                    if (params.addedByMouse) {
//                  	console.log(params.edge.data)
//                      _editEdge(params.edge, true);  //调用对话框
                         toolkit.updateEdge(params.edge);
                    }
                },
                canvasClick: function (e) {
                    toolkit.clearSelection();
                }
            },
            dragOptions: { //用于拖拽元素的参数
//              filter: "i, .view .name span, .table .name span, .table-column *"
            },
            consumeRightClick: false,
            zoomToFit:false
        });

        // listener for mode change on renderer.
        renderer.bind("modeChanged", function (mode) {
            jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
            jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
        });


// ------------------------- behaviour ----------------------------------

        // delete column button  删除列按钮
//      jsPlumb.on(canvasElement, "tap", ".table-column-delete, .table-column-delete i", function () {
////      	//debugger
//          var info = renderer.getObjectInfo(this);
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgConfirm",
//              data: {
//                  msg: "我要删除列'" + info.id + "'" //弹窗
//              },
//              onOK: function (data) {
//                  toolkit.removePort(info.obj.getNode(), info.id);  //删除列
//              },
//              onOpen:function(el) {
//                  console.dir(el);
//              }
//          });
//      });

        // add new column to table  将新列添加到表中
//      jsPlumb.on(canvasElement, "tap", ".new-column, .new-column i", function () {
////      	//debugger
//          var // getObjectInfo is a helper method that retrieves the node or port associated with some
//              // element in the DOM.
//              info = renderer.getObjectInfo(this);
//
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgColumnEdit",
//              title: "Column Details",
//              onOK: function (data) {
//                  // if the user supplied a column name, tell the toolkit to add a new port, providing it the
//                  // id and name of the new column.  This will result in a callback to the portFactory defined above.
//                  if (data.id) {
//                      if (data.id.length < 2)
//                          alert("Column ids must be at least 2 characters!");
//                      else {
//                          toolkit.addNewPort(info.id, "column", {
//                              id: data.id.replace(" ", "_").toLowerCase(),
//                              primaryKey: data.primaryKey,
//                              datatype: data.datatype
//                          });
//                      }
//                  }
//              }
//          });
//      });

        // delete a table or view  删除表或视图
//      jsPlumb.on(canvasElement, "tap", ".delete i, .view-delete i", function () {
//      	//debugger
//          var info = renderer.getObjectInfo(this);
//
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgConfirm",
//              data: {
//                  msg: "Delete '" + info.id
//              },
//              onOK: function (data) {
//                  toolkit.removeNode(info.id);
//              }
//          });
//
//      });

        // edit a view's query 编辑视图的查询
//      jsPlumb.on(canvasElement, "tap", ".view .edit i", function () {
////      	//debugger
//          var info = renderer.getObjectInfo(this);
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgViewQuery",
//              data: info.obj.data,
//              onOK: function (data) {
//                  // update data, and UI (which works only if you use the Toolkit's default template engine, Rotors.
//                  toolkit.updateNode(info.obj, data);
//              }
//          });
//      });

        // change a view or table's name  //修改头部的名称
//      jsPlumb.on(canvasElement, "tap", ".view .name span, .table .name span", function () {
//      	//debugger
//          // getObjectInfo is a method that takes some DOM element (this function's `this` is
//          // set to the element that fired the event) and returns the toolkit data object that
//          // relates to the element.
//          var info = renderer.getObjectInfo(this);
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgName",
//              data: info.obj.data,
//              title: "Edit " + info.obj.data.type + " name",
//              onOK: function (data) {
//                  if (data.name && data.name.length > 2) {
//                      // if name is at least 2 chars long, update the underlying data and
//                      // update the UI.
//                      toolkit.updateNode(info.obj, data);
//                  }
//              }
//          });
//      });

        // edit an edge's detail
        var _editEdge = function (edge, isNew) {
//      	//debugger
            jsPlumbToolkit.Dialogs.show({  //调用对话框
                id: "dlgRelationshipType",
                data: edge.data,
                labels:{
				    ok:"确定",
				    cancel:"取消"
				},
                onOK: function (data) {
                    // update the type in the edge's data model...it will be re-rendered.
                    // `type` is set in the radio buttons in the dialog template.
                    console.log(data)
                    toolkit.updateEdge(edge, data);
                    console.log(toolkit)
                },
                onCancel: function () {
                    // if the user pressed cancel on a new edge, delete the edge.
                    if (isNew) toolkit.removeEdge(edge);
                }
            });
        };

        // edit a column's details  //修改列
//      jsPlumb.on(canvasElement, "tap", ".table-column-edit i", function () {
//      	//debugger
//          var info = renderer.getObjectInfo(this);
//          jsPlumbToolkit.Dialogs.show({
//              id: "dlgColumnEdit",
//              title: "Column Details",
//              data: info.obj.data,
//              onOK: function (data) {
//              	//debugger
//                  // if the user supplied a column name, tell the toolkit to add a new port, providing it the
//                  // id and name of the new column.  This will result in a callback to the portFactory defined above.
//                  if (data.id) {
//                      if (data.id.length < 2)
//                          jsPlumbToolkit.Dialogs.show({id: "dlgMessage", msg: "Column ids must be at least 2 characters!"});
//                      else
//                          toolkit.updatePort(info.obj, {
//                              id: data.id.replace(" ", "_").toLowerCase(),
//                              primaryKey: data.primaryKey,
//                              datatype: data.datatype
//                          });
//                  }
//              }
//          });
//      });

// ------------------------- / behaviour ----------------------------------

        // pan mode/select mode
        jsPlumb.on(controls, "tap", "[mode]", function () {
        	//debugger
            renderer.setMode(this.getAttribute("mode"));
        });

        // on home button click, zoom content to fit.
        jsPlumb.on(controls, "tap", "[reset]", function () {
        	//debugger
            toolkit.clearSelection();
            renderer.zoomToFit();
        });

// ------------------------ / rendering ------------------------------------


// ------------------------ drag and drop new tables/views -----------------

        //
        // Here, we are registering elements that we will want to drop onto the workspace and have
        // the toolkit recognise them as new nodes.
        //
        //  typeExtractor: this function takes an element and returns to jsPlumb the type of node represented by
        //                 that element. In this application, that information is stored in the 'jtk-node-type' attribute.
        //
        //  dataGenerator: this function takes a node type and returns some default data for that node type.
        //
//      renderer.registerDroppableNodes({  //从左侧拖拽出来的。。。  可以拖拽出表格和视图 表格能添加  视图还没有弄懂
//          droppables: nodePalette.querySelectorAll("li"),
//          dragOptions: {
//              zIndex: 50000,
//              cursor: "move",
//              clone: true
//          },
//          typeExtractor: function (el, eventInfo, isNativeDrag, eventLocation) {
//              return el.getAttribute("jtk-node-type");
//          },
//          dataGenerator: function (type, draggedElement, eventInfo, eventLocation) {
//              return { name: type };
//          }
//      });

// ------------------------ / drag and drop new tables/views -----------------

        var datasetView = new jsPlumbSyntaxHighlighter(toolkit, ".jtk-demo-dataset");

// ------------------------ loading  ------------------------------------

        // Load the data.
        toolkit.load({
            url: "data/schema-1.json"
        });

// ------------------------ /loading  ------------------------------------



    });
})();
