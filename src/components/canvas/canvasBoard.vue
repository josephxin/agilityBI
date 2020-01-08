<template>
	<div id="canvasWrap" class="canvas-border" v-show="flagCanvasWrap">
		<vue-draggable-resizable v-for="(item, index) in domList" :key="index" :index="index" :class="item.type" :w="item.w" :h="item.h" :x="item.x" :y="item.y" :minw="20" :minh="14" :parent="true" title="双击删除" :style="'min-width: ' + (item.lw*6+2) + 'px; min-height: ' + (item.lw*6+2) + 'px; border: ' + item.lineWidth + 'px ' + item.lineType + ' ' + item.lineColor" @dblclick.native="onDblclick(index)" @mousedown.native="getIndex(index)" @resizing="onResizing" @resizestop="onResizestop" @dragging="onDragging" @dragstop="onDragstop">
			<!--文本域-->
			<textarea class="draggableContent" :style="'font-family: ' + item.fontFamily + '; font-size: ' + item.fontSize + 'px; font-weight: ' + item.fontWeight + '; font-style: ' + item.fontStyle + '; text-decoration: ' + item.fontUnderline + '; color: ' + item.fontColor" v-if="item.type=='textbox'" v-model="item.val" @focus="fn_focus" @blur="fn_blur"></textarea>

			<!--链接按钮-->
			<a class="draggableLink" contenteditable="true" :style="'font-family: ' + item.fontFamily + '; font-size: ' + item.fontSize + 'px; font-weight: ' + item.fontWeight + '; font-style: ' + item.fontStyle + '; color: ' + item.fontColor" v-if="item.type=='linkBtn'" @focus="fn_focus" @blur="fn_blur">{{item.url}}</a>

			<!--文本标签-->
			<el-tag class="draggableTag" :key="item.tag" :disable-transitions="true" contenteditable="true" :style="'height: ' + item.fontSize*1.5 + 'px; font-family: ' + item.fontFamily + '; font-size: ' + item.fontSize + 'px; font-weight: ' + item.fontWeight + '; font-style: ' + item.fontStyle + '; color: ' + item.fontColor" v-if="item.type=='textTag'" @focus.native="fn_focus" @blur.native="fn_blur">{{item.tag}}</el-tag>

			<!--水平线-->
			<div class="draggableHLine" v-if="item.type=='hLine'" tabindex="0" @focus="fn_focus" @blur="fn_blur">
				<div class="middle-line" :style="'background-color:' + item.lc + '; height: ' + item.lw*2 + 'px;'"></div>
				<div class="left-point" :style="'margin-top: -' + item.lw*3 + 'px; width: ' + item.lw*4 + 'px; height: ' + item.lw*4 + 'px; border: ' + item.lw + 'px solid ' + item.lc"></div>
				<div class="right-point" :style="'margin-top: -' + item.lw*3 + 'px; width: ' + item.lw*4 + 'px; height: ' + item.lw*4 + 'px; border: ' + item.lw + 'px solid ' + item.lc"></div>
			</div>

			<!--垂直线-->
			<div class="draggableVLine" v-if="item.type=='vLine'" tabindex="0" @focus="fn_focus" @blur="fn_blur">
				<div class="middle-line" :style="'background-color:' + item.lc + '; width: ' + item.lw*2 + 'px;'"></div>
				<div class="top-point" :style="'margin-left: -' + item.lw*3 + 'px; width: ' + item.lw*4 + 'px; height: ' + item.lw*4 + 'px; border: ' + item.lw + 'px solid ' + item.lc"></div>
				<div class="bottom-point" :style="'margin-left: -' + item.lw*3 + 'px; width: ' + item.lw*4 + 'px; height: ' + item.lw*4 + 'px; border: ' + item.lw + 'px solid ' + item.lc"></div>
			</div>

			<!--水平线2-->
			<div class="draggableHLine2" v-if="item.type=='hLine2'" tabindex="0" @focus="fn_focus" @blur="fn_blur">
				<div class="middle-line" :style="'width: calc(100% - ' + item.lw*6 + 'px); height: ' + item.lw + 'px; background-color: ' + item.lc"></div>
				<div class="right-arrow" :style="'margin-top: -' + item.lw*2 + 'px; border-top-width: ' + item.lw*2 + 'px; border-bottom-width: ' + item.lw*2 + 'px; border-left-width: ' + item.lw*6 + 'px; border-left-color: ' + item.lc"></div>
			</div>

			<!--垂直线2-->
			<div class="draggableVLine2" v-if="item.type=='vLine2'" tabindex="0" @focus="fn_focus" @blur="fn_blur">
				<div class="middle-line" :style="'height: calc(100% - ' + item.lw*6 + 'px); width: ' + item.lw + 'px; margin-top: ' + item.lw*6 + 'px; background-color: ' + item.lc"></div>
				<div class="top-arrow" :style="'margin-left: -' + item.lw*2 + 'px; border-left-width: ' + item.lw*2 + 'px; border-right-width: ' + item.lw*2 + 'px; border-bottom-width: ' + item.lw*6 + 'px; border-bottom-color: ' + item.lc"></div>
			</div>

			<!--图片-->
			<div class="draggableImg" :style="'background-image: url(' + item.src + ');'" v-if="item.type=='img'" tabindex="0" @focus="fn_focus" @blur="fn_blur">
				<button type="button" class="el-button el-button--primary el-button--small uploadBtn" @click="clickUpload($event)"><span>点击上传</span></button>
				<input class="uploadImg" type="file" name="file" @change="changeUploadImg($event, index)" />
			</div>
		</vue-draggable-resizable>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { BIMsg } from '@/assets/js/tools.js'

	export default {
		components: {

		},
		data: function() {
			return {
				p_start: {
					x: 0,
					y: 0
				},
				p_end: {
					x: 0,
					y: 0
				},
				isPush: false, //是否添加到数组中

				flag_delete: false, //删除元素时，失去焦点事件的代码不执行
				index: -1, //元素的下标
				isDrag: false, //元素是否被拖拽
				isResize: false, //元素是否被改变大小
			}
		},
		props: {

		},
		computed: {
			...mapState(["flagCanvasWrap", "elementType", "domList", "lineColor", "lineWidth", "lineType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "fontUnderline", "fontColor"]),
		},
		watch: {
			/*flagCanvasWrap: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					if(newValue){
						setTimeout(()=>{
							$('#canvasWrap')[0].addEventListener('mousedown', this.onMouseDown, false);
						})
					}
				}
			},*/
			/*改变所选中元素线的属性*/
			lineColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementLineProp('lineColor', 'lc', newValue)
				}
			},
			lineWidth: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementLineProp('lineWidth', 'lw', newValue)
				}
			},
			lineType: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementLineProp('lineType', 'lt', newValue)
				}
			},
			/*改变所选中元素字的属性*/
			fontColor: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontColor', newValue)
				}
			},
			fontFamily: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontFamily', newValue)
				}
			},
			fontSize: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontSize', newValue)
				}
			},
			fontWeight: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontWeight', newValue)
				}
			},
			fontStyle: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontStyle', newValue)
				}
			},
			fontUnderline: {
				handler(newValue, oldValue) {
					//console.log(newValue)
					this.changeElementFontProp('fontUnderline', newValue)
				}
			},
		},
		methods: {
			changeElementLineProp(propType, propType2, newValue) {
				if(this.index != -1) { //不等于-1代表元素被选中
					var arr = this.domList;
					var type = arr[this.index].type
					//console.log(type)
					if(type == 'rect' || type == 'ellipse') {
						arr[this.index][propType] = newValue
						this.$store.commit('changeDomList', arr)
					} else if(type == 'hLine' || type == 'vLine' || type == 'hLine2' || type == 'vLine2') {
						arr[this.index][propType2] = newValue
						this.$store.commit('changeDomList', arr)
					}
				}
			},
			changeElementFontProp(propType, newValue) {
				if(this.index != -1) {
					var arr = this.domList;
					var type = arr[this.index].type
					//console.log(type)
					if(type == 'linkBtn' || type == 'textTag' || type == 'textbox') {
						arr[this.index][propType] = newValue
						this.$store.commit('changeDomList', arr)
					}
				}
			},
			//双击删除元素
			onDblclick(index) {
				//console.log(this.flag_delete)
				this.flag_delete = true;
				var arr = this.domList;
				arr.splice(index, 1)
				this.changeDomListFn(arr)
			},
			// 元素触发mousedown事件时获取下标和同步左侧工具栏元素的状态
			getIndex(index) {
				//console.log(index)
				this.isDrag = true
				$('.draggable').addClass('not-border')
				$('.draggable[class*="rect"]').removeClass('not-border')
				$('.draggable[class*="ellipse"]').removeClass('not-border')

				this.index = index
				var arr = this.domList
				var type = arr[index].type
				if(type == 'rect' || type == 'ellipse') {
					var lineWidth = arr[index].lineWidth
					var lineType = arr[index].lineType
					var lineColor = arr[index].lineColor
					//console.log(index, lineWidth, lineType, lineColor)
					this.$store.commit('changeLineWidth', lineWidth)
					this.$store.commit('changeLineType', lineType)
					this.$store.commit('changeLineColor', lineColor)
				} else if(type == 'hLine' || type == 'vLine' || type == 'hLine2' || type == 'vLine2') {
					var lw = arr[index].lw
					var lt = arr[index].lt
					var lc = arr[index].lc
					//console.log(index, lw, lt, lc)
					this.$store.commit('changeLineWidth', lw)
					this.$store.commit('changeLineType', lt)
					this.$store.commit('changeLineColor', lc)
				} else if(type == 'linkBtn' || type == 'textTag' || type == 'textbox') {
					var fontFamily = arr[index].fontFamily
					var fontSize = arr[index].fontSize
					var fontColor = arr[index].fontColor
					var fontWeight = arr[index].fontWeight
					var fontStyle = arr[index].fontStyle
					var fontUnderline = arr[index].fontUnderline
					//console.log(index, fontFamily, fontSize, fontColor, fontWeight, fontStyle, fontUnderline)
					this.$store.commit('changeFontFamily', fontFamily)
					this.$store.commit('changeFontSize', fontSize)
					this.$store.commit('changeFontColor', fontColor)
					this.$store.commit('changeFontWeight', fontWeight)
					this.$store.commit('changeFontStyle', fontStyle)
					this.$store.commit('changeFontUnderline', fontUnderline)
				}
			},
			// 点击上传按钮触发文件上传框的click事件
			clickUpload(e) {
				//console.log(e)
				var target = e.target
				$(target).closest('button').next().trigger('click')
			},
			// 文件上传框change后的回调函数
			changeUploadImg(e, index) {
				var docVal = e.target.value;
				//console.log(e.target.files, docVal);
				if(docVal == "") {
					$(e.target).parent().focus()
					return false;
				}
				// 判断文件类型
				var fileType = docVal.substring(docVal.lastIndexOf(".") + 1).toLowerCase();
				if(fileType != "jpg" && fileType != "jpeg" && fileType != "png" && fileType != "gif" && fileType != "bmp" && fileType != "wbm") {
					BIMsg({
						message: "请选择以下图片格式(jpg, jpeg, png, gif, bmp, wbm)！",
						type: 'error'
					})
					e.target.value = "";
					return false;
				}
				// 判断图片大小
				if(e.target.files && e.target.files[0]) {
					var file_size = e.target.files[0].size;
					if(file_size / 1024 > 1024) {
						BIMsg({
							message: "图片大于1M,请压缩后再次上传。",
							type: 'error'
						})
						e.target.value = "";
						return false;
					}
				}
				if(e.target.files && e.target.files[0]) {
					var src = window.URL.createObjectURL(e.target.files[0]);
					var arr = this.domList;
					arr[index].src = src
					this.$store.commit('changeDomList', arr)
					setTimeout(() => {
						$(e.target).parent().focus()
					})
				}

				return true; //如果不加，相同图片不会触发change事件
			},
			pos(e) {
				var x = e.pageX - $('#canvasWrap').offset().left;
				var y = e.pageY - $('#canvasWrap').offset().top;
				return {
					x: x,
					y: y
				};
			},
			coordinate(x1, y1, x2, y2) { // 画矩形的方法
				// 返回对象
				var result = {
					"x": x1,
					"y": y1,
					"w": x2 - x1,
					"h": y2 - y1
				};
				// 计算X坐标
				if(x2 - x1 < 0) {
					result.x = x2;
					result.w = x1 - x2;
				}
				// 计算Y坐标
				if(y2 - y1 < 0) {
					result.y = y2;
					result.h = y1 - y2;
				}
				return result;
			},
			fn_focus(e) {
				//console.log(e, e.target)
				$(e.target).parent().removeClass('not-border')
			},
			fn_blur(e) {
				if(this.flag_delete) return;

				//console.log(e.target, $(e.target).val(), $(e.target).text())
				//$(e.target).parent().addClass('not-border');

				var arr = this.domList;
				var index = Number($(e.target).parent().attr('index'))
				//console.log(arr, index)
				if((e.target.tagName == 'TEXTAREA' && $(e.target).val() == '') || (e.target.tagName == 'A' && $(e.target).text() == '') || (e.target.tagName == 'SPAN' && $(e.target).text() == '')) {
					arr.splice(index, 1)
					this.changeDomListFn(arr)
				} else if(e.target.tagName == 'TEXTAREA' && arr.length > 0) { //arr为空时，下面会报错
					arr[index].val = $(e.target).val()
					this.$store.commit('changeDomList', arr)
				} else if(e.target.tagName == 'A' && arr.length > 0) {
					arr[index].url = $(e.target).text()
					this.$store.commit('changeDomList', arr)
				} else if(e.target.tagName == 'SPAN' && arr.length > 0) {
					arr[index].tag = $(e.target).text()
					this.$store.commit('changeDomList', arr)
				}
			},
			changeDomListFn(arr) {
				this.$store.commit('changeDomList', [])
				setTimeout(() => {
					this.$store.commit('changeDomList', arr)
					setTimeout(() => {
						$('.textbox').addClass('not-border')
						$('.linkBtn').addClass('not-border')
						$('.textTag').addClass('not-border')
						$('.hLine').addClass('not-border')
						$('.vLine').addClass('not-border')
						$('.hLine2').addClass('not-border')
						$('.vLine2').addClass('not-border')
						$('.img').addClass('not-border')
						this.flag_delete = false
						this.index = -1
					})
				})
			},
			//初始化参数
			initParam() {
				this.p_start.x = 0;
				this.p_start.y = 0;
				this.p_end.x = 0;
				this.p_end.y = 0;
			},
			onMouseDown(evt) {
				//console.log(this.isDrag)
				if(this.isDrag == true) return;
				$('.draggableContent').blur()
				$('.draggableLink').blur()
				$('.draggableTag').blur()
				$('.draggableImg').blur()
				$('.draggableHLine').blur()
				$('.draggableVLine').blur()
				$('.draggableHLine2').blur()
				$('.draggableVLine2').blur()

				$('.draggable').addClass('not-border')
				$('.draggable[class*="rect"]').removeClass('not-border')
				$('.draggable[class*="ellipse"]').removeClass('not-border')
				this.index = -1
				//console.log(this.index)
				if(this.p_start.x != 0 || this.p_start.y != 0) {
					return;
				}
				this.p_start = this.pos(evt);
				//console.log(this.p_start)
				evt.preventDefault();
				this.isPush = false;

				var $ele = $('<div id="general"></div>')
				$ele.css({
					left: this.p_start.x + 'px',
					top: this.p_start.y + 'px',
				});
				switch(this.elementType) {
					case 'rect':
						$ele.css({
							border: this.lineWidth + 'px ' + this.lineType + ' ' + this.lineColor
						});
						break;
					case 'ellipse':
						$ele.css({
							border: this.lineWidth + 'px ' + this.lineType + ' ' + this.lineColor,
							borderRadius: '50%'
						});
						break;
				}
				$('#canvasWrap').append($ele);

				$('#canvasWrap')[0].addEventListener('mousemove', this.onMouseMove, false);
				$('#canvasWrap')[0].addEventListener('mouseup', this.onMouseUp, false);
			},
			onMouseMove(evt) {
				this.p_end = this.pos(evt);
				//console.log(this.p_end)
				evt.preventDefault();
				this.isPush = true;
				var coord = this.coordinate(this.p_start.x, this.p_start.y, this.p_end.x, this.p_end.y);
				$('#general').css({
					left: coord.x,
					top: coord.y,
					width: coord.w,
					height: coord.h
				});
			},
			onMouseUp(evt) {
				evt.preventDefault();
				$('#canvasWrap')[0].removeEventListener('mousemove', this.onMouseMove, false);
				$('#canvasWrap')[0].removeEventListener('mouseup', this.onMouseUp, false);

				$('#general').remove();
				if(this.isPush == false) {
					this.initParam();
					return;
				};
				switch(this.elementType) {
					case 'hLine':
						var flag = this.rectEllipseTextboxUp('hLine', undefined, undefined, undefined, this.lineWidth, this.lineColor, this.lineType);
						if(!flag) { //返回true为不合法
							setTimeout(() => {
								$('.draggableHLine').eq(-1).focus()
							})
						}
						break;
					case 'vLine':
						var flag = this.rectEllipseTextboxUp('vLine', undefined, undefined, undefined, this.lineWidth, this.lineColor, this.lineType);
						if(!flag) {
							setTimeout(() => {
								$('.draggableVLine').eq(-1).focus()
							})
						}
						break;
					case 'hLine2':
						var flag = this.rectEllipseTextboxUp('hLine2', undefined, undefined, undefined, this.lineWidth, this.lineColor, this.lineType);
						if(!flag) {
							setTimeout(() => {
								$('.draggableHLine2').eq(-1).focus()
							})
						}
						break;
					case 'vLine2':
						var flag = this.rectEllipseTextboxUp('vLine2', undefined, undefined, undefined, this.lineWidth, this.lineColor, this.lineType);
						if(!flag) {
							setTimeout(() => {
								$('.draggableVLine2').eq(-1).focus()
							})
						}
						break;
					case 'rect':
						this.rectEllipseTextboxUp('rect', this.lineWidth, this.lineColor, this.lineType)
						break;
					case 'ellipse':
						this.rectEllipseTextboxUp('ellipse', this.lineWidth, this.lineColor, this.lineType)
						break;
					case 'textbox':
						var flag = this.rectEllipseTextboxUp('textbox');
						if(!flag) {
							setTimeout(() => {
								$('.draggableContent').eq(-1).focus()
							})
						}
						break;
					case 'linkBtn':
						var flag = this.rectEllipseTextboxUp('linkBtn')
						if(!flag) {
							setTimeout(() => {
								$('.draggableLink').eq(-1).focus()
							})
						}
						break;
					case 'textTag':
						var flag = this.rectEllipseTextboxUp('textTag')
						if(!flag) {
							setTimeout(() => {
								$('.draggableTag').eq(-1).focus()
							})
						}
						break;
					case 'img':
						var flag = this.rectEllipseTextboxUp('img')
						if(!flag) {
							setTimeout(() => {
								$('.draggableImg').eq(-1).focus()
							})
						}
						break;
				}

				this.initParam();
			},
			rectEllipseTextboxUp(type, lineWidth = 1, lineColor = '#999999', lineType = 'solid', lw, lc, lt) {
				var coord = this.coordinate(this.p_start.x, this.p_start.y, this.p_end.x, this.p_end.y);
				var x = coord.x;
				var y = coord.y;
				var width = coord.w;
				var height = coord.h;
				if(width == 0 || height == 0) {
					return true;
				}
				var arr = this.domList;
				arr.push({
					type: type,
					w: width,
					h: height,
					x: x,
					y: y,

					fontFamily: this.fontFamily,
					fontSize: this.fontSize,
					fontWeight: this.fontWeight,
					fontStyle: this.fontStyle,
					fontUnderline: this.fontUnderline,
					fontColor: this.fontColor,

					lineWidth: lineWidth,
					lineColor: lineColor,
					lineType: lineType,
					lw,
					lc,
					lt,

					val: '', //文本域
					tag: '', //文本标签
					url: 'https://www.baidu.com', //链接按钮
					src: '', //图片路径
				})
				this.$store.commit('changeDomList', arr)
				//console.log(arr)
			},
			onDragging(left, top) {
				this.isDrag = true
				//console.log('onDragging', this.isDrag)
			},
			onResizing(left, top, width, height) {
				this.isResize = true
				//console.log('onResizing', this.isResize, this.index)
			},
			onDragstop(left, top) {
				//console.log(this.isDrag, this.index)
				if(this.isDrag) {
					//console.log('onDragstop', left, top)
					this.isDrag = false
					var arr = this.domList;
					arr[this.index].x = left
					arr[this.index].y = top
					this.$store.commit('changeDomList', arr)
				}
			},
			onResizestop(left, top, width, height) { //移动时不执行，只有改变大小时执行
				//console.log(this.isResize, this.index)
				if(this.isResize) {
					//console.log('onResizestop', left, top, width, height)
					this.isResize = false
					var arr = this.domList;
					arr[this.index].x = left
					arr[this.index].y = top
					arr[this.index].w = width
					arr[this.index].h = height
					this.$store.commit('changeDomList', arr)
				}
			},
		},
		created() {

		},
		mounted() {
			//画笔、文字执行事件
			$('#canvasWrap')[0].addEventListener('mousedown', this.onMouseDown, false);
			/*$('#content').mousedown(() => {
				$('.img').addClass('not-border')
			})*/
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	#canvasWrap {
		z-index: 100;
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: hidden;
		cursor: url(../../assets/imgs/common/cursor.png) 4 4, auto;
		.draggable {
			border: 1px solid black;
			cursor: move;
			&.not-border {
				border: 1px solid transparent !important;
			}
			&.ellipse {
				border-radius: 50%;
			}
			&.textTag {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.draggableContent {
				width: 100%;
				height: 100%;
				border: none;
				outline: none;
				resize: none;
				background-color: transparent;
			}
			.draggableLink {
				display: block;
				width: 100%;
				height: 100%;
				text-decoration: underline;
				outline: none;
			}
			.draggableTag {
				line-height: 1.48;
				outline: none;
			}
			.draggableHLine {
				position: relative;
				box-sizing: border-box;
				height: 100%;
				outline: none;
				.middle-line {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
				.left-point,
				.right-point {
					position: absolute;
					top: 50%;
					background: white;
				}
				.left-point {
					left: 0;
				}
				.right-point {
					right: 0;
				}
			}
			.draggableVLine {
				position: relative;
				box-sizing: border-box;
				height: 100%;
				outline: none;
				.middle-line {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
				.top-point,
				.bottom-point {
					position: absolute;
					left: 50%;
					background: white;
				}
				.top-point {
					top: 0;
				}
				.bottom-point {
					bottom: 0;
				}
			}
			.draggableHLine2 {
				position: relative;
				box-sizing: border-box;
				height: 100%;
				outline: none;
				.middle-line {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto 0;
				}
				.right-arrow {
					position: absolute;
					top: 50%;
					right: 0;
					border-top-style: solid;
					border-top-color: transparent;
					border-bottom-style: solid;
					border-bottom-color: transparent;
					border-left-style: solid;
				}
			}
			.draggableVLine2 {
				position: relative;
				box-sizing: border-box;
				height: 100%;
				outline: none;
				overflow: hidden;
				.middle-line {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
				}
				.top-arrow {
					position: absolute;
					top: 0;
					left: 50%;
					border-left-style: solid;
					border-left-color: transparent;
					border-right-style: solid;
					border-right-color: transparent;
					border-bottom-style: solid;
				}
			}
			.draggableImg {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				outline: none;
				background-size: contain;
				background-repeat: no-repeat;
				overflow: hidden;
				&:hover {
					.uploadBtn {
						display: block;
					}
				}
				.uploadBtn {
					display: none;
					border: none;
				}
				input {
					display: none;
				}
			}
		}
		>#general {
			box-sizing: border-box;
			position: absolute;
			border: 1px solid #999999;
		}
	}
	
	.canvas-border {
		border: 1px solid transparent;
	}
	
	.theme-blue {
		.canvas-border {
			border-color: $configure-list;
		}
		.draggableLink:hover {
			color: $configure-list;
		}
		.uploadBtn {
			background-color: $configure-list;
		}
		.draggableTag {
			background-color: $configure-list-1;
			border-color: $configure-list-2;
		}
	}
	
	.theme-red {
		.canvas-border {
			border-color: $configure-list-red;
		}
		.draggableLink:hover {
			color: $configure-list-red;
		}
		.uploadBtn {
			background-color: $configure-list-red;
		}
		.draggableTag {
			background-color: $configure-list-red-1;
			border-color: $configure-list-red-2;
		}
	}
	
	.theme-green {
		.canvas-border {
			border-color: $configure-list-green;
		}
		.draggableLink:hover {
			color: $configure-list-green;
		}
		.uploadBtn {
			background-color: $configure-list-green;
		}
		.draggableTag {
			background-color: $configure-list-green-1;
			border-color: $configure-list-green-2;
		}
	}
</style>