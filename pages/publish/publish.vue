<template>
	<view class="page">
		<ourLoading v-if="loading" active text="加载中..." />
		<!-- <tab-bar :selected="2"></tab-bar> -->

		<view class="main">
			<view class="content">
				<view class="head">
					<text>新用户下单有礼</text>
				</view>
				<view class="head-down">
					<text>可使用历史发单，快捷发布</text>
				</view>
				<view class="mid">
					<view class="mid-left">
						<view class="left-top">期望交货时间</view>
						<view v-if="!getGoodsTime" class="left-bottom">请选择您期望的交货时间</view>
						<view v-else class="left-bottom">{{getGoodsTime}}</view>
					</view>
					<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
					
					<view class="mid-right"  @click="open">


						<image  src="../../static/img/right2.png"></image>
						<!-- <button @click="open">打开日历</button> -->

					</view>
				</view>

				<view class="tags">
					<view class="tag-head">
						<view :class="typeKey == index ? 'tag-head-sty' : ''" class="tag-head-item" v-for="(item,index) in typeList" :key="index"
						 @tap="selectType(index,item)">{{item.classificationName}}</view>
					</view>
					<view class="tag-content">
						<view :class="typeItemKey == item.key ? 'tag-headItem-sty' : ''" class="tag-content-item" v-for="(item,index) in typeItemList"
						 :key="index" @tap="selectItemType(item)">{{item.classificationName}}</view>
					</view>
					<view class="tag-bottom">
						<view class="bottom-item">
							<view class="item-title">数量</view>
							<view class="item-input">
								<lxc-count @handleCount="handleCountClick" :index="jxq.index" :value="jxq.num" :max="jxq.max" :delayed="100">
								</lxc-count>
							</view>
						</view>
						<view class="bottom-item mar-top10">
							<view class="item-title">您的预算</view>
							<view class="item-input">
								<input class="uni-input" v-model="form.preMoney" placeholder-style="color:#CCCCCC;text-align:center" type="number" placeholder="请输入预算" /><text>元</text>
							</view>
						</view>
						<view class="bottom-item mar-top10">
							<view class="item-title">预付比例</view>
							<view class="item-input">
								<input class="uni-input" v-model="form.preRate" placeholder-style="color:#CCCCCC;text-align:center !important;font-size:20upx" type="number"
								 placeholder="请输入预付比例" /><text>%</text>
							</view>
						</view>
					</view>
				</view>

				<view class="img-uplod">
					<view class="img-uplod-item">
						<view class="upload-title">上传附件</view>
						<view class="img">

							<imgUpload :header="header" :config="config" previewMany :imgArr="imgArray" loading async :url="url" @result="resultUrl"
							 @delImg="delImg"></imgUpload>

						</view>
					</view>

					<view class="img-des-item">
						<view class="des-title">需求描述</view>
						<view class="des">
							<textarea maxlength="-1" v-model="form.des" placeholder-style="color:#CCCCCC;" placeholder="请详细描述您的需求" />
							</view>
					</view>

				</view>

			<view class="bottom">
				<view class="bottom-left">
					<view v-if="!form.username" class="left-address">收货地址</view>
					<view v-else class="left-address">
						{{form.username}} {{form.phone}}
					</view>
					<view v-if="!form.address" class="detail-address">您的详细收货信息</view>
					<view v-else class="detail-address">{{form.address}}</view>
				</view>
				<view class="bottom-right">
					<image src="../../static/img/right2.png" @tap="goAddress"></image>
				</view>
			</view>	
			
			<view class="bottom-btn">
				<view class="submit-btn">
					<text>提交</text>
				</view>
			</view>

				
			</view>

		</view>

	</view>
</template>

<script>
	// import API from '../../api/index.js'
	import factory from '@/utils/factory';

	const app = getApp();
	export default {
		computed: {
			loading() {
				return this.$store.state.loadingShow
			},
			
		},
		onShow() {
			this.getOrderMainType()
		},
		data() {
			return {
				factory: require('@/utils/factory.js'),
				form: {
					endTime:'',
					productName:'',
					productNum:'',
					preMoney:'',
					preRate:'',
					imgList:[],
					des:'',
					address:'',
					username:'',
					phone:''
					
				},
				typeList: [],
				typeItemList: [],
				typeKey: 0, // 产品类型
				typeItemKey: 1, // 产品名称
				jxq: {
					index: 1,
					num: 0,
					max: 100000000
				},
				imgArray: [],
				config: {
					delIcon: '', //删除图片icon
					resultTip: true, //结果提示
					resultType: '1', //结果展示类型
					loadIcon: '', //加载时的图标
					loadText: '' //加载时的文字
				},
				header:[{token:"zx6c54asdq89w7eqw6e46ad4"},{sign:'s6d5a4dqwe7q9w87a6'},{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}],
				url:'http://192.168.1.126:9999/xujun/file/upload',
				getGoodsTime:''
			}
		},
		methods: {
			// 选择产品类型
			selectType(index, item) {
				 console.log(item)
				this.typeKey = index
				this.getOrderSubType(item)
			},
			// 选择具体产品类型
			selectItemType(item) {
				console.log(item)
				this.form.productName= item.classificationId
			},
			// 计数器
			handleCountClick(val) {
				console.log(val, this.jxq)
				// this.jxq.num = val
				this.form.productNum = val

			},
			// 图片上传
			resultUrl(e) {
				console.log(e);
				//成功默认为0
				if (e.code == 0) {
					this.imgArray.push(e.fileVo.fileUrl);
				}
			},
			// 删除图片回调
			delImg(e) {
				this.imgArray.splice(e, 1) //为删除图片数组的下标
				console.log('this.imgArray', this.imgArray)
			},
			//打开日历
			 open(){
			      this.$refs.calendar.open();
			        },
			// 选择时间
			confirm(e) {
				console.log(e);
				this.form.endTime = e.fulldate
			},
			// 跳转地址页
			goAddress() {
				uni.navigateTo({
					url:'../address/address'
				})
			},
			// 获取订单主类别
			getOrderMainType() {
				
				this.API.service.getNoLoadToken(this.URL.getOrderClassM).then(res => {
					if (res.code == 200) {
						this.typeList = res.data
						this.getOrderSubType(res.data[0])
					}
				})
			},
			// 获取订单子类别
			getOrderSubType(item) {
				let params = {
					parentId :item.classificationId
				}
				this.API.service.getNoLoadToken(this.URL.getOrderClassS, params).then(res => {
					if (res.code == 200) {
						this.typeItemList = res.data
					}
				})
			}

		}
	}
</script>

<style scoped lang="less">
	.page {
		width: 100%;
		height: 100%;
		
	}

	.main {
		width: 100%;
		height: 100%;
	

		.content {
			width: 100%;
			min-height: 100%;
			padding: 20upx;
			padding-bottom: 150upx;
			background-color:#F7F7F7!important ;

			.head {
				background-color: #FFC762;
				height: 250upx;
				border-radius: 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				font-size: 80upx;
				font-weight: 700;
			}

			.head-down {
				margin-top: 10upx;
				background-color: #FFEFD2;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFAB00;
				font-size: 25upx;
				border-radius: 10upx;
				padding: 10upx;
			}

			.mid {
				background-color: #FFFFFF;
				padding: 20upx;
				border-radius: 10upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10upx;

				.mid-left {
					width: 50%;
					.left-top {
						font-size: 30upx;
						color: #333333;
						font-weight: 600;
						padding-top: 8upx;
						padding-bottom: 8upx;
					}

					.left-bottom {
						font-size: 30upx;
						color: #999999;
						padding-top: 8upx;
						padding-bottom: 8upx;
					}

				}

				.mid-right {
					width: 50%;
					text-align: right;
					image {
						width: 48upx;
						height: 48upx;
					}
				}
			}

			.tags {

				margin-top: 10upx;
				border-radius: 10upx;

				.tag-head {
					padding-top: 10upx;
					display: flex;
					overflow-x: scroll;
					display: -webkit-box;
					overflow-x: scroll;
					-webkit-overflow-scrolling:touch;

					.tag-head-item {
						width: 25%;
						height: 100%;

						display: flex;
						align-items: center;
						justify-content: center;
						padding-top: 20upx;
						padding-bottom: 20upx;
						border-radius: 10upx;
					}

					.tag-head-sty {
						background-color: #FFFFFF !important;
					}


				}

				.tag-content {
					padding-top: 20upx;
					padding-bottom: 20upx;
					display: flex;
					align-content: flex-start;
					// justify-content: space-between;
					flex-flow: row wrap;
					background-color: #FFFFFF;
					border-radius: 10upx;

				}

				.tag-content-item {
					flex: 0 0 30%;
					border: 1px solid #E5E5E5;
					display: flex;
					justify-content: center;
					align-items: center;
					padding-top: 15upx;
					padding-bottom: 15upx;
					margin-left: 15upx;
					margin-bottom: 10upx;
					margin-top: 10upx;
					color: #333333;
					border-radius: 10upx;
				}

				.tag-headItem-sty {
					background-color: #FFC800 !important;
					color: #FFFFFF;
				}

				.tag-bottom {
					// padding-top: 10upx;
					padding-left: 30upx;
					padding-right: 30upx;
					padding-bottom: 30upx;
					background-color: #FFFFFF;
					border-radius: 10upx;

					.bottom-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 80upx;
						padding-top: 10upx;
						padding-bottom: 10upx;

						// margin-top: 10upx;
						.item-title {
							font-size: 30upx;
							color: #333333;
							width: 55%;
						
						}

						.item-input {
							display: flex;
							align-items: center;
							justify-content: space-between;
							width: 45%;
							lxc-count{
								width: 100%;
							}
							input {
								border: 1px solid #E5E5E5;
								border-radius: 10upx;
								height: 70upx;
								width: 90%;
								padding: 15upx;
								line-height:normal;
								text-align:center;
							}

						}
					}
				}

			}

			.img-uplod {
				background-color: #FFFFFF;
				margin-top: 20upx;
				padding-top: 10upx;
				padding-left: 30upx;
				padding-right: 30upx;
				padding-bottom: 30upx;
				border-radius: 10upx;
				.img-uplod-item{
					.upload-title{
						font-size: 30upx;
						color: #333333;
					
					}
					.img{
						margin-top: 10upx;
					}
				}
				.img-des-item{
					margin-top: 20upx;
					.des-title{
						font-size: 30upx;
						color: #333333;
			
					}
					.des{
						margin-top: 20upx;
						textarea{
							background-color: #F7F7F7;
							padding: 15upx;
							width: 100%;
							height: 200upx;
							border-radius: 10upx;
						}
					}
				}
				
				
			}
			.bottom{
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 120upx;
				margin-top: 20upx;
				padding-top: 30upx;
				padding-left: 30upx;
				padding-right: 30upx;
				padding-bottom: 30upx;
				border-radius: 10upx;
				.bottom-left{
					.left-address{
						font-size: 30upx;
						padding-top: 5upx;
						padding-bottom: 5upx;
						color: #333333;
					}
					.detail-address{
						padding-top: 5upx;
						padding-bottom: 5upx;
						font-size: 26upx;
						color: #999999;
					}
				}
				.bottom-right{
					image {
							width: 48upx;
							height: 48upx;
						}
					
				}
			}
			
			.bottom-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 15upx;
				.submit-btn{
					height: 73upx;
					width: 100%;
					background-color: #FFC800;
					color:#333333;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 15upx;
					font-size: 30upx;
				}
			}
		}
	}

	.mar-top10 {
		margin-top: 10upx;
	}
</style>
