<template>
	<div class="ify_vessel"> 
		<div class="ify_name">
			<p>
				{{list.name}}
			</p>
		</div>
		<div class="banner_conter">
			<div class="banner_ves">
				<div class="banner clearfix" :style="'width:'+this.width+'px;transform:translateX('+this.transLate+'px) scale(1);transition:.5s'">
		            <div class="ify_file" v-for="(str,sindex) in list.list">
		            	<ul>
							<li>{{str.name}}</li>
							<li v-for="(obj,i) in str.childer">{{obj.name}}</li>
						</ul>
		            </div>
		        </div>
	        </div>
	        <div class="prev clearfix" @click.stop="commonClick(list.list.length,mark-1)" :class="{'prevActive':prevActive}"></div> 
	        <div class="next clearfix" @click.stop="commonClick(list.list.length,mark+1)" :class="{'nextActive':nextActive}"></div>
	        <div class="subscript">
	        	<ul>
	        		<li v-for="(item,i) in Math.ceil(list.list.length/3)" @click="subClick(i,list.list.length)" :class="{'active':activeIndex == i}" :key="i"></li>
	        	</ul>
	        </div>
       </div>
	</div>
</template>

<script>
	export default {
		props: {
			list:[Object,Array]
		},
		data() {
			return {
				mark:0,//用来轮播的下标
				activeIndex:0,//分页器的样式
				transLate:0,//父级的距离
				width:509,
				nextActive:this.list.list.length > 3 ? false:true,//左右箭头的颜色
				prevActive:true,
			};
		},
		computed:{
			newList(){
				return this.list.list
			}
		},
		watch:{
			list:{
				handler(newValue,oldValue){
				},
				deep:true
			},	
			newList:{
				handler(newValue,oldValue){
					let n = newValue.length;
					let o = oldValue.length;
					if(n > o){
						//增加
						this.commonClick(n,Math.ceil(n/3)-1)
					}else if(o > n){
						//减少
						if(this.activeIndex == (Math.ceil(n/3))){
							this.commonClick(n,Math.ceil(n/3)-1)
						}
					}
					if(n<= 3){
						this.prevActive= true
						this.nextActive=true
					}
				},
				deep:true
			}
		},
		methods: {
			commonClick(amount,index){
				let length = Math.ceil(amount/3);
				if(index < 0) {
					return false
				} else if(index >= length) {
					return false
				} else {
					this.mark = index;
				}
				if(index <= 0) {
					this.prevActive = true
					this.nextActive = false
					
				} else if(index >= length-1) {
					this.nextActive = true
					this.prevActive = false
				} else {
					this.nextActive = false
					this.prevActive = false
				}
				this.width = length*510
				this.transLate = -(this.mark*510)
				this.activeIndex = index
				
			},
			subClick(i,length){
				this.activeIndex = i
				this.commonClick(length,i)
			},
			
			open() {
		        this.$prompt('请输入类名', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		        }).then(({ value }) => {
		          	//console.log(value)
		          	this.list.name = value
		        }).catch(() => {
		                 
		        });
		    },
		    deleteBanner(chickList){
//		    	console.log(this.$parent.arr)
		    	let parentList = this.$parent.arr
		    	let parentListRight = this.$parent.list
		    	parentList.forEach((item,index)=>{
		    		if(item.id == chickList.id){
		    			parentList.splice(index,1)
		    			//console.log(item.list)
		    			if(item.list.length>0){
		    				item.list.forEach((chickItem,chickIdex)=>{
		    					parentListRight.push(chickItem)
		    				})
		    				
		    			}
		    		}
		    	})
		    }
		},
		created() {
			
		},
		mounted(){
		},
		destroyed() {
		}
	};
</script>
<style scoped lang="scss" rel="stylesheet/scss">
.ify_vessel{
		height: 302px;
		margin:30px 40px 0px;
		border: solid 1px rgba(221, 221, 221, 0.5);
		border-radius: 10px;
		background: #fafafa;
		box-sizing: border-box;	
	}
	.ify_name{
		display: flex;
		justify-content: space-between;
		height: 44px;
		line-height: 44px;
		margin: 0 15px;
		font-weight: 700;
		font-size: 16px;
	}
	.iconfont{
		font-size: 14px;
		color: red;
	}
	.iconfont.delete{
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin-top: 12px;
		background: #d44c39;
		color: #FFFFFF;
	}
	.ify_container{
		/*height:calc(100% - 50px);*/
		height: 100%;
		overflow: hidden;
		position: relative;
		span{
			width: 20px;
			height: 20px;
			z-index: 10;
			position: absolute;
			top: 50px;
			right:0; 
			background-color:gold; 
			&:first-of-type{
				left: 0;
			}	
		}
		.banner{
			position: absolute;
			left:0;
			top: 0;
			margin-left: 0;
		}
	}	
    /*banner*/
   .banner_conter{
   		position: relative;
   		width: 100%;
   	    height: 256px;
   		overflow: hidden;
   }
   .prev{
   		position: absolute;
   		width: 20px;
   		height: 20px;
   		border-radius: 10px;
   		top:92px;
   		left:10px;
   		z-index: 10;
   }
   .next{
   		position: absolute;
   		width: 20px;
   		height: 20px;
   		border-radius: 10px;
   		top:92px;
   		right:10px;
   		z-index: 10;
   }
   .next::after{
        display: inline-block;
        margin: 4px;
        margin-top: 6px;
        border-right: 2px solid;
        border-bottom: 2px solid;
        border-color:#d44c39;
        width: 10px;
        height: 10px;
        transform: rotate(-45deg);
    }
    .prev::after{
        display: inline-block;
        margin: 6px;
        border-left: 2px solid;
        border-bottom:2px solid;
        border-color:#d44c39;
        width: 10px; 
        height:10px;
        transform: rotate(45deg);
    }
    .prevActive::after,.nextActive::after{
    	border-color:#AAAAAA;
    }
   .banner_ves{
   		width: 510px;
   		height: 242px;
   	   	margin: 14px 39px 0;
   	   	overflow: hidden;
   	}
   .banner{
   		float: left;
	   	min-width: 100%;
	   	height: 100%;
   	    box-sizing: content-box;
   	    display: flex;
   	    transform:translate3d(0px, 0px, 0px);
   	   .ify_file{
   	   		width:140px;
   	   		height: 201px;
   	   		display: flex;
   	   		flex-grow: 0;   /*定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。*/
			flex-shrink: 0;  /*定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小*/
			flex-basis: auto;/*在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。*/
			/*flex: 0 0 auto;*/  /*flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。*/ 
   	   		box-sizing: border-box;
   	   		margin-right: 15px;
   	   		margin-left: 15px;
			ul {
				width: 100%;
				border: 1px solid transparent;
				border-bottom: none;
				background: #fdf6f5;
				>li {
					height: 40px;
					text-align: center;
					line-height: 40px;
					border-bottom: 1px solid transparent;
					box-sizing: border-box;
					&:first-child {
						background: #f9dfd6;
						color:#a92312
					}
				}
			}
		}
   }
    .ify_file{
		width: 125px;
		ul{
			border:1px solid #faeae9;
			border-bottom:none;
			background: #fdf6f5;
			>li{
				height: 49px;
				text-align: center;
				line-height: 49px;
				border-bottom: 1px solid #fce6e4;
				box-sizing: border-box;
				&:first-child{
					background: #f9dfd6;
					color:#a92312
				}
				&:nth-of-type(even){ 
					background: #fffbfa;
				}
			}
		}
	}
    .subscript{
    	position: absolute;
    	width: 100%;
    	bottom: 10px;
    	ul{
    		display:flex;
    		justify-content: center;
    		li{
    			width: 10px;
    			height: 10px;
    			background: #f9dfd6;
    			border-radius: 5px;
    			margin-right: 5px;
    		}
    		li.active{
		    	background: #dd2911;
		    }
    	}
    }
    
	.theme-blue{
		.iconfont{
			color: #1f9eff;
		}
		.iconfont.delete_banner{
			background: #dce8f6;
		}
		.banner {
			.ify_file {
				ul {
					background: #f5f8fd;
					border-color:#e6eff9;
					>li {
						box-sizing: border-box;
						border-color:#e6eff9;
						&:first-child {
							    background: #dce8f6;
    							color: #4a6c98;
						}
						&:nth-of-type(even){ 
							background: #fafcff;
						}
					}
				}
			}
		}
		
		.next::after {
			border-color: #1f9eff;
		}
		
		.prev::after {
			border-color: #1f9eff;
		}
		.prevActive,
		.nextActive{
			border-color: #AAAAAA;
			cursor: not-allowed;
		}
		.prevActive::after,
		.nextActive::after {
			border-color: #AAAAAA;
			cursor: not-allowed;
		}
		.subscript {
			ul {
				li {
					background: #dce8f6;
				}
				li.active {
					background: #1f9eff;
				}
			}
		}
	}
	.theme-green{
		.iconfont{
			color: #017734;
		}
		.iconfont.delete_banner{
			background: #e4f8e3;
		}
		.banner {
			.ify_file {
				ul {
					background: #f6fdf8;
					border-color:#e7f9ed;
					>li {
						border-color:#e7f9ed;
						&:first-child {
							background-color: rgba(221, 246, 220, 0.78);
    						color: #017734;
						}
						&:nth-of-type(even){ 
							background: #fcfffc;
						}
					}
				}
			}
		}
		
		.next::after {
			border-color: #017734;
		}
		
		.prev::after {
			border-color: #017734;
		}
		.prevActive,
		.nextActive{
			border-color: #AAAAAA;
			cursor: not-allowed;
		}
		.prevActive::after,
		.nextActive::after {
			border-color: #AAAAAA;
			cursor: not-allowed;
		}
		.subscript {
			ul {
				li {
					background:rgba(0, 169, 73, 0.75);
				}
				li.active {
					background: #017734;
					
				}
			}
		}
	}
	.theme-red{
		.banner {
			.ify_file {
				ul {
					border-color:#fceceb;
					>li {
						border-color:#fceceb;
					}
				}
			}
		}
	}
    
    
    
    
</style>