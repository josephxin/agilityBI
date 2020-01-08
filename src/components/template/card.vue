<template>
	<div class="card">
		<!--多行卡片-->
		<el-table :data="options.data" height="100%" style="width: 100%;" v-if="options.card==2">
			<el-table-column :fixed="i==0" show-overflow-tooltip v-for="(item, i) in options.name" :prop="item.pops" :label="item.pops" :key="i" >
				<template slot-scope="scope">
					<span v-if="scope.row[scope.column.property] && (scope.row[scope.column.property].toString().indexOf('image')==-1)">{{scope.row[scope.column.property]}}</span>
	       	<img :src="scope.row[scope.column.property]" v-if="scope.row[scope.column.property] && (scope.row[scope.column.property].toString().indexOf('image')!=-1)" style="width: 100%;"/>
	      </template>
			</el-table-column>
		</el-table>
		<!--单行卡片-->
		<div class="single-line" v-if="options.card==1">
			<h4>{{options.name[0]}}</h4>
			<ul>
				<li v-for="(item, index) in options.data" :key="index">{{item[0]}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data: function() {
			return {
			}
		},
		props: {
			options: {
				type: [Object]
			}
		},
		computed: {

		},
		watch: {
			/*options: {
				handler(val, olVal) {
					console.log(val)
				},
				deep: true
			}*/
		},
		methods: {

		},
		created() {

		},
		mounted() {
			//console.log(this.options);
		}
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	.card {
		flex: 1;
		width: 100%;
		height: 100%;
		.single-line{
			box-sizing: border-box;
			height: 100%;
			padding:10px;
			background-image: url(../../assets/imgs/common/card_bg.png), url(../../assets/imgs/common/card_trend.png);
			background-position: center, left bottom;
			background-repeat: no-repeat;
			overflow:auto;
			h4{
				font-size: 16px;
				font-weight: bold;
			}
			ul{
				margin-top: 10px;
				li{
					font-size: 14px;
					text-align: center;
				}
			}
		}
	}
</style>