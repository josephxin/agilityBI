<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	#app {
		height: 100%;
	}
	
	.transition {
		transition: .3s;
	}
	
	.opacity {
		opacity: 1;
	}
	
	.opacity:hover {
		opacity: .8;
	}
	
	.cursor-move {
		cursor: move;
	}
	
	.bgcolor-fa {
		border-radius: 6px;
		background-color: #fafafa;
	}
	
	// 提示框样式
	.el-message {
		top: 50px !important;
	}
	
	// 按钮组件样式
	.el-btn {
		box-sizing: border-box;
		padding: 0 22px;
		height: 32px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
		border: 1px solid transparent;
		border-radius: 20px;
		transition: .3s;
		&:hover {
			opacity: .8;
		}
		&.save {
			width: 100px;
			padding: 0;
			color: white !important;
			border: none !important;
		}
		&.cancel {
			width: 100px;
			padding: 0;
		}
		&.mini-btn {
			font-size: 12px;
			padding: 0 16px;
			height: 24px;
			line-height: 21px;
			border-radius: 12px;
		}
	}
	
	.theme-blue {
		.collect {
			.el-popper {
				z-index: 2!important;
				/*选择框弹出的显示层级*/
			}
		}
		.el-btn {
			background: url(assets/imgs/blue/btn_bg.png) no-repeat;
			background-size: 100% 100%;
			color: #496b98;
			&.save {
				background: url(assets/imgs/blue/bg_confirm.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		::-webkit-scrollbar-track-piece {
			background-color: transparent;
		}
		::-webkit-scrollbar-thumb {
			background-color: $configure-list-2;
		}
		::-webkit-scrollbar-thumb:hover {
			background-color: $configure-list-5;
		}
	}
	
	.theme-red {
		.collect {
			.el-popper {
				z-index: 2!important;
				/*选择框弹出的显示层级*/
			}
		}
		.el-btn {
			background-color: #fff3ef;
			color: #dd2a12;
			border: 1px solid #dd2a12;
			&.save {
				background: url(assets/imgs/red/bg_confirm.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		::-webkit-scrollbar-track-piece {
			background-color: transparent;
		}
		::-webkit-scrollbar-thumb {
			background-color: $configure-list-red-2;
		}
		::-webkit-scrollbar-thumb:hover {
			background-color: $configure-list-red-5;
		}
	}
	
	.theme-green {
		.collect {
			.el-popper {
				z-index: 2!important;
				/*选择框弹出的显示层级*/
			}
		}
		.el-btn {
			background-color: #effdf5;
			color: #009540;
			border: 1px solid #009540;
			&.save {
				background: url(assets/imgs/green/bg_confirm.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		::-webkit-scrollbar-track-piece {
			background-color: transparent;
		}
		::-webkit-scrollbar-thumb {
			background-color: $configure-list-green-2;
		}
		::-webkit-scrollbar-thumb:hover {
			background-color: $configure-list-green-5;
		}
	}
	
	// 弹窗组件样式  开始
	.el-dialog {
		border-radius: 5px !important;
	}
	
	.el-dialog__header {
		position: relative !important;
		padding: 0 0 0 16px !important;
		height: 44px !important;
		line-height: 44px !important;
		border-bottom: 1px solid #dddddd !important;
	}
	
	.el-dialog__title {
		font-size: 16px !important;
		font-weight: bold !important;
	}
	
	.el-dialog__headerbtn {
		top: 13px !important;
		right: 14px !important;
		font-size: 18px !important;
	}
	
	// 导出设置
	.dialogExportSet {
		.el-dialog {
			width: 675px;
		}
		.el-radio {
			line-height: 24px;
		}
	}
	
	// 图片设置
	.dialogChartSet {
		.el-dialog {
			width: 445px;
			padding-bottom: 20px;
		}
		.el-dialog__body {
			padding: 35px 40px 28px;
		}
		.el-dialog__footer {
			padding: 0 40px;
			text-align: initial;
		}
	}
	
	// 编辑数据源
	.dialogEditResource {
		.el-dialog {
			width: 919px;
			height: 554px;
		}
		.el-dialog__body {
			padding: 30px;
		}
		.el-dialog__footer {
			padding: 0 0 30px;
			text-align: center;
		}
	}
	
	.dialog-confirm {
		width: 100px;
		height: 32px;
		line-height: 32px;
		text-align: center;
		border-radius: 16px;
		font-size: 16px;
		font-weight: bold;
		color: white;
		&:hover {
			opacity: .8;
		}
	}
	
	.theme-blue {
		.el-dialog__headerbtn:focus .el-dialog__close,
		.el-dialog__headerbtn:hover .el-dialog__close {
			color: $configure-list;
		}
		.dialog-confirm {
			background: url(assets/imgs/blue/bg_confirm.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.theme-red {
		.el-dialog__headerbtn:focus .el-dialog__close,
		.el-dialog__headerbtn:hover .el-dialog__close {
			color: $configure-list-red;
		}
		.dialog-confirm {
			background: url(assets/imgs/red/bg_confirm.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.theme-green {
		.el-dialog__headerbtn:focus .el-dialog__close,
		.el-dialog__headerbtn:hover .el-dialog__close {
			color: $configure-list-green;
		}
		.dialog-confirm {
			background: url(assets/imgs/green/bg_confirm.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	
	//弹窗组件样式  结束
	// 单选按钮
	.el-radio__input.is-checked+.el-radio__label {
		color: #333 !important;
	}
	
	.el-radio {
		color: #333 !important;
	}
	
	.el-table td,
	.el-table th {
		padding: 9px 0 !important;
	}
	
	.theme-blue {
		.el-radio__input.is-checked .el-radio__inner {
			background: #fff;
			border-color: $configure-list;
		}
		.el-radio__inner::after {
			background-color: $configure-list;
		}
		.el-radio__inner:hover {
			border-color: $configure-list;
		}
		.el-upload-list {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
		.content_tab {
			.el-table th>.cell {
				color: #333333;
			}
			.theme-blue .el-table__header {
				background: #fafafa;
			}
			.gutter,
			.el-table__header,
			.el-table th.is-leaf {
				background: #fafafa;
			}
			.el-table__row:nth-child(even) {
				background: #fafafa;
			}
		}
		//table组件多选框颜色
		.el-checkbox__input.is-checked .el-checkbox__inner,
		.el-checkbox__input.is-indeterminate .el-checkbox__inner {
			background: #256cc2;
			border-color: #256cc2;
		}
		.el-checkbox__inner:hover {
			border-color: #256cc2;
		}
		.el-checkbox__input.is-focus .el-checkbox__inner {
			border-color: #256cc2;
		}
		.el-select-dropdown__item.selected {
			background-color: $blue-color;
			color: #FFF;
		}
		.el-select-dropdown__item:hover {
			background-color: $blue-color;
			color: #FFF;
		}
		//分页组件的背景颜色
		.el-pagination.is-background .el-pager li:not(.disabled):hover,
		.el-pagination.is-background .btn-next:not(.disabled):hover,
		.el-pagination.is-background .btn-prev:not(.disabled):hover,
		.el-pagination.is-background .el-pager li:not(.disabled).active,
		.el-pagination.is-background .btn-next:hover span,
		.el-pagination.is-background .btn-prev:hover span {
			background-color: $blue-color;
			color: #fff;
			border-color: $blue-color;
		}
	}
	
	.theme-red {
		.el-radio__input.is-checked .el-radio__inner {
			background: #fff;
			border-color: $configure-list-red;
		}
		.el-radio__inner::after {
			background-color: $configure-list-red;
		}
		.el-radio__inner:hover {
			border-color: $configure-list-red;
		}
		//table组件多选框颜色
		.el-checkbox__input.is-checked .el-checkbox__inner,
		.el-checkbox__input.is-indeterminate .el-checkbox__inner {
			background: #dd2911;
			border-color: #dd2911;
		}
		.el-checkbox__inner:hover {
			border-color: #dd2911;
		}
		.el-checkbox__input.is-focus .el-checkbox__inner {
			border-color: #dd2911;
		}
		//分页组件的背景颜色
		.el-pagination.is-background .el-pager li:not(.disabled):hover,
		.el-pagination.is-background .btn-next:not(.disabled):hover,
		.el-pagination.is-background .btn-prev:not(.disabled):hover,
		.el-pagination.is-background .el-pager li:not(.disabled).active,
		.el-pagination.is-background .btn-next:hover span,
		.el-pagination.is-background .btn-prev:hover span {
			background-color: $red-color;
			color: #fff;
			border: 1px solid $red-color;
		}
		.el-select-dropdown__item.selected {
			background-color: #fc6d5a;
			color: #FFF;
		}
		.el-select-dropdown__item:hover {
			background-color: #fc6d5a;
			color: #FFF;
		}
	}
	
	.theme-green {
		.el-radio__input.is-checked .el-radio__inner {
			background: #fff;
			border-color: $configure-list-green;
		}
		.el-radio__inner::after {
			background-color: $configure-list-green;
		}
		.el-radio__inner:hover {
			border-color: $configure-list-green;
		}
		//table组件多选框颜色
		.el-checkbox__input.is-checked .el-checkbox__inner,
		.el-checkbox__input.is-indeterminate .el-checkbox__inner {
			background: #00a949;
			border-color: #00a949;
		}
		.el-checkbox__inner:hover {
			border-color: #00a949;
		}
		.el-checkbox__input.is-focus .el-checkbox__inner {
			border-color: #00a949;
		}
		//分页组件的背景颜色
		.el-pagination.is-background .el-pager li:not(.disabled):hover,
		.el-pagination.is-background .btn-next:not(.disabled):hover,
		.el-pagination.is-background .btn-prev:not(.disabled):hover,
		.el-pagination.is-background .el-pager li:not(.disabled).active,
		.el-pagination.is-background .btn-next:hover span,
		.el-pagination.is-background .btn-prev:hover span {
			background-color: $green-color;
			color: #fff;
			border: 1px solid $green-color;
		}
		.el-select-dropdown__item.selected {
			background-color: $green-color;
			color: #FFF;
		}
		.el-select-dropdown__item:hover {
			background-color: $green-color;
			color: #FFF;
		}
	}
	
	// 折叠面板组件样式
	.el-collapse {
		border-top: none !important;
		border-bottom: none !important;
	}
	
	.el-carousel__mask,
	.el-cascader-menu,
	.el-cascader-menu__item.is-disabled:hover,
	.el-collapse-item__header,
	.el-collapse-item__wrap {
		background-color: transparent !important;
	}
	
	.el-collapse-item__header,
	.el-collapse-item__content {
		color: white !important;
	}
	
	.el-collapse-item__header,
	.el-collapse-item__wrap {
		border-bottom: none !important;
	}
	/*公共的？*/
	
	.el-collapse-item__header {
		height: 50px;
		line-height: 50px;
		padding: 0 20px 1px;
		font-size: 14px;
		>p {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
	.el-collapse-item__header {
		&.focusing:focus:not(:hover) {
			color: white!important;
		}
	}
	
	.el-collapse-item__content {
		padding-bottom: 0!important;
	}
	
	.el-collapse-item__arrow {
		line-height: 50px;
		margin-right: 0;
	}
	
	.el-table__empty-block {
		min-height: 240px !important;
	}
	
	.theme-red {
		.el-collapse-item__header {
			background: url(assets/imgs/red/bg_list_line.jpg) no-repeat left bottom;
		}
	}
	
	.theme-green {
		.el-collapse-item__header {
			background: url(assets/imgs/green/bg_list_line.jpg) no-repeat left bottom;
		}
	}
	
	// 没有数据时的效果
	.no_data {
		display: block;
		width: 78px;
		height: 78px;
		background: url(./assets/imgs/no_data.png) no-repeat;
		margin: auto;
	}
	
	.no_bor {
		display: block;
		width: 129px;
		height: 6px;
		margin: 20px auto 39px;
		background: #e9ebee;
	}
	
	// 分页组件样式
	.el-pagination {
		float: right;
		font-weight: 400;
		margin-top: 25px;
	}
	
	.el-pagination.is-background .el-pager li:not(.disabled):hover,
	.el-pagination.is-background .btn-next:not(.disabled):hover,
	.el-pagination.is-background .btn-prev:not(.disabled):hover,
	.el-pagination.is-background .el-pager li:not(.disabled).active,
	.el-pagination.is-background .btn-next:hover span,
	.el-pagination.is-background .btn-prev:hover span {
		border: 1px solid transparent;
	}
	
	.el-pagination.is-background .btn-next:disabled:hover span,
	.el-pagination.is-background .btn-prev:disabled:hover span {
		color: #c0c4cc;
		background-color: #fff;
	}
	
	.el-pagination span:not([class*="suffix"]) {
		padding: 0 15px;
		height: 26px;
		border: 1px solid transparent;
	}
	
	//头部搜索中的本页搜索中的checkbox
	.theme-green {
		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: $green-color;
		}
		.main_me_check {
			.el-checkbox__input.is-focus .el-checkbox__inner {
				/*border-color: #CCC;*/
			}
		}
	}
	
	.theme-blue {
		.el-checkbox__input.is-checked+.el-checkbox__label {
			color: $blue-color;
		}
		.el-checkbox__input.is-focus .el-checkbox__inner {
			/*border-color: #CCC;*/
		}
	}
	
	.theme-red {
		.search {
			.el-checkbox__input.is-checked+.el-checkbox__label {
				color: $red-color;
			}
			.main_me_check {
				.el-checkbox__input.is-focus .el-checkbox__inner {
					/*border-color: #CCC;*/
				}
			}
			//改成圆的样式
			//#dcdfe6
			.el-checkbox__inner {
				width: 14px;
				height: 14px;
				border-radius: 14px;
				position: relative;
			}
			.el-checkbox__inner::after {
				width: 5px;
				height: 5px;
				border-radius: 5px;
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				top: 0;
				margin: auto;
				background: #dd2911;
			}
			.el-checkbox__input.is-checked .el-checkbox__inner {
				background: #FFF;
			}
			.is-focus .el-checkbox__inner::after {
				width: 5px;
				height: 5px;
				border-radius: 5px;
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				top: 0;
				margin: auto;
				background: #dd2911;
			}
			/*.is-focus .el-checkbox__inner{
					border-color:#dcdfe6
				}*/
		}
	}
	
	//收藏的分页组件样式
	.collect {
		.el-select {
			width: 100%;
			height: 100%;
			.el-input {
				height: 100%;
				.el-input__inner {
					background-color: transparent;
					box-sizing: border-box;
					width: 100%;
					height: 100% !important;
					line-height: 22px;
					padding-left: 12px;
					padding-right: 33px;
					border: none;
					color: white;
					font-size: 14px;
				}
			}
		}
		.el-pagination.is-background .btn-next:disabled:hover span,
		.el-pagination.is-background .btn-prev:disabled:hover span {
			color: #333;
			background-color: #fff;
		}
		.el-pagination.is-background .btn-next,
		.el-pagination.is-background .btn-prev,
		.el-pagination.is-background .el-pager li {
			background-color: #fff;
			color: #000;
			border: 1px solid transparent;
		}
		.el-pagination span:not([class*="suffix"]) {
			padding: 0 15px;
			height: 26px;
		}
		.el-select {
			background: #fff;
			border: 1px solid #ccc;
			.el-input {
				.el-input__inner {
					display: block;
					color: #333;
				}
			}
		}
		.el-input__suffix {}
		.el-select__caret {
			line-height: 20px !important;
			color: #aaa !important;
		}
		.mht_select_hed {
			width: 103px;
			box-sizing: border-box;
		}
	}
	
	//end   分页组件样式结束
	//步骤条组件样式开始
	.el-step__head {
		display: none !important;
	}
	
	.el-steps--simple {
		background: #fafafa;
		color: #afafaf;
		font-size: 24px;
	}
	
	.el-step__title.is-process {
		/*这是在当前的步骤的字体颜色和border*/
		color: #20a291;
		border-bottom: 2px solid #20a291;
	}
	
	.el-step__title.is-finish {
		/*这是在完成步骤后所变的颜色图现在是灰色 */
		color: #afafaf;
	}
	
	.el-step.is-simple {
		height: 40px;
		line-height: 40px;
		.el-step__title {
			height: 40px;
			line-height: 40px;
			font-size: 24px;
		}
	}
	
	.el-step__title.is-success {
		color: #afafaf;
	}
	
	//步骤条组件样式结束
	// 拖拽上传组件样式
	.new_file {
		.el-upload-dragger {
			position: static;
		}
		.el-upload-dragger .el-icon-upload {
			margin: 51px 0 16px;
		}
		.el-button--primary {
			position: absolute;
			top: 0;
			left: 0;
			width: 94px;
			height: 30px;
			color: #ffffff;
			border-radius: 15px;
			border-color: #018274;
			background: #018274;
		}
	}
	
	.lcr_updata {
		.el-upload-dragger {
			position: static;
			width: 347px;
			height: 186px;
			margin-top: 0;
		}
		.el-upload-dragger .el-icon-upload {
			margin: 51px 0 16px;
		}
		.el-button--primary {
			position: absolute;
			bottom: 0;
			right: 79px;
			width: 69px;
			height: 30px;
			color: #ffffff;
			border-radius: 15px;
			background: #018274;
			border-color: #018274;
		}
	}
	
	.el-upload {
		width: 100%;
		height: 272px;
	}
	
	.el-upload-dragger {
		width: 100%;
		height: 272px;
		margin-top: 0px;
		text-align: center;
		border: 1px solid #e6e6e6;
		background: #fbfbfb;
		overflow: initial;
	}
	
	.el-upload-dragger .el-icon-upload {
		margin: 85px 0 16px;
	}
	
	.el-upload-dragger:hover {
		border: 1px solid #e6e6e6;
	}
	
	//拖拽上传结束
	//table 组件样式
	.el-table th>.cell {
		color: #333;
	}
	
	.el-checkbox__input.is-checked .el-checkbox__inner,
	.el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background: #256cc2;
		border-color: #256cc2;
	}
	
	.el-checkbox__inner:hover {
		border-color: #256cc2;
	}
	
	.el-checkbox__input.is-focus .el-checkbox__inner {
		border-color: #256cc2;
	}
	
	//数据源列表table 组件样式
	//一个全局的组件的element 样式
	.common_list {
		.el-dialog {
			width: 919px;
			height: 554px;
			border-radius: 5px;
		}
	}
	
	.common_list_content {
		.el-input__inner {
			box-sizing: border-box;
			border: 1px solid #dddddd !important;
			border: none;
			color: #333 !important;
			font-size: 14px;
		}
		.el-select__caret {
			line-height: 20px !important;
			color: #333 !important;
		}
		.el-table__body-wrapper {
			min-height: 240px;
		}
		.el-table th>.cell {
			color: #777777;
		}
		.el-table thead {
			background: #eeeeee;
		}
		.el-pagination.is-background .btn-next,
		.el-pagination.is-background .btn-prev,
		.el-pagination.is-background .el-pager li {
			border: 1px solid transparent;
		}
	}
	/* 
 * 导航条样式开始
 *
 */
	
	.el-submenu .el-menu-item {
		min-width: auto;
	}
	
	.el-menu {
		border: none;
	}
	
	.el-menu-item-group__title {
		padding-left: 15px !important;
	}
	
	.el-menu-item-group {
		li {
			box-sizing: border-box;
			width: 50%;
			height: 70px;
			float: left;
			img {
				box-sizing: border-box;
				padding: 10px;
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.el-menu-item.is-active {
		background: #ecf5ff;
	}
	
	// MessageBox 弹框
	.el-message-box {
		.el-button {
			color: #777;
			background-color: white;
			border-color: #888;
			&:hover,
			&:focus {
				opacity: .8;
			}
		}
		.el-button--primary {
			color: white;
		}
	}
	
	.theme-blue {
		.el-message-box {
			.el-message-box__headerbtn:focus,
			.el-message-box__headerbtn:hover {
				.el-message-box__close {
					color: $configure-list;
				}
			}
			.el-button--primary {
				background-color: $configure-list;
				border-color: $configure-list;
			}
		}
	}
	
	.theme-red {
		.el-message-box {
			.el-message-box__headerbtn:focus,
			.el-message-box__headerbtn:hover {
				.el-message-box__close {
					color: $configure-list-red;
				}
			}
			.el-button--primary {
				background-color: $configure-list-red;
				border-color: $configure-list-red;
			}
		}
	}
	
	.theme-green {
		.el-message-box {
			.el-message-box__headerbtn:focus,
			.el-message-box__headerbtn:hover {
				.el-message-box__close {
					color: $configure-list-green;
				}
			}
			.el-button--primary {
				background-color: $configure-list-green;
				border-color: $configure-list-green;
			}
		}
	}
	
	// Message 消息提示
	.el-message {
		color: #ffffff;
		border: 0 none;
	}
	
	.el-message__content {
		color: #ffffff !important;
	}
	
	.el-message>i {
		color: #ffffff !important;
	}
	
	.theme-blue {
		.el-message {
			background: #0a6ac8;
		}
	}
	
	.theme-red {
		.el-message {
			background: #d44d3b;
		}
	}
	
	.theme-green {
		.el-message {
			background: #1d733f;
		}
	}
	
	//form  表单样式
	.el-form-item:last-of-type {
		margin-bottom: 0;
	}
	
	.theme-blue {
		.el-input.is-active .el-input__inner,
		.el-input__inner:focus,
		.el-select .el-input.is-focus .el-input__inner {
			border-color: $configure-list;
		}
	}
	
	.theme-red {
		.el-input.is-active .el-input__inner,
		.el-input__inner:focus,
		.el-select .el-input.is-focus .el-input__inner {
			border-color: $configure-list-red;
		}
	}
	
	.theme-green {
		.el-input.is-active .el-input__inner,
		.el-input__inner:focus,
		.el-select .el-input.is-focus .el-input__inner {
			border-color: $configure-list-green;
		}
	}
	
	.sql_content {
		.el-form-item--mini.el-form-item,
		.el-form-item--small.el-form-item {
			margin-bottom: 30px;
		}
		.el-form-item__label {
			text-align: left;
		}
		.el-form-item__label {
			padding: 0;
		}
		.call {
			float: right;
			width: 612px;
		}
		.el-input__inner {
			background: #f2f4f5;
			color: rgba(119, 119, 119, 0.75);
			border: 1px solid #e6e6e6;
			border-radius: 2px;
		}
		.selset_data {
			height: 26px;
			font-size: 14px;
			background: #f2f4f5;
			color: rgba(119, 119, 119, 0.75);
			border: 1px solid #e6e6e6;
			border-radius: 2px;
			padding-left: 10px;
			display: flex;
			justify-content: space-between;
			span {
				flex: 1;
			}
			a {
				width: 115px;
				line-height: 24px;
				color: #b6b6b6;
			}
		}
	}
	
	//icon  图标的改变
	.el-tree-node__expand-icon.expanded {
		transform: rotate(0deg);
	}
	
	.el-tree-node__expand-icon {
		color: #333;
	}
	
	.el-tree-node__expand-icon.expanded:before {
		content: "\E63C";
	}
	
	.el-icon-caret-right:before {
		content: "\E602";
	}
	
	.el-tree-node__content>.el-tree-node__expand-icon {
		float: left;
		font-size: 18px;
	}
	
	.el-tree-node__content {
		display: block;
		height: 30px;
		line-height: 30px;
		>.el-checkbox {
			float: right;
			margin-right: 0;
		}
	}
	
	.custom-tree-node {
		float: left;
		.iconfont {
			float: left;
			margin-right: 5px;
			&.icon-shuju {
				font-size: 28px;
			}
			&.icon-wenjianjia {
				color: #f0c41a;
			}
		}
		span {
			float: left;
			max-width: 180px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
	.theme-blue {
		.el-tree-node.is-checked {
			.el-tree-node__content {
				background-color: $configure-list-1;
			}
		}
		.el-tree-node__content:hover {
			background-color: $configure-list-1;
		}
		.custom-tree-node {
			.iconfont {
				&.icon-shuju {
					color: $configure-list;
				}
			}
		}
	}
	
	.theme-red {
		.el-tree-node.is-checked {
			.el-tree-node__content {
				background-color: $configure-list-red-1;
			}
		}
		.el-tree-node__content:hover {
			background-color: $configure-list-red-1;
		}
		.custom-tree-node {
			.iconfont {
				&.icon-shuju {
					color: $configure-list-red;
				}
			}
		}
	}
	
	.theme-green {
		.el-tree-node.is-checked {
			.el-tree-node__content {
				background-color: $configure-list-green-1;
			}
		}
		.el-tree-node__content:hover {
			background-color: $configure-list-green-1;
		}
		.custom-tree-node {
			.iconfont {
				&.icon-shuju {
					color: $configure-list-green;
				}
			}
		}
	}
	
	//icon 外键配置里的树形控件
	.foreign_list {
		.el-tree {
			background: transparent;
			color: #FFF;
		}
		.el-tree-node__expand-icon.expanded:before {
			content: "\E604";
		}
		.el-tree-node__expand-icon.expanded {
			transform: rotate(90deg);
		}
		.el-icon-caret-right:before {
			content: "\E604";
		}
		.el-tree-node__expand-icon {
			color: #FFF
		}
		.el-tree-node__content>.el-tree-node__expand-icon {
			float: right;
			line-height: 38px;
			margin-right: 20px;
		}
		.el-tree-node__content {
			height: 50px;
			line-height: 50px;
		}
		.custom-tree-node {
			padding-left: 20px;
		}
		.el-tree-node__content:hover {
			background: #fd8259;
		}
		.custom-tree-node .iconfont.icon-shuju {
			color: #FFF;
		}
		.el-tree-node:focus>.el-tree-node__content {
			background: #fd8259;
		}
		.is-leaf {
			color: transparent;
		}
	}
	
	//登录框样式
	.BI-login {
		width: 365px!important;
		.el-dialog__header {
			display: none;
		}
		.el-dialog__body {
			padding: 20px;
			margin: 0;
			text-align: center;
		}
	}
	
	// loading 样式
	.theme-blue {
		.BI-loading {
			.el-loading-text {
				color: #1f9eff;
			}
			.path {
				stroke: #1f9eff;
			}
		}
	}
	
	.theme-red {
		.BI-loading {
			.el-loading-text {
				color: #dd2911;
			}
			.path {
				stroke: #dd2911;
			}
		}
	}
	
	.theme-green {
		.BI-loading {
			.el-loading-text {
				color: #00a949;
			}
			.path {
				stroke: #00a949;
			}
		}
	}
	
	// happy-scroll 样式
	.happy-scroll-container {
		width: 292px !important;
		height: 100% !important;
	}
	
	.happy-scroll-content {
		border-bottom: none !important;
	}
	
	.theme-red,
	.theme-green {
		.happy-scroll-content {
			border-right: 8px solid transparent !important;
		}
	}
	
	//轮播图下面的显示button
	.el-carousel__button {
		width: 10px;
		height: 10px;
		border-radius: 5px;
	}
	
	//业务数据里的新增术语
	.add_Box {
		width: 675px!important;
		height: 380px;
		.el-message-box__header {
			border-bottom: 1px solid #DDDDDD;
		}
		.el-message-box__content {
			padding: 60px 90px 40px;
		}
		.el-message-box__btns {
			padding: 0;
			text-align: center;
			button {
				width: 100px;
				height: 32px;
				color: #FFFFFF;
				border-radius: 20px;
			}
		}
		textarea {
			width: 100%;
			height: 140px;
			resize: none;
			background: #f5f3f2;
			color: #9c9c9b;
			padding-top: 9px;
			text-indent: 9px;
			box-sizing: border-box;
			border-color: #DDDDDD;
			font-weight: bold;
			outline: none;
		}
		.confirm_add {
			text-align: center;
		}
	}
	
	.theme-green {
		.add_Box,
		.change_Box {
			.el-message-box__message:focus {
				border-color: $green-color;
			}
			textarea:focus {
				border-color: $green-color;
			}
			.el-input__inner:focus {
				border-color: $green-color;
			}
			.el-message-box__headerbtn:hover .el-message-box__close {
				color: $green-color
			}
		}
	}
	
	.theme-red {
		.add_Box,
		.change_Box {
			.el-message-box__message:focus {
				border-color: #e64d32;
			}
			textarea:focus {
				border-color: #e64d32;
			}
			.el-input__inner:focus {
				border-color: #e64d32;
			}
			.el-message-box__headerbtn:hover .el-message-box__close {
				color: #e64d32
			}
		}
	}
	
	//实体配置的折叠面板
	/*.entity_left {
		.el-collapse {
			height: 100%;
		}
		.el-collapse-item__header {
			height: 50px;
			line-height: 50px;
			padding: 0 20px 1px;
			border: none;
			font-size: 14px;
		}
		.el-collapse-item__arrow {
			font-size: 16px;
		}
		.el-collapse-item__wrap {
			overflow: initial;
			width: 100%;
		}
	}
	
	.theme-blue {
		.entity_left {
			.el-collapse-item__header,
			.el-collapse-item__header.is-active {
				background-color: $configure-list-5;
			}
		}
	}
	
	.theme-red {
		.entity_left {
			.el-collapse-item__header,
			.el-collapse-item__header.is-active {
				background: url(./assets/imgs/red/bg_red_bar.jpg);
			}
		}
	}
	
	.theme-green {
		.entity_left {
			.el-collapse-item__header,
			.el-collapse-item__header.is-active {
				background: url(./assets/imgs/green/bg_green_bar.jpg);
			}
		}
	}*/
	/*实体配置右边实体主键*/
	
	.entity_more {
		.el-select {
			width: 130px;
		}
		.has-gutter {
			background: #eeeeee;
			color: #777777;
		}
		.el-table th {
			height: 40px;
			line-height: 40px;
			padding: 0;
			background: #eeeeee;
			color: #777777;
		}
		.el-table th>.cell {
			color: #777777;
		}
		.el-table .cell {
			line-height: 28px;
		}
		.el-table__row,
		.current-row {
			height: 40px;
			line-height: 40px;
		}
		.el-table td.is-center {
			padding: 0;
		}
		.el-form-item {
			float: left;
		}
		.column_id {
			.el-form-item__content {
				margin-left: 5px!important;
			}
		}
	}
	
	// 表格公用样式
	.el-table th.is-leaf {
		background-color: #eeeeee;
		>div {
			color: #777777;
		}
	}
	
	.hot_table {
		.el-table--border th {
			border-right: 1px solid #dddddd;
		}
	}
	
	// 取消table的hover和点击效果
	.el-table--enable-row-hover .el-table__body tr:hover>td {
		background: none;
	}
	
	.el-table--striped .el-table__body tr.el-table__row--striped td {
		background: #FAFAFA !important;
	}
	
	.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
	.el-table__body tr.current-row>td,
	.el-table__body tr.hover-row.current-row>td,
	.el-table__body tr.hover-row.el-table__row--striped.current-row>td,
	.el-table__body tr.hover-row.el-table__row--striped>td,
	.el-table__body tr.hover-row>td {
		background: none;
	}
	
	//热词配置的右侧
	.hot_word_content {
		.el-input {
			float: left;
			width: 120px;
		}
		.el-input--mini .el-input__inner {
			display: block;
			height: 23px;
			line-height: 21px;
		}
	}
	
	// 颜色选择器
	.el-color-picker__trigger {
		width: 100%;
		height: 100%;
	}
	
	// 淡入淡出动画fade2,应用于数据源配置
	.fade2-enter-active {
		transition: .2s;
	}
	
	.fade2-leave-active {
		transition: .2s;
	}
	
	.fade2-enter,
	.fade2-leave-to {
		opacity: 0;
	}
	
	// 淡入淡出动画fade,应用于热词页面
	.fade-enter-active {
		transition: .2s;
	}
	
	.fade-leave-active {
		transition: 0s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	
	// 淡入淡出动画slide,应用于收藏对话框
	.slide-enter-active,
	.slide-leave-active {
		transition: 1s;
	}
	
	.slide-leave-active {
		position: absolute;
		top: 100px;
	}
	
	.slide-enter,
	.slide-leave-to {
		opacity: 0;
	}
	
	.slide-enter {
		transform: translateX(40px);
	}
	
	.slide-leave-to {
		transform: translateX(-40px);
	}
	
	// 淡入淡出动画fade-slide,应用于头部菜单
	.fade-slide-enter-active,
	.fade-slide-leave-active {
		transition: .5s;
	}
	
	.fade-slide-enter,
	.fade-slide-leave-to {
		opacity: 0;
		transform: translateY(42px);
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	img[lazy="loading"] {
		display: block;
		width: 138px !important;
		height: 20px !important;
		margin: 120px auto !important;
	}
	
	img[lazy="error"] {
		display: block;
		width: 138px !important;
		height: 119px !important;
		margin: 40px auto !important;
		animation-duration: 1.5s;
		animation-fill-mode: both;
		animation-name: fadeIn;
	}
	
	img[lazy="loaded"] {
		display: block;
		width: 100% !important;
		height: 100% !important;
		animation-duration: 1.5s;
		animation-fill-mode: both;
		animation-name: fadeIn;
	}
</style>