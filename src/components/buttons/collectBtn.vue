<template>
	<div class="main_hed">
		<div class="main_hed_title">
			<h2>{{title}}</h2>
			<div class="mht_select" v-if="type != 'mySeek'">
				<el-select ref="select" v-model="currentFolder" placeholder="请选择" class="mht_select_hed" :class="{'active':active}" @change="valueChange" :popper-append-to-body="false">
					<el-option v-for="(item,index) in options" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="main_button">
			<button class="check_all_blue" @click="checkAll()">
				<i class="iconfont icon-quanxuan"></i>
				<b>{{btnCollectCheckList.length==btnCollectList.length ?  '取消' : '全选'}}</b>
				<input id="all-checked" type="checkbox" :checked="isAllChecked()" @change="changeAllChecked($event)"/>
			</button>
			<btn-con :item="item" v-for="(item,index) in btn" :key="index" :disabled="btnCollectCheckList.length==0" @click.native="item.fn"></btn-con>
		</div>
	</div>
</template>

<script>
	import btnCon from "@/components/buttons/btn"
	import { reportFolderList, reportFolderDelete, folderList } from "@/api/index.js"
	
	export default {
		components: {
			btnCon
		},
		props: {
			title: [Object, String], //当前的名字
			btnCollectList: [Array, Object], //当前所有的数据
			btnCollectCheckList: [Array, Object], //当前选择的数据
			type: [String], //类型
			btn: [Object, Array], //btn 按钮
			options: [Array], //文件夹
		},
		data() {
			return {
				currentFolder: '',
				active: false,
			}
		},
		computed: {

		},
		watch: {
			options: {
				handler(val, olVal) {
					//console.log(val)
					this.currentFolder = this.options[0].id;
				}
			}
		},
		methods: {
			checkAll() {
				document.getElementById("all-checked").click()
			},
			changeAllChecked(event) {
				if(event.target.checked === true) {
					this.btnCollectList.forEach((item, index) => {
						if(this.btnCollectCheckList.indexOf(item.id) == -1) {
							this.btnCollectCheckList.push(item.id);
						}
					})
					this.$emit("update:btnCollectCheckList", this.btnCollectCheckList)
				} else {
					this.$emit("update:btnCollectCheckList", [])
				}
			},
			isAllChecked() {
				return this.btnCollectCheckList.length === this.btnCollectList.length;
			},
			//获取到分类的value
			valueChange(value) { 
				//console.log('获取选中的目录id', value)
				this.$parent.currentFolder = value
				this.$store.commit("changeDataPage", 1)
			},
		},
		mounted() {

		}
	}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.main_hed {
		display: flex;
		justify-content: space-between;
		.main_hed_title {
			flex: 1;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.mht_select {
				height: 26px;
				box-sizing: border-box;
				line-height: 1;
				.active {
					border-color: #fc6d5a;
				}
			}
			h2 {
				margin-right: 20px;
				height: 80px;
				line-height: 80px;
				font-weight: 700;
				font-size: 20px;
				color: #333333
			}
		}
		.main_button {
			height: 80px;
			line-height: 80px;
			cursor: pointer;
			button,
			.report_blue {
				display: inline-block;
				box-sizing: border-box;
				width: 100px;
				height: 32px;
				text-align: center;
				line-height: 32px;
				cursor: pointer;
				user-select: none;
				border-radius: 20px;
				margin-left: 21px;
				padding: 0;
				input {
					display: none;
				}
				b {
					font-weight: normal;
					font-size: 16px;
					/*text-indent:41px;*/
				}
				&:hover {
					opacity: 0.8;
				}
			}
			i {
				width: 15px;
				height: 15px;
				cursor: pointer;
				/*vertical-align: middle;*/
			}
		}
	}
	
	.theme-blue {
		.main_button {
			button {
				color: #4a6c98;
			}
			.check_all_blue {
				background: url(../../assets/imgs/blue/next_blue.png);
				background-size: 100% 100%;
			}
			.report_blue {
				background: url(../../assets/imgs/blue/next_blue.png);
			}
		}
		.main_hed_title {
			.mht_select {
				.active {
					border-color: $blue-color;
				}
			}
		}
	}
	
	.theme-red {
		.main_button {
			button {
				color: $red-color;
			}
			.check_all_blue {
				/*background:url(../../assets/imgs/red/next_red.png);
			background-size:100% 100% ;*/
				background-color: #fff3ef;
				color: #dd2a12;
				border: 1px solid #dd2a12!important;
			}
			.report_blue {
				/*background:url(../../assets/imgs/red/next_red.png);
			background-size:100% 100% ;*/
				background-color: #fff3ef;
				color: #dd2a12;
				border: 1px solid #dd2a12!important;
			}
		}
	}
	
	.theme-green {
		.main_button {
			button {
				color: $green-color;
			}
			.check_all_blue {
				background-color: #effdf5;
				color: #009540;
				border: 1px solid #009540!important;
				/*background:url(../../assets/imgs/green/next_green.png);
			background-size:100% 100%;*/
			}
			.report_blue {
				background-color: #effdf5;
				color: #009540;
				border: 1px solid #009540!important;
				/*background:url(../../assets/imgs/green/next_green.png);
			background-size:100% 100% ;*/
			}
		}
		.main_hed_title {
			.mht_select {
				.active {
					border-color: $green-color;
				}
			}
		}
	}
</style>